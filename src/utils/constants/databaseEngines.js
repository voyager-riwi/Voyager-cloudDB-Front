// src/constants/databaseEngines.js

// Importa todas las imágenes
import postgresqlLogo from '@/assets/images/database-engines/Hufflepuff_house.jpg'
import mongodbLogo from '@/assets/images/database-engines/Slytherin_house.jpg'
import sqlserverLogo from '@/assets/images/database-engines/Ravenclaw_house.jpg'
import mysqlLogo from '@/assets/images/database-engines/Gryffindor_house.jpg'

// Importa las imágenes de detalles (background)
import detailsGryffindor from '@/assets/images/database-engines/details_gryffindor.jpg'
import detailsHufflepuff from '@/assets/images/database-engines/details_hufflepuff.jpg'
import detailsRavenclaw from '@/assets/images/database-engines/details_ravenclaw.jpg'
import detailsSlytherin from '@/assets/images/database-engines/details_slytherin.jpg'

export const DATABASE_ENGINES = [
  {
    id: 'mysql',
    name: 'MySQL',
    type: 'Relational',
    logo: mysqlLogo,
    details_bg: detailsGryffindor,
    description: 'Sistema de gestión de bases de datos relacional de código abierto',
    features: ['ACID Compliance', 'Replication', 'Triggers', 'Stored Procedures'],
    defaultPort: 3306,
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    type: 'Relational',
    logo: postgresqlLogo,
    details_bg: detailsHufflepuff,
    description: 'Sistema de base de datos objeto-relacional de código abierto',
    features: ['JSON Support', 'Geospatial', 'Full Text Search', 'Extensions'],
    defaultPort: 5432,
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    type: 'NoSQL',
    logo: mongodbLogo,
    details_bg: detailsSlytherin,
    description: 'Base de datos de documentos NoSQL',
    features: ['Document Storage', 'Horizontal Scaling', 'Aggregation', 'GridFS'],
    defaultPort: 27017,
  },
  {
    id: 'sqlserver',
    name: 'SQLServer',
    type: 'Relational',
    logo: sqlserverLogo,
    details_bg: detailsRavenclaw,
    description: 'Sistema de gestión de bases de datos relacional de Microsoft',
    features: ['Business Intelligence', 'Always On', 'Columnstore', 'Polybase'],
    defaultPort: 1433,
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

// Mapeo de IDs string a IDs numéricos del backend
export const ENGINE_ID_MAP = {
  postgresql: 1,
  mysql: 2,
  mongodb: 3,
  sqlserver: 4,
  redis: 5,
  cassandra: 6,
}

// Mapeo inverso: número a string
export const ENGINE_NAME_MAP = {
  1: 'postgresql',
  2: 'mysql',
  3: 'mongodb',
  4: 'sqlserver',
}

/**
 * Convierte el ID string a número para el backend
 * @param {string} engineId - ID del motor ('mysql', 'postgresql', etc.)
 * @returns {number} ID numérico (1-6)
 */
export const getEngineNumericId = (engineId) => {
  return ENGINE_ID_MAP[engineId] || 0
}

/**
 * Convierte el ID numérico del backend a string
 * @param {number} numericId - ID numérico (1-6)
 * @returns {string} ID string ('mysql', 'postgresql', etc.)
 */
export const getEngineStringId = (numericId) => {
  return ENGINE_NAME_MAP[numericId] || 'unknown'
}
