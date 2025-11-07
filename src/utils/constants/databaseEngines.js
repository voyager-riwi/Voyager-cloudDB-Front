// src/constants/databaseEngines.js

// src/constants/databaseEngines.js

// Importa todas las imágenes
import mysqlLogo from '@/assets/images/database-engines/Black_family.png'
import postgresqlLogo from '@/assets/images/database-engines/Hufflepuff_house.jpg'
import mongodbLogo from '@/assets/images/database-engines/Slytherin_house.jpg'
import sqlserverLogo from '@/assets/images/database-engines/Ravenclaw_house.jpg'
import redisLogo from '@/assets/images/database-engines/Gryffindor_house.jpg'
import cassandraLogo from '@/assets/images/database-engines/DeathEaters_house.png'

export const DATABASE_ENGINES = [
  {
    id: 'mysql',
    name: 'MySQL',
    type: 'Relational',
    logo: mysqlLogo,
    description: 'Sistema de gestión de bases de datos relacional de código abierto',
    features: ['ACID Compliance', 'Replication', 'Triggers', 'Stored Procedures'],
    defaultPort: 3306,
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    type: 'Relational',
    logo: postgresqlLogo,
    description: 'Sistema de base de datos objeto-relacional de código abierto',
    features: ['JSON Support', 'Geospatial', 'Full Text Search', 'Extensions'],
    defaultPort: 5432,
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    type: 'NoSQL',
    logo: mongodbLogo,
    description: 'Base de datos de documentos NoSQL',
    features: ['Document Storage', 'Horizontal Scaling', 'Aggregation', 'GridFS'],
    defaultPort: 27017,
  },
  {
    id: 'sqlserver',
    name: 'SQL Server',
    type: 'Relational',
    logo: sqlserverLogo,
    description: 'Sistema de gestión de bases de datos relacional de Microsoft',
    features: ['Business Intelligence', 'Always On', 'Columnstore', 'Polybase'],
    defaultPort: 1433,
  },
  {
    id: 'redis',
    name: 'Redis',
    type: 'In-Memory',
    logo: redisLogo,
    description: 'Almacén de estructura de datos en memoria',
    features: ['In-Memory', 'Pub/Sub', 'Lua Scripting', 'Transactions'],
    defaultPort: 6379,
  },
  {
    id: 'cassandra',
    name: 'Cassandra',
    type: 'NoSQL',
    logo: cassandraLogo,
    description: 'Base de datos NoSQL distribuida',
    features: ['Linear Scalability', 'Fault Tolerance', 'MapReduce', 'CQL'],
    defaultPort: 9042,
  },
]

// Funciones de utilidad
export const getEngineById = (id) => {
  return DATABASE_ENGINES.find((engine) => engine.id === id)
}

export const getEnginesByType = (type) => {
  return DATABASE_ENGINES.filter((engine) => engine.type === type)
}

export const getEngineNames = () => {
  return DATABASE_ENGINES.map((engine) => engine.name)
}

export const ENGINE_TYPES = {
  RELATIONAL: 'Relational',
  NOSQL: 'NoSQL',
  IN_MEMORY: 'In-Memory',
}
