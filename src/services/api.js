Miguel Angel Arias Marin
27masaki
En línea

Brahiam Ruiz Alzate — 25/10/2025 0:17
Este proyecto si lo sacamos como quiero que quede la vamos a romper...
Si toca pagar un mes de IA lo pagamos ahí vemos
Hgle
Miguel Angel Arias Marin — 25/10/2025 0:17
descanse
*
Brahiam Ruiz Alzate — 25/10/2025 0:17
Feliz noche Migue
Igualmente
Miguel Angel Arias Marin — 25/10/2025 0:18
ey ey ey
ajajajajaj
Brahiam Ruiz Alzate — 25/10/2025 0:19
Saque los ahorros
Jajaja
Miguel Angel Arias Marin — 25/10/2025 0:19
dio miooo
Brahiam Ruiz Alzate — 25/10/2025 0:20
Jiiii pa que sepa pues
😴😴
Miguel Angel Arias Marin — 26/10/2025 12:56
AHAJJAJAJA
Imagen
que caja
frustracion potencial
Brahiam Ruiz Alzate — 26/10/2025 13:12
Jajaja
Miguel Angel Arias Marin — 27/10/2025 15:40
using System.ComponentModel.DataAnnotations;
using CrudCloudDb.Core.Enums;

namespace CrudCloudDb.Core.Entities
{
    public class DatabaseInstance
    {
        public Guid Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        public DatabaseEngine Engine { get; set; }

        [MaxLength(255)]
        public string? ContainerId { get; set; }

        [Required]
        [MaxLength(100)]
        public string DatabaseName { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        public int Port { get; set; }

        public DatabaseStatus Status { get; set; }

        public string? ConnectionString { get; set; }

        public bool CredentialsViewed { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? DeletedAt { get; set; }

        // Relationships
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;
    }
}
using CrudCloudDb.Core.Entities;
using System.ComponentModel.DataAnnotations;

namespace CrudCloudDb.Core.Entities
{
    public class User
    {
        public Guid Id { get; set; }

        [Required]
        [MaxLength(255)]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string LastName { get; set; } = string.Empty;

        public bool EmailVerified { get; set; } = false;
        public string? VerificationToken { get; set; }
        public string? PasswordResetToken { get; set; }
        public DateTime? PasswordResetExpires { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastLogin { get; set; }

        public Guid CurrentPlanId { get; set; }
        public Plan CurrentPlan { get; set; } = null!;

        public ICollection<DatabaseInstance> Databases { get; set; } = new List<DatabaseInstance>();
        public ICollection<Subscription> Subscriptions { get; set; } = new List<Subscription>();
        public ICollection<WebhookConfig> WebhookConfigs { get; set; } = new List<WebhookConfig>();
    }
}
Brahiam Ruiz Alzate — 27/10/2025 17:25
Nueva Imagen postgres : docker run --name postgres -e POSTGRES_PASSWORD=cambiarestapassword -p 5432:5432 -d postgres
Miguel Angel Arias Marin — 27/10/2025 17:28
using BCrypt.Net;

namespace CrudCloudDb.Application.Utilities
{
    public static class PasswordHasher
    {
        public static string HashPassword(string password)
        {
            // BCrypt.Net-Next handles the salt generation automatically
            return BCrypt.HashPassword(password);
        }

        public static bool VerifyPassword(string password, string hashedPassword)
        {
            return BCrypt.Verify(password, hashedPassword);
        }
    }
}
Este va dentro de Application/Interfaces/Utilities/PasswordHasher
GENERAR CREDENCIALES

using System.Security.Cryptography;
using System.Text;

namespace CrudCloudDb.Application.Utilities
Expandir
message.txt
3 KB
Brahiam Ruiz Alzate — 27/10/2025 17:43
IPv4    91.98.42.248
Miguel Angel Arias Marin — 27/10/2025 19:47
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL.NodaTime
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL.Design
dotnet add package EFCore.NamingConventions
Miguel Angel Arias Marin — 28/10/2025 14:27
Oe mire lo que dijo vivi
En el dc
Quinto piso
Miguel Angel Arias Marin — 28/10/2025 16:09
mas dependencias: 

dotnet add package Microsoft.IdentityModel.Tokens
dotnet add package System.IdentityModel.Tokens.Jwt
dotnet add package Microsoft.Extensions.Configuration
dotnet add package Microsoft.Extensions.Configuration.Json
dotnet add package Microsoft.Extensions.Configuration.Binder


y esta en el .API: 

 dotnet add package Microsoft.Extensions.DependencyInjection
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 8.0.3 
Miguel Angel Arias Marin — 28/10/2025 16:19
dotnet add CrudCloudDb.Application/CrudCloudDb.Application.csproj package Microsoft.Extensions.Configuration.Abstractions
Brahiam Ruiz Alzate — 28/10/2025 16:45
// =======================
// 1️⃣ Using Statements
// =======================
using CrudCloudDb.Infrastructure.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
Expandir
message.txt
4 KB
Miguel Angel Arias Marin — 28/10/2025 16:52
// =======================
// 1️⃣ Using Statements
// =======================
using CrudCloudDb.Infrastructure.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
Expandir
message.txt
5 KB
Miguel Angel Arias Marin — 28/10/2025 17:50
Vanesa esta haciendo un readme
ajjaja
Miguel Angel Arias Marin — 29/10/2025 18:18
var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (userId == null)
        {
            return Unauthorized(); // Aunque [Authorize] ya debería parar esto
        }
Miguel Angel Arias Marin — 29/10/2025 23:28
brahiam
como le fue con eso?
a al final si le dio?
en riwi
Brahiam Ruiz Alzate — 30/10/2025 8:21
Miguel ya desplegue anoche
Debo cuadrar es lo de host: al momento de generar las credenciales, porque genera es localhost
Entonces voy a implementarle subdominios
Pero anoche almmenos ya cuadre lo otro
Miguel Angel Arias Marin — 04/11/2025 20:04
ey men
has hecho cambios en develop??
Miguel Angel Arias Marin — 05/11/2025 20:38
mongodb://gsmrsp6r8xv7sa1e:fIHkzk%40ZEzhggC0x@91.98.42.248:27017/
Miguel Angel Arias Marin — 07/11/2025 17:05
Reenviado
Error inesperado en la API
Contexto: Error al intentar crear la base de datos (CreateDatabase)
Tipo de Error
PostgresException
Mensaje
55006: source database "template1" is being accessed by other users

DETAIL: Detail redacted as it may contain sensitive data. Specify 'Include Error Detail' in the connection string to include this information.
StarkTrace (resumido)
   at Npgsql.Internal.NpgsqlConnector.ReadMessageLong(Boolean async, DataRowLoadingMode dataRowLoadingMode, Boolean readingNotifications, Boolean isReadingPrependedMessage)
   at System.Runtime.CompilerServices.PoolingAsyncValueTaskMethodBuilder`1.StateMachineBox`1.System.Threading.Tasks.Sources.IValueTaskSource<TResult>.GetResult(Int16 token)
   at Npgsql.NpgsqlDataReader.NextResult(Boolean async, Boolean isConsuming, CancellationToken cancellationToken)
   at Npgsql.NpgsqlDataReader.NextResult(Boolean async, Boolean isConsuming, CancellationToken cancellationToken)
   at Npgsql.NpgsqlCommand.ExecuteReader(Boolean async, CommandBehavior behavior, CancellationToken cancellationToken)
   at Npgsql.NpgsqlCommand.ExecuteReader(Boolean async, CommandBehavior behavior, CancellationToken cancellationToken)
   at Npgsql.NpgsqlCommand.ExecuteNonQuery(Boolean async, CancellationToken cancellationToken)
   at CrudCloudDb.Infrastructure.Services.DockerService.CreatePostgreSQLDatabaseAsync(
TimeStamp: 7/11/2025 10:03:30 p. m.
Weebhook PotterCloud  •  viernes
Bri
Reenviado
Error inesperado en la API
Contexto: Error al intentar crear la base de datos (CreateDatabase)
Tipo de Error
PostgresException
Mensaje
55006: source database "template1" is being accessed by other users

DETAIL: Detail redacted as it may contain sensitive data. Specify 'Include Error Detail' in the connection string to include this information.
StarkTrace (resumido)
   at Npgsql.Internal.NpgsqlConnector.ReadMessageLong(Boolean async, DataRowLoadingMode dataRowLoadingMode, Boolean readingNotifications, Boolean isReadingPrependedMessage)
   at System.Runtime.CompilerServices.PoolingAsyncValueTaskMethodBuilder`1.StateMachineBox`1.System.Threading.Tasks.Sources.IValueTaskSource<TResult>.GetResult(Int16 token)
   at Npgsql.NpgsqlDataReader.NextResult(Boolean async, Boolean isConsuming, CancellationToken cancellationToken)
   at Npgsql.NpgsqlDataReader.NextResult(Boolean async, Boolean isConsuming, CancellationToken cancellationToken)
   at Npgsql.NpgsqlCommand.ExecuteReader(Boolean async, CommandBehavior behavior, CancellationToken cancellationToken)
   at Npgsql.NpgsqlCommand.ExecuteReader(Boolean async, CommandBehavior behavior, CancellationToken cancellationToken)
   at Npgsql.NpgsqlCommand.ExecuteNonQuery(Boolean async, CancellationToken cancellationToken)
   at CrudCloudDb.Infrastructure.Services.DockerService.CreatePostgreSQLDatabaseAsync(
TimeStamp: 7/11/2025 10:05:59 p. m.
Weebhook PotterCloud  •  viernes
Brahiam Ruiz Alzate — 15:01
import env from '@/config/env'

class ApiService {
  constructor() {
    this.baseURL = env.api.baseUrl
  }
Expandir
message.txt
8 KB
﻿
Brahiam Ruiz Alzate
brahiamruizalzate
Coder Riwi  ⚡🙋
import env from '@/config/env'

class ApiService {
  constructor() {
    this.baseURL = env.api.baseUrl
  }

  /**
   * Método base para todas las requests HTTP
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`

    const config = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    // Agregar body si existe y no es GET/HEAD
    if (options.body && !['GET', 'HEAD'].includes(config.method.toUpperCase())) {
      config.body = JSON.stringify(options.body)
    }

    // Agregar token de autenticación si existe
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    try {
      // Timeout handling
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), env.api.timeout)
      config.signal = controller.signal

      console.log(`🚀 ${config.method} ${url}`)

      const response = await fetch(url, config)
      clearTimeout(timeoutId)

      console.log(`✅ ${config.method} ${endpoint} - Status: ${response.status}`)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: `HTTP error! status: ${response.status}`,
        }))
        throw new Error(errorData.message || `Request failed with status ${response.status}`)
      }

      const data = await response.json()
      console.log('📦 Raw backend response:', data)
      return data
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - Please try again')
      }
      console.error(`❌ API request failed:`, error)
      throw error
    }
  }

  // ==================== AUTH ENDPOINTS ====================
  auth = {
    /**
     * Login de usuario
     * @param {Object} credentials - { email, password }
     */
    login: (credentials) =>
      this.request(env.api.endpoints.auth.login, {
        method: 'POST',
        body: credentials,
      }),

    /**
     * Registro de usuario
     * @param {Object} userData - { first_name, last_name, email, password }
     */
    register: (userData) =>
      this.request(env.api.endpoints.auth.register, {
        method: 'POST',
        body: userData,
      }),

    /**
     * Olvidé mi contraseña
     * @param {Object} data - { email }
     */
    forgotPassword: (data) =>
      this.request(env.api.endpoints.auth.forgotPassword, {
        method: 'POST',
        body: data,
      }),

    /**
     * Resetear contraseña
     * @param {Object} data - { token, newPassword }
     */
    resetPassword: (data) =>
      this.request(env.api.endpoints.auth.resetPassword, {
        method: 'POST',
        body: data,
      }),
  }

  // ==================== DATABASES ENDPOINTS ====================
  databases = {
    /**
     * Obtener todas las bases de datos
     */
    list: () => this.request(env.api.endpoints.databases.list),

    /**
     * Obtener una base de datos específica
     * @param {string} id - ID de la base de datos
     */
    get: (id) => this.request(env.api.endpoints.databases.get(id)),

    /**
     * Crear nueva base de datos
     * @param {Object} data - { engine: 1=PostgreSQL, 2=MySQL, 3=MongoDB, 4=SQLServer }
     */
    create: (data) =>
      this.request(env.api.endpoints.databases.create, {
        method: 'POST',
        body: data,
      }),

    /**
     * Actualizar base de datos
     * @param {string} id - ID de la base de datos
     * @param {Object} data - Datos a actualizar
     */
    update: (id, data) =>
      this.request(env.api.endpoints.databases.update(id), {
        method: 'PUT',
        body: data,
      }),

    /**
     * Eliminar base de datos (Soft Delete - 30 días de gracia)
     * @param {string} id - ID de la base de datos
     */
    delete: (id) =>
      this.request(env.api.endpoints.databases.delete(id), {
        method: 'DELETE',
      }),

    /**
     * Restaurar base de datos eliminada (solo si < 30 días)
     * @param {string} id - ID de la base de datos eliminada
     */
    restore: (id) =>
      this.request(env.api.endpoints.databases.restore(id), {
        method: 'POST',
      }),

    /**
     * Resetear password de base de datos (nueva contraseña llega por email)
     * @param {string} id - ID de la base de datos
     */
    resetPassword: (id) =>
      this.request(env.api.endpoints.databases.resetPassword(id), {
        method: 'POST',
      }),
  }

  // ==================== USERS ENDPOINTS ====================
  users = {
    /**
     * Obtener perfil del usuario
     */
    getProfile: () => this.request(env.api.endpoints.users.profile),

    /**
     * Actualizar perfil del usuario
     * @param {Object} data - { firstName, lastName }
     */
    updateProfile: (data) =>
      this.request(env.api.endpoints.users.update, {
        method: 'PUT',
        body: data,
      }),

    /**
     * Cambiar contraseña del usuario
     * @param {Object} data - { currentPassword, newPassword }
     */
    changePassword: (data) =>
      this.request(env.api.endpoints.users.changePassword, {
        method: 'POST',
        body: data,
      }),
  }

  // ==================== PLANS ENDPOINTS ====================
  plans = {
    /**
     * Obtener todos los planes disponibles
     * No requiere autenticación
     */
    list: () => this.request(env.api.endpoints.plans.list),

    /**
     * Obtener un plan específico
     * @param {string} id - ID del plan
     * No requiere autenticación
     */
    get: (id) => this.request(env.api.endpoints.plans.get(id)),
  }

  // ==================== PAYMENTS ENDPOINTS ====================
  payments = {
    /**
     * Crear preferencia de pago en MercadoPago
     * @param {Object} data - { planId: GUID del plan }
     * @returns {Object} { preferenceId, initPoint } - URL para redirigir al usuario
     */
    createPreference: (data) =>
      this.request(env.api.endpoints.payments.createPreference, {
        method: 'POST',
        body: data,
      }),

    /**
     * Verificar configuración de MercadoPago (debug)
     * @returns {Object} Estado de configuración
     */
    getConfigTest: () => this.request(env.api.endpoints.payments.configTest),

    /**
     * Consultar estado de orden de MercadoPago (debug)
     * @param {number} orderId - ID de la orden en MercadoPago
     * @returns {Object} Estado detallado de la orden
     */
    debugOrder: (orderId) => this.request(env.api.endpoints.payments.debugOrder(orderId)),
  }

  // ==================== HEALTH CHECK ENDPOINTS ====================
  health = {
    /**
     * Verificar estado del servidor
     * No requiere autenticación
     */
    check: () => this.request(env.api.endpoints.health.check),

    /**
     * Probar manejo de errores (debug)
     * No requiere autenticación
     */
    error: () => this.request(env.api.endpoints.health.error),
  }


}

// Exportar instancia única (Singleton)
export default new ApiService()