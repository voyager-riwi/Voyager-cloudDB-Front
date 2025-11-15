# 🧙‍♂️ PotterCloud - Frontend Application

<div align="center">

![PotterCloud](https://img.shields.io/badge/PotterCloud-Frontend-7B68EE?style=for-the-badge&logo=vue.js)
![Vue 3](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Interfaz mágica para gestionar bases de datos en la nube** ✨

[Frontend](https://voyager.andrescortes.dev) • [Backend API](https://service.voyager.andrescortes.dev) 

</div>

---

## 📖 Tabla de Contenidos

- [¿Qué es PotterCloud Frontend?](#qué-es-pottercloud-frontend)
- [Características Principales](#características-principales)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Arquitectura](#arquitectura)
- [Componentes Principales](#componentes-principales)
- [Gestión de Estado](#gestión-de-estado)
- [Integración con Backend](#integración-con-backend)
- [Despliegue](#despliegue)
- [Testing](#testing)
- [Buenas Prácticas](#buenas-prácticas)
- [Contribución](#contribución)
- [Equipo](#equipo)
- [Licencia](#licencia)

---

## ¿Qué es PotterCloud Frontend?

El **Frontend de PotterCloud** es una aplicación web moderna construida con **Vue 3** y **Vite** que proporciona una interfaz intuitiva y elegante para gestionar bases de datos en la nube. Diseñada con los principios de **UX/UI modernos**, ofrece una experiencia fluida y mágica para desarrolladores de todos los niveles.

### 🎯 Objetivos

- **Simplicidad**: Interfaz intuitiva que no requiere conocimientos técnicos avanzados
- **Velocidad**: Carga instantánea y respuesta en tiempo real
- **Elegancia**: Diseño moderno con animaciones suaves
- **Accesibilidad**: Compatible con todos los navegadores y dispositivos

---

## Características Principales

### ✨ Interfaz Intuitiva

- **Dashboard moderno** con métricas en tiempo real
- **Creación instantánea** de bases de datos con un click
- **Visualización clara** de todas las instancias de BD
- **Gestión de credenciales** fácil y segura
- **Notificaciones en tiempo real** de todas las operaciones

### 🎨 Diseño Responsivo

- **Mobile-first** diseñado para funcionar en cualquier dispositivo
- **Dark mode** nativo para reducir fatiga visual
- **Animaciones fluidas** con Tailwind CSS
- **Iconografía consistente** con bibliotecas modernas

### 🔐 Seguridad

- **Autenticación JWT** con tokens seguros
- **Rutas protegidas** con guards de navegación
- **Manejo seguro de credenciales** (nunca en localStorage)
- **HTTPS obligatorio** en producción

### 🚀 Rendimiento

- **Lazy loading** de rutas y componentes
- **Code splitting** automático con Vite
- **Optimización de assets** en build
- **Caché inteligente** de requests

---

## Tecnologías

### Core

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Vue.js** | 3.4+ | Framework progresivo para UI |
| **Vite** | 5.x | Build tool ultra-rápido |
| **TypeScript** | 5.x | Tipado estático (opcional) |
| **Vue Router** | 4.x | Enrutamiento SPA |
| **Pinia** | 2.x | State management |

### Estilos

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Tailwind CSS** | 3.x | Framework CSS utility-first |
| **PostCSS** | 8.x | Procesamiento de CSS |
| **Autoprefixer** | 10.x | Prefijos de vendor automáticos |

### Utilidades

| Tecnología | Propósito |
|------------|-----------|
| **Axios** | HTTP client para API requests |
| **VueUse** | Composables de utilidad |
| **Heroicons** | Iconos SVG optimizados |
| **Day.js** | Manipulación de fechas ligera |
| **Vuelidate** | Validación de formularios |

### Desarrollo

| Herramienta | Propósito |
|-------------|-----------|
| **ESLint** | Linter de JavaScript/TypeScript |
| **Prettier** | Formateador de código |
| **Vitest** | Testing unitario |
| **Playwright** | Testing E2E |

---

## Requisitos Previos

### Software Requerido

| Software | Versión Mínima | Propósito |
|----------|---------------|-----------|
| [Node.js](https://nodejs.org/) | 18.x | Runtime de JavaScript |
| [npm](https://www.npmjs.com/) o [pnpm](https://pnpm.io/) | 9.x / 8.x | Gestor de paquetes |
| [Git](https://git-scm.com/) | 2.40+ | Control de versiones |

### Conocimientos Recomendados

- ✅ HTML, CSS y JavaScript moderno (ES6+)
- ✅ Vue.js 3 Composition API
- ✅ TypeScript básico (opcional)
- ✅ Tailwind CSS
- ✅ RESTful APIs
- ✅ Git y GitHub

---

## Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/voyager-riwi/Voyager-cloudDB-Front.git
cd Voyager-cloudDB-Front
```

### 2. Instalar Dependencias

**Con npm:**

```bash
npm install
```

**Con pnpm (recomendado):**

```bash
pnpm install
```

### 3. Configurar Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```bash
# API Backend
VITE_API_BASE_URL=https://service.voyager.andrescortes.dev/api
VITE_API_TIMEOUT=10000

# Entorno
VITE_APP_ENV=development
VITE_APP_NAME=PotterCloud

# Features
VITE_ENABLE_DEVTOOLS=true
VITE_ENABLE_MOCK_API=false
```

**Para desarrollo local:**

```bash
VITE_API_BASE_URL=http://localhost:5191/api
```

### 4. Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173**

---

## Configuración

### Configuración de Vite

El archivo `vite.config.js` contiene la configuración principal:

```javascript
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5191',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

### Configuración de Tailwind CSS

El archivo `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7B68EE',
        secondary: '#4FC08D',
      }
    },
  },
  plugins: [],
}
```

### ESLint Configuration

El archivo `.eslintrc.cjs`:

```javascript
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
```

---

## Scripts Disponibles

### Desarrollo

```bash
# Iniciar servidor de desarrollo con hot-reload
npm run dev

# Iniciar en un puerto específico
npm run dev -- --port 3000

# Iniciar con host abierto (accesible desde red local)
npm run dev -- --host
```

### Build

```bash
# Build para producción
npm run build

# Preview del build de producción
npm run preview
```

### Testing

```bash
# Ejecutar tests unitarios
npm run test:unit

# Ejecutar tests con coverage
npm run test:coverage

# Ejecutar tests E2E
npm run test:e2e
```

### Linting y Formateo

```bash
# Ejecutar ESLint
npm run lint

# Corregir problemas de ESLint automáticamente
npm run lint:fix

# Formatear código con Prettier
npm run format
```

---

## Estructura del Proyecto

```
Voyager-cloudDB-Front/
├── public/                      # Archivos estáticos
│   ├── favicon.ico
│   └── logo.svg
├── src/
│   ├── assets/                  # Recursos (imágenes, fonts, etc.)
│   │   ├── images/
│   │   ├── styles/
│   │   └── icons/
│   ├── components/              # Componentes reutilizables
│   │   ├── common/              # Componentes comunes
│   │   │   ├── BaseButton.vue
│   │   │   ├── BaseModal.vue
│   │   │   ├── BaseInput.vue
│   │   │   └── LoadingSpinner.vue
│   │   ├── layout/              # Componentes de layout
│   │   │   ├── Navbar.vue
│   │   │   ├── Sidebar.vue
│   │   │   └── Footer.vue
│   │   └── database/            # Componentes específicos de BD
│   │       ├── DatabaseCard.vue
│   │       ├── DatabaseForm.vue
│   │       └── CredentialsModal.vue
│   ├── composables/             # Composables de Vue
│   │   ├── useAuth.js
│   │   ├── useDatabase.js
│   │   ├── useNotification.js
│   │   └── useAPI.js
│   ├── layouts/                 # Layouts de página
│   │   ├── DefaultLayout.vue
│   │   ├── AuthLayout.vue
│   │   └── DashboardLayout.vue
│   ├── router/                  # Configuración de Vue Router
│   │   ├── index.js
│   │   └── guards.js
│   ├── stores/                  # Stores de Pinia
│   │   ├── auth.js
│   │   ├── database.js
│   │   └── notification.js
│   ├── services/                # Servicios de API
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── databaseService.js
│   ├── utils/                   # Utilidades
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   └── constants.js
│   ├── views/                   # Páginas/Vistas
│   │   ├── Home.vue
│   │   ├── Login.vue
│   │   ├── Register.vue
│   │   ├── Dashboard.vue
│   │   ├── Databases.vue
│   │   ├── Plans.vue
│   │   └── Profile.vue
│   ├── App.vue                  # Componente raíz
│   └── main.js                  # Entry point
├── tests/                       # Tests
│   ├── unit/
│   └── e2e/
├── .env                         # Variables de entorno
├── .env.example                 # Ejemplo de variables de entorno
├── .eslintrc.cjs               # Configuración de ESLint
├── .gitignore                  # Archivos ignorados por Git
├── .prettierrc                 # Configuración de Prettier
├── index.html                  # HTML principal
├── package.json                # Dependencias y scripts
├── postcss.config.js           # Configuración de PostCSS
├── README.md                   # Este archivo
├── tailwind.config.js          # Configuración de Tailwind
└── vite.config.js              # Configuración de Vite
```

---

## Arquitectura

### Patrón de Arquitectura

El proyecto sigue una **arquitectura basada en componentes** con **Composition API** de Vue 3:

```
┌─────────────────────────────────────────────────┐
│                    Views                        │
│  (Páginas completas - Dashboard, Login, etc.)   │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│                 Layouts                         │
│  (Estructuras de página - Default, Auth, etc.)  │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│               Components                        │
│  (Componentes reutilizables - Buttons, etc.)    │
└─────────────────┬───────────────────────────────┘
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
┌───────────────┐   ┌──────────────┐
│  Composables  │   │    Stores    │
│  (Lógica)     │   │  (Estado)    │
└───────┬───────┘   └──────┬───────┘
        │                  │
        └─────────┬────────┘
                  ▼
┌─────────────────────────────────────────────────┐
│                 Services                        │
│  (Comunicación con API Backend)                 │
└─────────────────────────────────────────────────┘
```

### Flujo de Datos

```
User Action
    ↓
Component Event
    ↓
Composable/Store
    ↓
Service (API Call)
    ↓
Backend API
    ↓
Response
    ↓
Store Update
    ↓
Component Re-render
```

---

## Componentes Principales

### BaseButton.vue

Botón reutilizable con múltiples variantes:

```vue
<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <LoadingSpinner v-if="loading" class="mr-2" />
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'danger'].includes(v)
  },
  loading: Boolean,
  disabled: Boolean
})
</script>
```

### DatabaseCard.vue

Tarjeta para mostrar información de una base de datos:

```vue
<template>
  <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-bold">{{ database.name }}</h3>
      <span :class="statusClass">{{ database.status }}</span>
    </div>
    <p class="text-gray-600 mt-2">{{ database.engine }}</p>
    <div class="mt-4 flex gap-2">
      <BaseButton @click="viewCredentials">Ver Credenciales</BaseButton>
      <BaseButton variant="danger" @click="deleteDatabase">Eliminar</BaseButton>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'

const props = defineProps({
  database: {
    type: Object,
    required: true
  }
})
</script>
```

---

## Gestión de Estado

### Pinia Store - Auth

```javascript
// stores/auth.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const isAuthenticated = computed(() => !!token.value)

  async function login(credentials) {
    try {
      const response = await authService.login(credentials)
      user.value = response.user
      token.value = response.token
      localStorage.setItem('token', response.token)
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout
  }
})
```

### Pinia Store - Database

```javascript
// stores/database.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import databaseService from '@/services/databaseService'

export const useDatabaseStore = defineStore('database', () => {
  const databases = ref([])
  const loading = ref(false)

  async function fetchDatabases() {
    loading.value = true
    try {
      const response = await databaseService.getAll()
      databases.value = response.data
    } catch (error) {
      console.error('Failed to fetch databases:', error)
    } finally {
      loading.value = false
    }
  }

  async function createDatabase(data) {
    try {
      const response = await databaseService.create(data)
      databases.value.push(response.data)
      return response.data
    } catch (error) {
      console.error('Failed to create database:', error)
      throw error
    }
  }

  async function deleteDatabase(id) {
    try {
      await databaseService.delete(id)
      databases.value = databases.value.filter(db => db.id !== id)
    } catch (error) {
      console.error('Failed to delete database:', error)
      throw error
    }
  }

  return {
    databases,
    loading,
    fetchDatabases,
    createDatabase,
    deleteDatabase
  }
})
```

---

## Integración con Backend

### API Service

```javascript
// services/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT || 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      localStorage.removeItem('token')
      window.location.href = '/login'
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
  getAll() {
    return api.get('/databases')
  },

  getById(id) {
    return api.get(`/databases/${id}`)
  },

  create(data) {
    return api.post('/databases', data)
  },

  delete(id) {
    return api.delete(`/databases/${id}`)
  },

  getCredentials(id) {
    return api.get(`/databases/${id}/credentials`)
  }
}
```

---

## Despliegue

### Build para Producción

```bash
# Crear build optimizado
npm run build

# El build se generará en la carpeta 'dist/'
```

### Despliegue en Netlify

1. Conectar repositorio de GitHub
2. Configurar build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. Configurar variables de entorno en Netlify
4. Deploy automático en cada push

### Despliegue en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Despliegue Manual (VPS)

```bash
# Build
npm run build

# Copiar carpeta dist/ al servidor
scp -r dist/* user@server:/var/www/pottercloud

# Configurar Nginx para servir la aplicación
```

**Configuración de Nginx:**

```nginx
server {
    listen 80;
    server_name voyager.andrescortes.dev;

    root /var/www/pottercloud;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5191;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Testing

### Tests Unitarios

```javascript
// tests/unit/components/BaseButton.spec.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '@/components/common/BaseButton.vue'

describe('BaseButton', () => {
  it('renders slot content', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click me'
      }
    })
    expect(wrapper.text()).toContain('Click me')
  })

  it('emits click event', async () => {
    const wrapper = mount(BaseButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('is disabled when loading', () => {
    const wrapper = mount(BaseButton, {
      props: { loading: true }
    })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })
})
```

---

## Buenas Prácticas

### Convenciones de Código

1. **Nombres de Componentes:** PascalCase (ej: `BaseButton.vue`)
2. **Nombres de Variables:** camelCase (ej: `userName`)
3. **Nombres de Constantes:** UPPER_SNAKE_CASE (ej: `API_BASE_URL`)
4. **Composition API:** Preferir `<script setup>` sobre Options API

### Optimización

- ✅ Lazy load de rutas con `() => import()`
- ✅ Memoización con `computed()` para valores derivados
- ✅ `v-once` para contenido estático
- ✅ `v-memo` para listas grandes
- ✅ Debounce en inputs de búsqueda

### Accesibilidad

- ✅ Usar etiquetas semánticas HTML5
- ✅ Atributos `aria-*` en componentes interactivos
- ✅ Contraste de colores adecuado (WCAG AA)
- ✅ Navegación por teclado funcional

---

## Configuración IDE Recomendada

### VS Code

**Extensiones recomendadas:**

- [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

**Configuración en `.vscode/settings.json`:**

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "volar.takeOverMode.enabled": true
}
```

### Browser DevTools

**Chrome/Edge:**
- [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Activar Custom Object Formatter](http://bit.ly/object-formatters)

**Firefox:**
- [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- [Activar Custom Object Formatter](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

---

## Contribución

### Cómo Contribuir

1. **Fork el repositorio**

```bash
git clone https://github.com/tu-usuario/Voyager-cloudDB-Front.git
cd Voyager-cloudDB-Front
```

2. **Crear una rama para tu feature**

```bash
git checkout -b feature/nueva-funcionalidad
```

3. **Hacer tus cambios y commit**

```bash
git add .
git commit -m "feat: agregar nueva funcionalidad"
```

4. **Push a tu fork**

```bash
git push origin feature/nueva-funcionalidad
```

5. **Crear un Pull Request**

### Convenciones de Commits

Seguir [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Formato, sin cambios de código
- `refactor:` Refactorización de código
- `test:` Agregar o modificar tests
- `chore:` Tareas de mantenimiento

---

## Equipo

Este proyecto fue desarrollado por el equipo **Voyager** en RIWI:

### Desarrollador Frontend

- **Denis Sanchez** - Frontend Lead Developer
  - Desarrollo de la interfaz de usuario en Vue.js
  - Integración con backend API
  - Diseño UX/UI y experiencia de usuario
  - Implementación de componentes reutilizables

---

## Contacto

- **Frontend:** https://voyager.andrescortes.dev
- **Backend API:** https://service.voyager.andrescortes.dev
- **Documentación API:** https://service.voyager.andrescortes.dev/swagger
- **GitHub Frontend:** https://github.com/voyager-riwi/Voyager-cloudDB-Front
- **GitHub Backend:** https://github.com/voyager-riwi/Voyager-cloudDB-Back

---

## Licencia

MIT License - Copyright (c) 2025 Voyager Team - RIWI

---

## Recursos Adicionales

### Documentación Oficial

- [Vue.js 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

### Tutoriales Recomendados

- [Vue Mastery](https://www.vuemastery.com/)
- [Vue School](https://vueschool.io/)
- [Tailwind CSS Tutorial](https://www.youtube.com/watch?v=pfaSUYaSgRo)

---

<div align="center">

**Hecho con ❤️ y ☕ por el equipo Voyager**

✨ *"La magia está en los detalles"* ✨

![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)

</div>
