import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index.js'

// Forzar tema oscuro globalmente
if (typeof document !== 'undefined') {
  document.documentElement.classList.add('dark')
  console.log('🌙 Dark mode forzado en el documento')
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
