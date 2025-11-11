/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // ⭐ Habilitar dark mode con clase
  theme: {
    extend: {
      colors: {
        // Colores de fondo para light/dark mode
        'background-light': '#F4F7FA',
        'background-dark': '#0a1116',
        // Colores primarios del tema
        primary: '#1193d4',
      },
    },
  },
}
