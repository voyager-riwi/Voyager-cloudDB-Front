# 🧙‍♂️ PotterCloud - Frontend Application

<div align="center">

![PotterCloud](https://img.shields.io/badge/PotterCloud-Frontend-7B68EE?style=for-the-badge&logo=vue.js&logoColor=white)
![Vue 3](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vue-Router](https://img.shields.io/badge/Vue_Router-4.x-42B883?style=for-the-badge&logo=vue.js&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-2.x-DC2626?style=for-the-badge&logo=pinia&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Interfaz mágica para gestionar bases de datos en la nube** ✨

[Ver Demo](https://voyager.andrescortes.dev) • [Backend API](https://service.voyager.andrescortes.dev) • [Documentación](#-tabla-de-contenidos)

</div>

---

## 🚀 Inicio Rápido

¿Necesitas poner en marcha el frontend? Aquí tienes los comandos esenciales:

```bash
# Clonar repositorio
git clone https://github.com/voyager-riwi/Voyager-cloudDB-Front.git
cd Voyager-cloudDB-Front

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar en desarrollo
npm run dev
```

**¿Primera vez con Vue 3?** → Lee la [Guía de Instalación](#-instalación)

---

## 📖 Tabla de Contenidos

- [¿Qué es PotterCloud Frontend?](#-qué-es-pottercloud-frontend)
- [Características Principales](#-características-principales)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Stack Tecnológico](#%EF%B8%8F-stack-tecnológico)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#%EF%B8%8F-configuración)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Arquitectura](#%EF%B8%8F-arquitectura)
- [Componentes Principales](#-componentes-principales)
- [Gestión de Estado](#-gestión-de-estado)
- [Integración con Backend](#-integración-con-backend)
- [Rutas y Navegación](#-rutas-y-navegación)
- [Estilos y Temas](#-estilos-y-temas)
- [Despliegue](#-despliegue)
- [Testing](#-testing)
- [Optimización y Performance](#-optimización-y-performance)
- [Buenas Prácticas](#-buenas-prácticas)
- [Troubleshooting](#-troubleshooting)
- [Contribución](#-contribución)
- [Equipo](#-equipo)
- [Licencia](#-licencia)

---

## 🧙 ¿Qué es PotterCloud Frontend?

El **Frontend de PotterCloud** es una aplicación web moderna construida con **Vue 3** y **Vite** que proporciona una interfaz intuitiva y elegante para gestionar bases de datos en la nube. Diseñada con los principios de **UX/UI modernos**, ofrece una experiencia fluida y mágica para desarrolladores de todos los niveles.

### 🎯 Misión

Proporcionar una interfaz tan simple y mágica que cualquier desarrollador pueda gestionar sus bases de datos en la nube sin necesidad de conocimientos avanzados en DevOps, permitiendo enfocarse en lo que realmente importa: construir productos increíbles.

### 💡 Filosofía de Diseño

- **Simplicidad**: Cada acción debe ser intuitiva y requerir el mínimo esfuerzo
- **Velocidad**: La interfaz debe responder instantáneamente a las acciones del usuario
- **Elegancia**: El diseño debe ser hermoso pero funcional
- **Accesibilidad**: Debe funcionar para todos, en cualquier dispositivo

---

## ✨ Características Principales

### 🎨 Interfaz de Usuario Moderna

```
┌─────────────────────────────────────────────────────────┐
│  🎯 DASHBOARD INTELIGENTE                               │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  ✓ Métricas en tiempo real                             │
│  ✓ Visualización de uso de recursos                    │
│  ✓ Historial de actividad                              │
│  ✓ Notificaciones inteligentes                         │
│                                                          │
│  💾 GESTIÓN DE BASES DE DATOS                           │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  ✓ Creación con un solo click                          │
│  ✓ Vista de tarjetas o lista                           │
│  ✓ Búsqueda y filtrado avanzado                        │
│  ✓ Gestión de credenciales segura                      │
│                                                          │
│  🎁 GESTIÓN DE PLANES                                   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  ✓ Comparación visual de planes                        │
│  ✓ Upgrade/downgrade instantáneo                       │
│  ✓ Integración con Mercado Pago                        │
│  ✓ Historial de facturación                            │
└─────────────────────────────────────────────────────────┘
```

### 🔐 Seguridad y Privacidad

- **Autenticación JWT** con renovación automática de tokens
- **Rutas protegidas** con guards de navegación
- **Manejo seguro de credenciales** (nunca en localStorage sin encriptar)
- **HTTPS obligatorio** en producción
- **Validación de formularios** en cliente y servidor
- **Prevención de XSS y CSRF**

### 📱 Diseño Responsivo Total

- **Mobile-first approach** optimizado para todos los dispositivos
- **Breakpoints inteligentes** (móvil, tablet, desktop, ultra-wide)
- **Touch-friendly** con gestos nativos en móviles
- **PWA ready** (Progressive Web App)
- **Navegación adaptativa** según tamaño de pantalla

### 🎭 Experiencia de Usuario

- **Dark/Light mode** con persistencia de preferencia
- **Animaciones fluidas** con transiciones suaves
- **Feedback visual** en todas las acciones
- **Estados de carga** informativos
- **Mensajes de error** claros y útiles
- **Tooltips contextuales** en toda la UI

### 🚀 Performance Optimizado

- **Lazy loading** de rutas y componentes
- **Code splitting** automático con Vite
- **Tree shaking** para bundle mínimo
- **Caché inteligente** de requests
- **Imágenes optimizadas** con lazy loading
- **Prefetching** de recursos críticos

---

## 📸 Capturas de Pantalla

### Dashboard Principal

```
┌────────────────────────────────────────────────────────┐
│  PotterCloud                              👤 Usuario   │
├────────────────────────────────────────────────────────┤
│                                                         │
│  📊 Resumen de Cuenta                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐              │
│  │    5     │ │  Free    │ │  Active  │              │
│  │   DBs    │ │   Plan   │ │  Status  │              │
│  └──────────┘ └──────────┘ └──────────┘              │
│                                                         │
│  💾 Mis Bases de Datos                    + Nueva DB   │
│  ┌─────────────────────────────────────────────────┐  │
│  │ 🐘 PostgreSQL - Production DB         Active ✓ │  │
│  │ Host: localhost:5433                            │  │
│  │ [Ver Credenciales] [Gestionar] [Eliminar]      │  │
│  └─────────────────────────────────────────────────┘  │
│                                                         │
└────────────────────────────────────────────────────────┘
```

### Modal de Creación de Base de Datos

```
┌────────────────────────────────────────────────────────┐
│  Crear Nueva Base de Datos                         ✕  │
├────────────────────────────────────────────────────────┤
│                                                         │
│  Nombre de la Base de Datos *                         │
│  ┌──────────────────────────────────────────────────┐ │
│  │ my_awesome_db                                    │ │
│  └──────────────────────────────────────────────────┘ │
│                                                         │
│  Motor de Base de Datos *                             │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                │
│  │  🐘  │ │  🐬  │ │  🍃  │ │  📊  │                │
│  │ Post │ │ MySQL│ │ Mongo│ │ MSSQL│                │
│  └──────┘ └──────┘ └──────┘ └──────┘                │
│                                                         │
│           [Cancelar]  [Crear Base de Datos]           │
│                                                         │
└────────────────────────────────────────────────────────┘
```

---

## 🛠️ Stack Tecnológico

### Core Framework

```yaml
Framework: Vue.js 3.4+
Build Tool: Vite 5.x
Lenguaje: JavaScript (ES6+) / TypeScript (opcional)
Arquitectura: Composition API + SFC
Package Manager: npm / pnpm / yarn
```

### Gestión de Estado y Rutas

```yaml
State Management: Pinia 2.x
Router: Vue Router 4.x
HTTP Client: Axios 1.x
Form Validation: Vuelidate 2.x
```

### UI y Estilos

```yaml
CSS Framework: Tailwind CSS 3.x
Iconos: Heroicons / Lucide Icons
Animaciones: Vue Transition + Tailwind
Componentes: Headless UI (opcional)
```

### Desarrollo y Testing

```yaml
Linter: ESLint 8.x
Formatter: Prettier 3.x
Testing: Vitest + Vue Test Utils
E2E Testing: Playwright / Cypress
```

### Librerías Destacadas

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `vue` | 3.4+ | Framework progresivo |
| `vite` | 5.x | Build tool ultra-rápido |
| `vue-router` | 4.x | Enrutamiento SPA |
| `pinia` | 2.x | State management |
| `axios` | 1.x | HTTP client |
| `tailwindcss` | 3.x | Framework CSS |
| `@vueuse/core` | 10.x | Composables de utilidad |
| `vuelidate` | 2.x | Validación de formularios |
| `dayjs` | 1.x | Manipulación de fechas |

---

## 📋 Requisitos Previos

### Software Requerido

| Software | Versión Mínima | Propósito |
|----------|---------------|-----------|
| [Node.js](https://nodejs.org/) | 18.x LTS | Runtime de JavaScript |
| [npm](https://www.npmjs.com/) | 9.x | Gestor de paquetes (incluido con Node) |
| [Git](https://git-scm.com/) | 2.40+ | Control de versiones |

**Verificar instalación:**

```bash
node --version  # v18.0.0 o superior
npm --version   # 9.0.0 o superior
git --version   # 2.40.0 o superior
```

### Conocimientos Recomendados

- ✅ HTML5, CSS3 y JavaScript moderno (ES6+)
- ✅ Vue.js 3 Composition API
- ✅ Tailwind CSS (utility-first CSS)
- ✅ RESTful APIs y promesas/async-await
- ✅ Git y GitHub básico
- ✅ NPM y gestión de paquetes

### Herramientas Opcionales

- **Visual Studio Code** o **WebStorm** para desarrollo
- **Vue.js devtools** (extensión de navegador)
- **Postman** o **Insomnia** para testing de APIs
- **Git GUI** como GitKraken o SourceTree

---

## 🚀 Instalación

### Opción 1: Instalación Estándar

#### 1. Clonar el Repositorio

```bash
git clone https://github.com/voyager-riwi/Voyager-cloudDB-Front.git
cd Voyager-cloudDB-Front
```

#### 2. Instalar Dependencias

**Con npm:**

```bash
npm install
```

**Con pnpm (más rápido):**

```bash
# Instalar pnpm si no lo tienes
npm install -g pnpm

# Instalar dependencias
pnpm install
```

**Con yarn:**

```bash
yarn install
```

#### 3. Configurar Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Editar `.env` con tus configuraciones:

```bash
# API Backend
VITE_API_BASE_URL=https://service.voyager.andrescortes.dev/api
VITE_API_TIMEOUT=10000

# Entorno
VITE_APP_ENV=development
VITE_APP_NAME=PotterCloud
VITE_APP_VERSION=1.0.0

# Features
VITE_ENABLE_DEVTOOLS=true
VITE_ENABLE_MOCK_API=false
VITE_ENABLE_ANALYTICS=false

# URLs
VITE_FRONTEND_URL=http://localhost:5173
VITE_BACKEND_URL=http://localhost:5191
```

#### 4. Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173**

---

### Opción 2: Desarrollo con Backend Local

Si quieres conectar con un backend local:

**1. Actualizar `.env`:**

```bash
VITE_API_BASE_URL=http://localhost:5191/api
```

**2. Iniciar backend y frontend:**

```bash
# Terminal 1: Backend (en carpeta del backend)
cd ../Voyager-cloudDB-Back
dotnet run

# Terminal 2: Frontend (en carpeta del frontend)
cd Voyager-cloudDB-Front
npm run dev
```

---

### Opción 3: Con Docker

#### Dockerfile para Frontend

```dockerfile
# Build stage
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Construir y Ejecutar

```bash
# Construir imagen
docker build -t pottercloud-frontend .

# Ejecutar contenedor
docker run -d -p 3011:80 pottercloud-frontend
```

---

## ⚙️ Configuración

### Archivo de Configuración de Vite

`vite.config.js`:

```javascript
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
        propsDestructure: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url))
    }
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5191',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'ui-vendor': ['@headlessui/vue']
        }
      }
    }
  }
})
```

### Configuración de Tailwind CSS

`tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        secondary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

### ESLint Configuration

`.eslintrc.cjs`:

```javascript
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-unused-vars': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
```

### Prettier Configuration

`.prettierrc.json`:

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "none",
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

---

## 📜 Scripts Disponibles

### Desarrollo

```bash
# Iniciar servidor de desarrollo con hot-reload
npm run dev

# Iniciar en un puerto específico
npm run dev -- --port 3000

# Iniciar con host abierto (accesible desde red local)
npm run dev -- --host

# Limpiar caché de Vite
npm run dev -- --force
```

### Build

```bash
# Build optimizado para producción
npm run build

# Preview del build de producción
npm run preview

# Build con análisis de bundle
npm run build -- --report

# Build sin minificación (debug)
npm run build:debug
```

### Testing

```bash
# Ejecutar todos los tests unitarios
npm run test

# Tests en modo watch
npm run test:watch

# Tests con coverage
npm run test:coverage

# Tests E2E
npm run test:e2e

# Tests E2E en modo interactivo
npm run test:e2e:ui
```

### Linting y Formateo

```bash
# Ejecutar ESLint
npm run lint

# Corregir problemas de ESLint automáticamente
npm run lint:fix

# Formatear código con Prettier
npm run format

# Verificar formato sin modificar
npm run format:check
```

### Utilidades

```bash
# Analizar tamaño del bundle
npm run analyze

# Actualizar dependencias
npm run update-deps

# Limpiar node_modules y reinstalar
npm run clean-install
```

---

## 📁 Estructura del Proyecto

```
Voyager-cloudDB-Front/
├── public/                      # Archivos estáticos
│   ├── favicon.ico
│   ├── logo.svg
│   └── robots.txt
│
├── src/
│   ├── assets/                  # Recursos (imágenes, fonts, etc.)
│   │   ├── images/
│   │   │   ├── logo.png
│   │   │   ├── hero-bg.jpg
│   │   │   └── database-icons/
│   │   ├── styles/
│   │   │   ├── main.css
│   │   │   ├── animations.css
│   │   │   └── variables.css
│   │   └── fonts/
│   │       └── inter/
│   │
│   ├── components/              # Componentes reutilizables
│   │   ├── common/              # Componentes comunes
│   │   │   ├── BaseButton.vue
│   │   │   ├── BaseModal.vue
│   │   │   ├── BaseInput.vue
│   │   │   ├── BaseSelect.vue
│   │   │   ├── BaseCard.vue
│   │   │   ├── LoadingSpinner.vue
│   │   │   ├── EmptyState.vue
│   │   │   └── Toast.vue
│   │   │
│   │   ├── layout/              # Componentes de layout
│   │   │   ├── AppHeader.vue
│   │   │   ├── AppSidebar.vue
│   │   │   ├── AppFooter.vue
│   │   │   ├── Navbar.vue
│   │   │   └── Breadcrumb.vue
│   │   │
│   │   ├── database/            # Componentes de BD
│   │   │   ├── DatabaseCard.vue
│   │   │   ├── DatabaseList.vue
│   │   │   ├── DatabaseForm.vue
│   │   │   ├── DatabaseStats.vue
│   │   │   ├── CredentialsModal.vue
│   │   │   └── ConnectionString.vue
│   │   │
│   │   ├── auth/                # Componentes de autenticación
│   │   │   ├── LoginForm.vue
│   │   │   ├── RegisterForm.vue
│   │   │   └── PasswordReset.vue
│   │   │
│   │   └── plan/                # Componentes de planes
│   │       ├── PlanCard.vue
│   │       ├── PlanComparison.vue
│   │       └── UpgradeModal.vue
│   │
│   ├── composables/             # Composables de Vue
│   │   ├── useAuth.js           # Lógica de autenticación
│   │   ├── useDatabase.js       # Lógica de bases de datos
│   │   ├── usePlan.js           # Lógica de planes
│   │   ├── useNotification.js   # Sistema de notificaciones
│   │   ├── useAPI.js            # Cliente API
│   │   ├── useForm.js           # Validación de formularios
│   │   └── useModal.js          # Gestión de modales
│   │
│   ├── layouts/                 # Layouts de página
│   │   ├── DefaultLayout.vue    # Layout por defecto
│   │   ├── AuthLayout.vue       # Layout de autenticación
│   │   └── DashboardLayout.vue  # Layout del dashboard
│   │
│   ├── router/                  # Configuración de Vue Router
│   │   ├── index.js             # Definición de rutas
│   │   ├── guards.js            # Navigation guards
│   │   └── routes.js            # Rutas separadas
│   │
│   ├── stores/                  # Stores de Pinia
│   │   ├── auth.js              # Store de autenticación
│   │   ├── database.js          # Store de bases de datos
│   │   ├── plan.js              # Store de planes
│   │   ├── notification.js      # Store de notificaciones
│   │   └── ui.js                # Store de UI (tema, sidebar, etc.)
│   │
│   ├── services/                # Servicios de API
│   │   ├── api.js               # Cliente HTTP base
│   │   ├── authService.js       # Servicio de autenticación
│   │   ├── databaseService.js   # Servicio de bases de datos
│   │   ├── planService.js       # Servicio de planes
│   │   └── paymentService.js    # Servicio de pagos
│   │
│   ├── utils/                   # Utilidades
│   │   ├── validators.js        # Validadores personalizados
│   │   ├── formatters.js        # Formateadores de datos
│   │   ├── constants.js         # Constantes globales
│   │   ├── helpers.js           # Funciones auxiliares
│   │   └── storage.js           # LocalStorage helpers
│   │
│   ├── views/                   # Páginas/Vistas
│   │   ├── Home.vue             # Página de inicio
│   │   ├── auth/
│   │   │   ├── Login.vue
│   │   │   ├── Register.vue
│   │   │   └── ForgotPassword.vue
│   │   ├── dashboard/
│   │   │   ├── Dashboard.vue    # Dashboard principal
│   │   │   ├── Overview.vue     # Resumen
│   │   │   └── Activity.vue     # Actividad reciente
│   │   ├── databases/
│   │   │   ├── DatabaseList.vue # Lista de bases de datos
│   │   │   ├── DatabaseCreate.vue
│   │   │   └── DatabaseDetail.vue
│   │   ├── plans/
│   │   │   ├── PlanList.vue     # Lista de planes
│   │   │   └── PlanUpgrade.vue  # Upgrade de plan
│   │   ├── profile/
│   │   │   ├── Profile.vue      # Perfil de usuario
│   │   │   ├── Settings.vue     # Configuración
│   │   │   └── Billing.vue      # Facturación
│   │   └── NotFound.vue         # Página 404
│   │
│   ├── App.vue                  # Componente raíz
│   └── main.js                  # Entry point
│
├── tests/                       # Tests
│   ├── unit/                    # Tests unitarios
│   │   ├── components/
│   │   ├── composables/
│   │   └── utils/
│   └── e2e/                     # Tests E2E
│       ├── auth.spec.js
│       ├── database.spec.js
│       └── plans.spec.js
│
├── .env                         # Variables de entorno
├── .env.example                 # Ejemplo de variables de entorno
├── .env.production              # Variables de producción
├── .eslintrc.cjs               # Configuración de ESLint
├── .gitignore                  # Archivos ignorados por Git
├── .prettierrc.json            # Configuración de Prettier
├── index.html                  # HTML principal
├── package.json                # Dependencias y scripts
├── postcss.config.js           # Configuración de PostCSS
├── README.md                   # Este archivo
├── tailwind.config.js          # Configuración de Tailwind
└── vite.config.js              # Configuración de Vite
```

---

## 🏗️ Arquitectura

### Patrón de Arquitectura

El proyecto sigue una **arquitectura basada en componentes** con **Composition API** de Vue 3 y **separación clara de responsabilidades**:

```
┌─────────────────────────────────────────────────────────────┐
│                         VIEWS                               │
│  (Páginas completas que combinan múltiples componentes)     │
│  • Dashboard.vue, DatabaseList.vue, Profile.vue             │
└─────────────────────┬───────────────────────────────────────┘
                      │ compuestas por
┌─────────────────────▼───────────────────────────────────────┐
│                       LAYOUTS                               │
│  (Estructuras de página con header, sidebar, footer)        │
│  • DefaultLayout.vue, AuthLayout.vue, DashboardLayout.vue   │
└─────────────────────┬───────────────────────────────────────┘
                      │ contienen
┌─────────────────────▼───────────────────────────────────────┐
│                     COMPONENTS                              │
│  (Componentes reutilizables específicos del dominio)        │
│  • DatabaseCard.vue, PlanCard.vue, BaseButton.vue           │
└─────────────────────┬───────────────────────────────────────┘
                      │ usan
        ┌─────────────┴─────────────┐
        ▼                           ▼
┌───────────────────┐       ┌───────────────────┐
│   COMPOSABLES     │       │      STORES       │
│  (Lógica reutili- │       │  (Estado global)  │
│   zable)          │       │                   │
│  • useAuth()      │       │  • authStore      │
│  • useDatabase()  │       │  • databaseStore  │
└────────┬──────────┘       └────────┬──────────┘
         │                           │
         └───────────┬───────────────┘
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                       SERVICES                              │
│  (Comunicación con API Backend)                             │
│  • authService, databaseService, planService                │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND API                              │
│            service.voyager.andrescortes.dev                 │
└─────────────────────────────────────────────────────────────┘
```

### Flujo de Datos

```
User Action (Click, Input, etc.)
    ↓
Component Event Handler
    ↓
Composable / Store Method
    ↓
Service (API Call)
    ↓
Backend API
    ↓
API Response
    ↓
Store Update (Reactive State)
    ↓
Component Re-render (Automatic)
    ↓
UI Update
```

### Arquitectura de Componentes

```
┌─────────────────────────────────────────────────────────────┐
│  ATOMIC DESIGN PATTERN                                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  🔹 Atoms (Componentes básicos)                             │
│     • BaseButton, BaseInput, BaseIcon                       │
│                                                              │
│  🔸 Molecules (Combinación de Atoms)                        │
│     • FormField (Label + Input + Error)                     │
│     • SearchBar (Input + Icon + Button)                     │
│                                                              │
│  🔶 Organisms (Secciones complejas)                         │
│     • DatabaseCard (Múltiples Molecules)                    │
│     • Navbar (Logo + Navigation + UserMenu)                 │
│                                                              │
│  🔷 Templates (Layouts)                                     │
│     • DashboardLayout (Header + Sidebar + Content)          │
│                                                              │
│  ⬛ Pages (Vistas completas)                                │
│     • Dashboard (Múltiples Organisms)                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧩 Componentes Principales

### BaseButton.vue

Botón reutilizable con múltiples variantes:

```vue
<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    :type="type"
    @click="$emit('click', $event)"
  >
    <LoadingSpinner v-if="loading" class="mr-2 h-4 w-4" />
    <component v-if="icon" :is="icon" class="mr-2 h-5 w-5" />
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'danger', 'ghost'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  loading: Boolean,
  disabled: Boolean,
  icon: Object,
  type: {
    type: String,
    default: 'button'
  }
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  
  const disabled = props.disabled || props.loading ? 'opacity-50 cursor-not-allowed' : ''
  
  return `${base} ${variants[props.variant]} ${sizes[props.size]} ${disabled}`
})
</script>
```

### DatabaseCard.vue

Tarjeta para mostrar información de una base de datos:

```vue
<template>
  <div 
    class="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700"
  >
    <!-- Header -->
    <div class="flex items-start justify-between">
      <div class="flex items-center space-x-3">
        <div class="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
          <component :is="engineIcon" class="h-8 w-8 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">
            {{ database.name }}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ database.engine }}
          </p>
        </div>
      </div>
      <span 
        :class="statusClasses"
        class="px-3 py-1 text-xs font-semibold rounded-full"
      >
        {{ database.status }}
      </span>
    </div>

    <!-- Info -->
    <div class="mt-4 space-y-2">
      <div class="flex items-center text-sm text-gray-600 dark:text-gray-300">
        <ServerIcon class="h-4 w-4 mr-2" />
        <span>{{ database.host }}:{{ database.port }}</span>
      </div>
      <div class="flex items-center text-sm text-gray-600 dark:text-gray-300">
        <CalendarIcon class="h-4 w-4 mr-2" />
        <span>Creada {{ formatDate(database.createdAt) }}</span>
      </div>
    </div>

    <!-- Actions -->
    <div class="mt-6 flex gap-2">
      <BaseButton 
        variant="primary" 
        size="sm"
        @click="$emit('view-credentials', database.id)"
      >
        <EyeIcon class="h-4 w-4 mr-1" />
        Ver Credenciales
      </BaseButton>
      <BaseButton 
        variant="danger" 
        size="sm"
        @click="$emit('delete', database.id)"
      >
        <TrashIcon class="h-4 w-4 mr-1" />
        Eliminar
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { 
  ServerIcon, 
  CalendarIcon, 
  EyeIcon, 
  TrashIcon 
} from '@heroicons/vue/24/outline'
import BaseButton from '@/components/common/BaseButton.vue'
import { formatDate } from '@/utils/formatters'

const props = defineProps({
  database: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['view-credentials', 'delete'])

const engineIcon = computed(() => {
  const icons = {
    PostgreSQL: 'PostgresIcon',
    MySQL: 'MySQLIcon',
    MongoDB: 'MongoIcon',
    SQLServer: 'SQLServerIcon'
  }
  return icons[props.database.engine] || 'ServerIcon'
})

const statusClasses = computed(() => {
  const classes = {
    Active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    Error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }
  return classes[props.database.status] || classes.Inactive
})
</script>
```

### CredentialsModal.vue

Modal para mostrar credenciales de forma segura:

```vue
<template>
  <BaseModal 
    :show="show" 
    @close="$emit('close')"
    title="Credenciales de Base de Datos"
    size="lg"
  >
    <div class="space-y-4">
      <!-- Advertencia -->
      <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div class="flex items-start">
          <ExclamationTriangleIcon class="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3" />
          <p class="text-sm text-yellow-800 dark:text-yellow-200">
            Guarda estas credenciales en un lugar seguro. Por seguridad, no las mostraremos nuevamente.
          </p>
        </div>
      </div>

      <!-- Credenciales -->
      <div class="space-y-3">
        <CredentialField 
          label="Host" 
          :value="credentials.host"
          :show-copy="true"
        />
        <CredentialField 
          label="Puerto" 
          :value="credentials.port"
        />
        <CredentialField 
          label="Base de Datos" 
          :value="credentials.database"
          :show-copy="true"
        />
        <CredentialField 
          label="Usuario" 
          :value="credentials.username"
          :show-copy="true"
        />
        <CredentialField 
          label="Contraseña" 
          :value="credentials.password"
          :show-copy="true"
          :is-password="true"
        />
      </div>

      <!-- Connection String -->
      <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          String de Conexión
        </label>
        <div class="relative">
          <pre class="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-sm overflow-x-auto">{{ connectionString }}</pre>
          <button
            @click="copyToClipboard(connectionString)"
            class="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <ClipboardIcon class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>

    <template #footer>
      <BaseButton variant="secondary" @click="$emit('close')">
        Cerrar
      </BaseButton>
      <BaseButton variant="primary" @click="downloadCredentials">
        <ArrowDownTrayIcon class="h-4 w-4 mr-2" />
        Descargar Credenciales
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import { 
  ExclamationTriangleIcon, 
  ClipboardIcon,
  ArrowDownTrayIcon 
} from '@heroicons/vue/24/outline'
import BaseModal from '@/components/common/BaseModal.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import CredentialField from '@/components/database/CredentialField.vue'
import { useNotification } from '@/composables/useNotification'

const props = defineProps({
  show: Boolean,
  credentials: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])
const { showSuccess } = useNotification()

const connectionString = computed(() => {
  const { host, port, database, username, password } = props.credentials
  return `Host=${host};Port=${port};Database=${database};Username=${username};Password=${password}`
})

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    showSuccess('Copiado al portapapeles')
  } catch (error) {
    console.error('Error al copiar:', error)
  }
}

const downloadCredentials = () => {
  const content = JSON.stringify(props.credentials, null, 2)
  const blob = new Blob([content], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `credentials-${props.credentials.database}.json`
  a.click()
  URL.revokeObjectURL(url)
  showSuccess('Credenciales descargadas')
}
</script>
```

---

## 💾 Gestión de Estado

### Pinia Store - Auth

```javascript
// stores/auth.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService from '@/services/authService'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const isLoading = ref(false)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const userName = computed(() => user.value?.firstName || 'Usuario')
  const userEmail = computed(() => user.value?.email || '')
  const currentPlan = computed(() => user.value?.currentPlan || 'Free')

  // Actions
  async function login(credentials) {
    isLoading.value = true
    try {
      const response = await authService.login(credentials)
      user.value = response.data.user
      token.value = response.data.token
      localStorage.setItem('token', response.data.token)
      return { success: true }
    } catch (error) {
      console.error('Login failed:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al iniciar sesión' 
      }
    } finally {
      isLoading.value = false
    }
  }

  async function register(userData) {
    isLoading.value = true
    try {
      const response = await authService.register(userData)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Register failed:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al registrarse' 
      }
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      user.value = null
      token.value = null
      localStorage.removeItem('token')
      router.push('/login')
    }
  }

  async function fetchCurrentUser() {
    if (!token.value) return
    
    isLoading.value = true
    try {
      const response = await authService.getCurrentUser()
      user.value = response.data
    } catch (error) {
      console.error('Failed to fetch user:', error)
      if (error.response?.status === 401) {
        logout()
      }
    } finally {
      isLoading.value = false
    }
  }

  async function updateProfile(profileData) {
    isLoading.value = true
    try {
      const response = await authService.updateProfile(profileData)
      user.value = { ...user.value, ...response.data }
      return { success: true }
    } catch (error) {
      console.error('Update profile failed:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al actualizar perfil' 
      }
    } finally {
      isLoading.value = false
    }
  }

  return {
    // State
    user,
    token,
    isLoading,
    // Getters
    isAuthenticated,
    userName,
    userEmail,
    currentPlan,
    // Actions
    login,
    register,
    logout,
    fetchCurrentUser,
    updateProfile
  }
})
```

### Pinia Store - Database

```javascript
// stores/database.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import databaseService from '@/services/databaseService'

export const useDatabaseStore = defineStore('database', () => {
  // State
  const databases = ref([])
  const selectedDatabase = ref(null)
  const isLoading = ref(false)
  const filters = ref({
    search: '',
    engine: null,
    status: null
  })

  // Getters
  const databaseCount = computed(() => databases.value.length)
  
  const databasesByEngine = computed(() => {
    return databases.value.reduce((acc, db) => {
      acc[db.engine] = (acc[db.engine] || 0) + 1
      return acc
    }, {})
  })

  const filteredDatabases = computed(() => {
    return databases.value.filter(db => {
      const matchesSearch = !filters.value.search || 
        db.name.toLowerCase().includes(filters.value.search.toLowerCase())
      const matchesEngine = !filters.value.engine || 
        db.engine === filters.value.engine
      const matchesStatus = !filters.value.status || 
        db.status === filters.value.status
      
      return matchesSearch && matchesEngine && matchesStatus
    })
  })

  const activeDatabases = computed(() => {
    return databases.value.filter(db => db.status === 'Active')
  })

  // Actions
  async function fetchDatabases() {
    isLoading.value = true
    try {
      const response = await databaseService.getAll()
      databases.value = response.data
      return { success: true }
    } catch (error) {
      console.error('Failed to fetch databases:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al cargar bases de datos' 
      }
    } finally {
      isLoading.value = false
    }
  }

  async function createDatabase(data) {
    isLoading.value = true
    try {
      const response = await databaseService.create(data)
      databases.value.push(response.data)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Failed to create database:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al crear base de datos' 
      }
    } finally {
      isLoading.value = false
    }
  }

  async function deleteDatabase(id) {
    isLoading.value = true
    try {
      await databaseService.delete(id)
      databases.value = databases.value.filter(db => db.id !== id)
      return { success: true }
    } catch (error) {
      console.error('Failed to delete database:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al eliminar base de datos' 
      }
    } finally {
      isLoading.value = false
    }
  }

  async function getDatabaseById(id) {
    const cached = databases.value.find(db => db.id === id)
    if (cached) {
      selectedDatabase.value = cached
      return { success: true, data: cached }
    }

    isLoading.value = true
    try {
      const response = await databaseService.getById(id)
      selectedDatabase.value = response.data
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Failed to fetch database:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al cargar base de datos' 
      }
    } finally {
      isLoading.value = false
    }
  }

  function setFilters(newFilters) {
    filters.value = { ...filters.value, ...newFilters }
  }

  function clearFilters() {
    filters.value = {
      search: '',
      engine: null,
      status: null
    }
  }

  return {
    // State
    databases,
    selectedDatabase,
    isLoading,
    filters,
    // Getters
    databaseCount,
    databasesByEngine,
    filteredDatabases,
    activeDatabases,
    // Actions
    fetchDatabases,
    createDatabase,
    deleteDatabase,
    getDatabaseById,
    setFilters,
    clearFilters
  }
})
```

---

## 🔌 Integración con Backend

### API Service Base

```javascript
// services/api.js
import axios from 'axios'
import router from '@/router'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5191/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Log request in development
    if (import.meta.env.DEV) {
      console.log('🚀 Request:', config.method.toUpperCase(), config.url)
    }
    
    return config
  },
  (error) => {
    console.error('❌ Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log('✅ Response:', response.status, response.config.url)
    }
    return response
  },
  (error) => {
    console.error('❌ Response error:', error)
    
    // Handle specific error cases
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized - redirect to login
          localStorage.removeItem('token')
          router.push('/login')
          break
        case 403:
          // Forbidden
          console.error('Access forbidden')
          break
        case 404:
          // Not found
          console.error('Resource not found')
          break
        case 500:
          // Server error
          console.error('Server error')
          break
        default:
          console.error('API error:', error.response.data)
      }
    } else if (error.request) {
      // Request made but no response
      console.error('No response from server')
    } else {
      // Something else happened
      console.error('Error:', error.message)
    }
    
    return Promise.reject(error)
  }
)

export default api
```

### Database Service

```javascript
// services/databaseService.js
import api from './api'

export default {
  /**
   * Get all databases for the authenticated user
   */
  getAll() {
    return api.get('/databases')
  },

  /**
   * Get a specific database by ID
   */
  getById(id) {
    return api.get(`/databases/${id}`)
  },

  /**
   * Create a new database
   */
  create(data) {
    return api.post('/databases', {
      name: data.name,
      engine: data.engine
    })
  },

  /**
   * Delete a database
   */
  delete(id) {
    return api.delete(`/databases/${id}`)
  },

  /**
   * Get database credentials
   */
  getCredentials(id) {
    return api.get(`/databases/${id}/credentials`)
  },

  /**
   * Get database statistics
   */
  getStatistics(id) {
    return api.get(`/databases/${id}/statistics`)
  },

  /**
   * Test database connection
   */
  testConnection(id) {
    return api.post(`/databases/${id}/test-connection`)
  }
}
```

### Auth Service

```javascript
// services/authService.js
import api from './api'

export default {
  /**
   * Login with email and password
   */
  login(credentials) {
    return api.post('/auth/login', {
      email: credentials.email,
      password: credentials.password
    })
  },

  /**
   * Register a new user
   */
  register(userData) {
    return api.post('/auth/register', {
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName
    })
  },

  /**
   * Logout current user
   */
  logout() {
    return api.post('/auth/logout')
  },

  /**
   * Get current authenticated user
   */
  getCurrentUser() {
    return api.get('/auth/me')
  },

  /**
   * Update user profile
   */
  updateProfile(profileData) {
    return api.put('/auth/profile', profileData)
  },

  /**
   * Change password
   */
  changePassword(passwords) {
    return api.post('/auth/change-password', {
      currentPassword: passwords.currentPassword,
      newPassword: passwords.newPassword
    })
  },

  /**
   * Request password reset
   */
  requestPasswordReset(email) {
    return api.post('/auth/forgot-password', { email })
  },

  /**
   * Reset password with token
   */
  resetPassword(token, newPassword) {
    return api.post('/auth/reset-password', {
      token,
      newPassword
    })
  }
}
```

---

## 🗺️ Rutas y Navegación

### Configuración de Vue Router

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Save intended destination
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
    return
  }
  
  // Redirect authenticated users away from auth pages
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    next({ name: 'dashboard' })
    return
  }
  
  // Update document title
  if (to.meta.title) {
    document.title = `${to.meta.title} | PotterCloud`
  }
  
  next()
})

export default router
```

### Definición de Rutas

```javascript
// router/routes.js
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

export default [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: { title: 'Inicio' }
      }
    ]
  },
  {
    path: '/auth',
    component: AuthLayout,
    meta: { guestOnly: true },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/auth/Login.vue'),
        meta: { title: 'Iniciar Sesión' }
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/auth/Register.vue'),
        meta: { title: 'Registrarse' }
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('@/views/auth/ForgotPassword.vue'),
        meta: { title: 'Recuperar Contraseña' }
      }
    ]
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue'),
        meta: { title: 'Dashboard' }
      },
      {
        path: 'databases',
        name: 'databases',
        component: () => import('@/views/databases/DatabaseList.vue'),
        meta: { title: 'Mis Bases de Datos' }
      },
      {
        path: 'databases/create',
        name: 'database-create',
        component: () => import('@/views/databases/DatabaseCreate.vue'),
        meta: { title: 'Nueva Base de Datos' }
      },
      {
        path: 'databases/:id',
        name: 'database-detail',
        component: () => import('@/views/databases/DatabaseDetail.vue'),
        meta: { title: 'Detalle de Base de Datos' }
      },
      {
        path: 'plans',
        name: 'plans',
        component: () => import('@/views/plans/PlanList.vue'),
        meta: { title: 'Planes' }
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/profile/Profile.vue'),
        meta: { title: 'Mi Perfil' }
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/views/profile/Settings.vue'),
        meta: { title: 'Configuración' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: '404 - No Encontrado' }
  }
]
```

---

## 🎨 Estilos y Temas

### Sistema de Temas (Dark/Light Mode)

```javascript
// composables/useTheme.js
import { ref, watch, onMounted } from 'vue'

export function useTheme() {
  const isDark = ref(false)

  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    isDark.value = savedTheme === 'dark' || (!savedTheme && prefersDark)
    updateTheme()
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  const updateTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  watch(isDark, updateTheme)

  onMounted(() => {
    initTheme()
  })

  return {
    isDark,
    toggleTheme
  }
}
```

### Estilos Globales

```css
/* src/assets/styles/main.css */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Custom Base Styles */
@layer base {
  body {
    @apply bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-bold text-gray-900 dark:text-white;
  }

  a {
    @apply text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors;
  }
}

/* Custom Components */
@layer components {
  .btn {
    @apply px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;
  }

  .btn-primary {
    @apply bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500;
  }

  .btn-secondary {
    @apply bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500;
  }

  .card {
    @apply bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6;
  }

  .input {
    @apply w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white;
  }
}

/* Custom Utilities */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in;
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

.animate-spin {
  animation: spin 1s linear infinite;
}
```

---

## 🚀 Despliegue

### Build para Producción

```bash
# Build optimizado
npm run build

# El resultado estará en la carpeta 'dist/'
```

### Despliegue en Netlify

**1. Conectar Repositorio:**
- Ir a [Netlify](https://netlify.com)
- Conectar cuenta de GitHub
- Seleccionar repositorio `Voyager-cloudDB-Front`

**2. Configurar Build:**
```yaml
Build command: npm run build
Publish directory: dist
```

**3. Variables de Entorno:**
```bash
VITE_API_BASE_URL=https://service.voyager.andrescortes.dev/api
VITE_API_TIMEOUT=10000
VITE_APP_ENV=production
```

**4. Deploy automático:**
- Cada push a `main` desplegará automáticamente

### Despliegue en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**Configurar `vercel.json`:**

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/.*",
      "dest": "/index.html"
    }
  ]
}
```

### Despliegue Manual en VPS con Nginx

**1. Build del proyecto:**

```bash
npm run build
```

**2. Copiar archivos al servidor:**

```bash
scp -r dist/* user@server:/var/www/pottercloud
```

**3. Configurar Nginx:**

```nginx
server {
    listen 80;
    server_name voyager.andrescortes.dev;

    root /var/www/pottercloud;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/javascript application/json;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

**4. SSL con Let's Encrypt:**

```bash
sudo certbot --nginx -d voyager.andrescortes.dev
```

### GitHub Actions para Deploy Automático

`.github/workflows/deploy.yml`:

```yaml
name: Deploy Frontend

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
          VITE_API_TIMEOUT: ${{ secrets.VITE_API_TIMEOUT }}

      - name: Deploy to Server
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          source: "dist/*"
          target: "/var/www/pottercloud"
          strip_components: 1
```

---

## 🧪 Testing

### Tests Unitarios con Vitest

```javascript
// tests/unit/components/BaseButton.spec.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '@/components/common/BaseButton.vue'

describe('BaseButton', () => {
  it('renders slot content correctly', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click me'
      }
    })
    expect(wrapper.text()).toContain('Click me')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(BaseButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('is disabled when loading prop is true', () => {
    const wrapper = mount(BaseButton, {
      props: { loading: true }
    })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('applies correct variant classes', () => {
    const wrapper = mount(BaseButton, {
      props: { variant: 'danger' }
    })
    expect(wrapper.classes()).toContain('bg-red-600')
  })
})
```

### Tests E2E con Playwright

```javascript
// tests/e2e/auth.spec.js
import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('user can login successfully', async ({ page }) => {
    await page.goto('/login')
    
    await page.fill('[name="email"]', 'test@example.com')
    await page.fill('[name="password"]', 'password123')
    await page.click('button[type="submit"]')
    
    await expect(page).toHaveURL('/dashboard')
    await expect(page.locator('h1')).toContainText('Dashboard')
  })

  test('shows error with invalid credentials', async ({ page }) => {
    await page.goto('/login')
    
    await page.fill('[name="email"]', 'invalid@example.com')
    await page.fill('[name="password"]', 'wrongpassword')
    await page.click('button[type="submit"]')
    
    await expect(page.locator('.error-message')).toBeVisible()
  })
})
```

### Ejecutar Tests

```bash
# Tests unitarios
npm run test:unit

# Tests unitarios en watch mode
npm run test:unit -- --watch

# Tests con coverage
npm run test:coverage

# Tests E2E
npm run test:e2e

# Tests E2E en modo interactivo
npm run test:e2e:ui
```

---

## ⚡ Optimización y Performance

### Lazy Loading de Rutas

```javascript
// router/routes.js
const routes = [
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard.vue') // Lazy loaded
  }
]
```

### Code Splitting

```javascript
// Dividir vendors en chunks separados
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'ui-vendor': ['@headlessui/vue'],
          'utils-vendor': ['axios', 'dayjs']
        }
      }
    }
  }
}
```

### Optimización de Imágenes

```vue
<template>
  <!-- Lazy loading de imágenes -->
  <img 
    :src="imageSrc" 
    loading="lazy"
    alt="Description"
  />

  <!-- Picture para diferentes formatos -->
  <picture>
    <source srcset="image.webp" type="image/webp">
    <source srcset="image.jpg" type="image/jpeg">
    <img src="image.jpg" alt="Description">
  </picture>
</template>
```

### Memoización con Computed

```javascript
const expensiveComputation = computed(() => {
  // Solo se recalcula cuando dependencies cambien
  return heavyOperation(props.data)
})
```

### Virtual Scrolling para Listas Largas

```bash
npm install vue-virtual-scroller
```

```vue
<template>
  <RecycleScroller
    :items="databases"
    :item-size="100"
    key-field="id"
    v-slot="{ item }"
  >
    <DatabaseCard :database="item" />
  </RecycleScroller>
</template>
```

---

## 💡 Buenas Prácticas

### Convenciones de Código

1. **Nombres de Componentes:** PascalCase
   ```javascript
   // ✅ Correcto
   BaseButton.vue
   DatabaseCard.vue
   
   // ❌ Incorrecto
   baseButton.vue
   database-card.vue
   ```

2. **Props con Validación:**
   ```javascript
   const props = defineProps({
     size: {
       type: String,
       default: 'md',
       validator: (value) => ['sm', 'md', 'lg'].includes(value)
     }
   })
   ```

3. **Emits Declarados:**
   ```javascript
   const emit = defineEmits(['update', 'delete', 'cancel'])
   ```

4. **Composables con `use` prefix:**
   ```javascript
   // ✅ Correcto
   useAuth.js
   useDatabase.js
   
   // ❌ Incorrecto
   auth.js
   database.js
   ```

### Estructura de Componentes

```vue
<script setup>
// 1. Imports
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// 2. Props
const props = defineProps({})

// 3. Emits
const emit = defineEmits([])

// 4. Composables
const router = useRouter()

// 5. Reactive state
const isOpen = ref(false)

// 6. Computed
const total = computed(() => {})

// 7. Methods
function handleClick() {}

// 8. Lifecycle
onMounted(() => {})
</script>

<template>
  <!-- Template -->
</template>

<style scoped>
/* Component-specific styles */
</style>
```

### Seguridad

```javascript
// ✅ Sanitizar entrada de usuario
import DOMPurify from 'dompurify'
const cleanHTML = DOMPurify.sanitize(userInput)

// ✅ Validar datos antes de enviar
const isValid = validateForm(formData)
if (!isValid) return

// ✅ Nunca almacenar datos sensibles en localStorage sin encriptar
// ❌ localStorage.setItem('password', password)
// ✅ Use token JWT con expiración
```

### Performance

```javascript
// ✅ Usar v-once para contenido estático
<div v-once>{{ staticContent }}</div>

// ✅ Usar v-memo para optimizar listas
<div v-for="item in list" :key="item.id" v-memo="[item.id]">

// ✅ Debounce en búsquedas
import { useDebounceFn } from '@vueuse/core'
const debouncedSearch = useDebounceFn(search, 300)
```

---

## 🔧 Troubleshooting

### Problemas Comunes

#### Error: "Cannot find module"

```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

#### Error de CORS en desarrollo

```javascript
// vite.config.js - Configurar proxy
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5191',
      changeOrigin: true
    }
  }
}
```

#### Build muy lento

```bash
# Deshabilitar source maps en producción
# vite.config.js
build: {
  sourcemap: false
}
```

#### Problemas con Hot Reload

```bash
# Reiniciar servidor con caché limpia
npm run dev -- --force
```

---

## 🤝 Contribución

### Cómo Contribuir

1. **Fork el repositorio**

```bash
git clone https://github.com/tu-usuario/Voyager-cloudDB-Front.git
cd Voyager-cloudDB-Front
```

2. **Crear rama para tu feature**

```bash
git checkout -b feature/nueva-funcionalidad
```

3. **Hacer cambios y commit**

```bash
git add .
git commit -m "feat: agregar nueva funcionalidad"
```

4. **Push a tu fork**

```bash
git push origin feature/nueva-funcionalidad
```

5. **Crear Pull Request en GitHub**

### Convenciones de Commits

Seguir [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: formato, punto y coma faltante, etc.
refactor: refactorización de código
test: agregar tests
chore: actualizar tareas de build, configuración, etc.
```

### Checklist antes de PR

- [ ] El código compila sin errores
- [ ] Todos los tests pasan
- [ ] El código sigue las convenciones del proyecto
- [ ] La documentación está actualizada
- [ ] No hay console.logs innecesarios
- [ ] Las variables de entorno sensibles no están hardcodeadas

---

## 👥 Equipo

Este proyecto fue desarrollado por el equipo **Voyager** como proyecto final del bootcamp de desarrollo web en RIWI:

### Desarrolladores

**Frontend Team:**
- **Andrés Cortés** - Tech Lead & DevOps
- **Denis** - Frontend Lead Developer
  - Desarrollo de la interfaz de usuario en Vue.js
  - Diseño e implementación de componentes reutilizables
  - Integración con backend API
  - Implementación de autenticación y gestión de estado
  - Optimización de performance y UX/UI

**Backend Team:**
- **Andrés Cortés** - Tech Lead & DevOps
- **Miguel** - Backend Developer & Authentication
- **Brahiam** - Backend Developer & Payments Integration  
- **Vanessa** - Backend Developer & Infrastructure

### Agradecimientos

- **RIWI** por la formación integral y mentoría durante el bootcamp
- **Clever Cloud** por la inspiración en el diseño y funcionalidad
- **Comunidad Vue.js** por las herramientas y recursos
- **Comunidad Open Source** por las librerías utilizadas

---

## 📄 Licencia

Este proyecto es software educativo desarrollado como proyecto final del bootcamp de RIWI. Se permite su uso con fines educativos y de demostración.

**MIT License** - Copyright (c) 2025 Equipo Voyager - RIWI

---

## 📞 Contacto y Soporte

### Enlaces del Proyecto

- **Frontend:** https://voyager.andrescortes.dev
- **Backend API:** https://service.voyager.andrescortes.dev
- **Documentación API:** https://service.voyager.andrescortes.dev/swagger
- **GitHub Frontend:** https://github.com/voyager-riwi/Voyager-cloudDB-Front
- **GitHub Backend:** https://github.com/voyager-riwi/Voyager-cloudDB-Back

### Reportar Issues

Para reportar bugs o solicitar nuevas funcionalidades:
1. Ir a [GitHub Issues](https://github.com/voyager-riwi/Voyager-cloudDB-Front/issues)
2. Crear un nuevo issue con la etiqueta correspondiente
3. Describir el problema o feature detalladamente

### Soporte

Para preguntas o soporte técnico, puedes:
- Abrir un issue en GitHub
- Contactar al equipo a través del repositorio

---

## 📚 Recursos Adicionales

### Documentación Oficial

- [Vue.js 3 Documentation](https://vuejs.org/) - Framework principal
- [Vite Documentation](https://vitejs.dev/) - Build tool
- [Vue Router Documentation](https://router.vuejs.org/) - Enrutamiento
- [Pinia Documentation](https://pinia.vuejs.org/) - State management
- [Tailwind CSS Documentation](https://tailwindcss.com/) - Framework CSS
- [VueUse Documentation](https://vueuse.org/) - Composables de utilidad

### Tutoriales y Cursos

- [Vue Mastery](https://www.vuemastery.com/) - Cursos de Vue.js
- [Vue School](https://vueschool.io/) - Tutoriales y cursos
- [Tailwind CSS Crash Course](https://www.youtube.com/watch?v=pfaSUYaSgRo) - YouTube
- [Pinia Crash Course](https://www.youtube.com/watch?v=JGC7aAC-3y8) - YouTube

### Herramientas de Desarrollo

- [Vue.js Devtools](https://devtools.vuejs.org/) - Extension de navegador
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - VS Code extension
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - VS Code extension

### Comunidad

- [Vue.js Forum](https://forum.vuejs.org/)
- [Vue.js Discord](https://discord.com/invite/vue)
- [Stack Overflow - Vue.js](https://stackoverflow.com/questions/tagged/vue.js)

---

<div align="center">

**Hecho con ❤️ y ☕ por el equipo Voyager**

✨ *"La magia está en los detalles"* ✨

![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)
![Vue](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

[⬆️ Volver arriba](#-pottercloud---frontend-application)

</div>
