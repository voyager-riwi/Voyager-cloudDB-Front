# 🚨 PROBLEMA CRÍTICO: Bases de datos restauradas vuelven a status "Stopped"

## 📊 Diagnóstico

**Síntoma**: Después de restaurar una base de datos, el backend devuelve todas las bases de datos con `status: 'Stopped'` en lugar de `'Running'`.

**Causa**: El método `RestoreDatabaseAsync` en el `DatabaseService.cs` NO está guardando correctamente los cambios después de actualizar el status.

## 🔍 Evidencia de los logs

```javascript
// Backend devuelve TODAS con status "Stopped" después de restaurar
Array(7)
0: {status: 'Stopped', engine: 'MySQL'}
1: {status: 'Stopped', engine: 'SQLServer'}
2: {status: 'Stopped', engine: 'SQLServer'}
3: {status: 'Stopped', engine: 'MongoDB'}
4: {status: 'Stopped', engine: 'MongoDB'}
5: {status: 'Stopped', engine: 'MySQL'}
6: {status: 'Stopped', engine: 'PostgreSQL'}
```

## ✅ SOLUCIÓN

### 1. Verificar que se esté guardando el cambio de status

En tu archivo `DatabaseService.cs`, busca el método `RestoreDatabaseAsync` y verifica esta sección:

```csharp
// ⭐ PASO 3: Restaurar el estado y actualizar credenciales
database.Status = DatabaseStatus.Running;  // ✅ Esto está bien
database.DeletedAt = null;                 // ✅ Esto está bien
database.PasswordHash = newCredentials.PasswordHash;
database.ConnectionString = newConnectionString;

_logger.LogInformation($"💾 Restoring database status to Running with new credentials");
await _databaseRepository.UpdateAsync(database);  // ⚠️ VERIFICA ESTO

// ⚠️ IMPORTANTE: Asegúrate de que los cambios se guarden en la BD
await _context.SaveChangesAsync();  // ❌ SI FALTA ESTO, AQUÍ ESTÁ EL PROBLEMA
```

### 2. Verifica el método UpdateAsync del Repository

El problema puede estar en `_databaseRepository.UpdateAsync()`. Abre tu `DatabaseRepository.cs` y verifica:

```csharp
public async Task<bool> UpdateAsync(Database database)
{
    try
    {
        _context.Databases.Update(database);
        await _context.SaveChangesAsync();  // ⚠️ DEBE ESTAR AQUÍ
        return true;
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error updating database");
        return false;
    }
}
```

### 3. Código correcto completo del método RestoreDatabaseAsync

```csharp
public async Task<bool> RestoreDatabaseAsync(Guid userId, Guid databaseId)
{
    _logger.LogInformation($"♻️ Restoring database {databaseId} for user {userId}");

    var database = await _databaseRepository.GetByIdAsync(databaseId);

    if (database == null)
    {
        _logger.LogWarning($"⚠️ Database {databaseId} not found");
        return false;
    }

    if (database.UserId != userId)
    {
        _logger.LogWarning($"⚠️ User {userId} tried to restore database {databaseId} owned by another user");
        throw new UnauthorizedAccessException("You don't have access to this database");
    }

    // ✅ CORRECCIÓN: Aceptar TANTO Deleted COMO Stopped
    if (database.Status != DatabaseStatus.Deleted && database.Status != DatabaseStatus.Stopped)
    {
        _logger.LogWarning($"⚠️ Database {databaseId} is not in deleted/stopped state, cannot restore. Current status: {database.Status}");
        return false;
    }

    // Verificar que no hayan pasado más de 30 días
    if (database.DeletedAt.HasValue &&
        (DateTime.UtcNow - database.DeletedAt.Value).TotalDays > 30)
    {
        _logger.LogWarning($"⚠️ Cannot restore database {databaseId}: grace period expired (more than 30 days)");
        throw new InvalidOperationException("Cannot restore database: grace period expired (more than 30 days). The database will be permanently deleted soon.");
    }

    var user = await _userRepository.GetByIdAsync(userId);
    if (user == null)
    {
        _logger.LogError($"❌ User {userId} not found");
        throw new KeyNotFoundException("User not found");
    }

    // ⭐ PASO 1: Generar nueva password y restaurar acceso
    _logger.LogInformation($"🔑 Generating new password to restore access");
    var newCredentials = await _credentialService.GenerateCredentialsAsync();

    var masterContainer = await _dockerService.GetMasterContainerInfoAsync(database.Engine);
    if (masterContainer != null)
    {
        try
        {
            await _dockerService.ResetPasswordInMasterAsync(
                masterContainer,
                database.Username,
                newCredentials.Password,
                database.Engine);

            _logger.LogInformation($"✅ Access restored - new password set");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"❌ Failed to restore access by changing password");
            throw new Exception("Failed to restore database access", ex);
        }
    }

    // ⭐ PASO 2: Actualizar ConnectionString con la nueva password
    var engineName = database.Engine.ToString();
    var envVarName = $"DB_HOST_{engineName.ToUpperInvariant()}";
    var host = Environment.GetEnvironmentVariable(envVarName)
                  ?? _configuration[$"DatabaseHosts:{engineName}"]
                  ?? "localhost";

    var newConnectionString = database.Engine switch
    {
        DatabaseEngine.PostgreSQL =>
            $"Host={host};Port={database.Port};Database={database.DatabaseName};Username={database.Username};Password={newCredentials.Password}",
        DatabaseEngine.MySQL =>
            $"Server={host};Port={database.Port};Database={database.DatabaseName};Uid={database.Username};Pwd={newCredentials.Password}",
        DatabaseEngine.MongoDB =>
            $"mongodb://{database.Username}:{Uri.EscapeDataString(newCredentials.Password)}@{host}:{database.Port}/",
        _ => throw new NotSupportedException()
    };

    // ⭐ PASO 3: Restaurar el estado y actualizar credenciales
    database.Status = DatabaseStatus.Running;  // ✅ CAMBIAR A RUNNING
    database.DeletedAt = null;
    database.PasswordHash = newCredentials.PasswordHash;
    database.ConnectionString = newConnectionString;

    _logger.LogInformation($"💾 Restoring database status to Running with new credentials");

    // ⚠️ CRÍTICO: GUARDAR LOS CAMBIOS EN LA BASE DE DATOS
    await _databaseRepository.UpdateAsync(database);

    // ⚠️ SI EL REPOSITORY NO TIENE SaveChangesAsync, AGREGARLO AQUÍ:
    // await _context.SaveChangesAsync();

    _logger.LogInformation($"✅ Database status saved: {database.Status}");

    // ⭐ PASO 4: Enviar email con las nuevas credenciales
    await _emailService.SendPasswordResetEmailAsync(new PasswordResetEmailDto
    {
        UserEmail = user.Email,
        UserName = user.Email.Split('@')[0],
        DatabaseName = database.DatabaseName,
        Engine = database.Engine.ToString(),
        NewUsername = database.Username,
        NewPassword = newCredentials.Password,
        ConnectionString = newConnectionString,
        ResetAt = DateTime.UtcNow
    });

    _logger.LogInformation($"✅ Database {database.Name} restored successfully with new password sent to {user.Email}");

    return true;
}
```

## 🧪 Prueba después de arreglar

1. Reinicia el backend
2. Restaura una base de datos desde el frontend
3. Verifica en los logs del backend que diga: `✅ Database status saved: Running`
4. Refresca la página del frontend
5. La base de datos debe aparecer en "Your Databases" (no en "Deactivated")
6. El status debe ser `Running`, NO `Stopped`

## 🔍 Debugging adicional

Si aún no funciona, agrega estos logs temporales:

```csharp
// ANTES de UpdateAsync
_logger.LogInformation($"🔍 BEFORE UPDATE - Status: {database.Status}, ID: {database.Id}");

await _databaseRepository.UpdateAsync(database);

// DESPUÉS de UpdateAsync
var verifyDb = await _databaseRepository.GetByIdAsync(database.Id);
_logger.LogInformation($"🔍 AFTER UPDATE - Status: {verifyDb.Status}, Saved correctly: {verifyDb.Status == DatabaseStatus.Running}");
```

Esto te dirá si el problema es:

- ❌ El UpdateAsync no guarda los cambios
- ❌ Hay otro proceso que sobrescribe el status
- ❌ El contexto no se está persistiendo
