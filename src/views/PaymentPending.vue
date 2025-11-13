<template>
  <div
    class="relative min-h-screen w-full bg-[#F4F7FA] dashboard font-sans text-gray-800 dark:text-gray-200"
  >
    <header
      class="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200/10 bg-[#F4F7FA]/80 p-4 backdrop-blur-sm dark:bg-[#101c22]/80"
    >
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-yellow-500 text-3xl">cloud_sync</span>
        <h1 class="text-lg font-bold leading-tight tracking-tighter text-gray-900 dark:text-white">
          CloudDB
        </h1>
      </div>
    </header>
    <main class="flex flex-col items-center justify-center p-4 pb-24 sm:p-6 min-h-screen">
      <div class="mx-auto max-w-lg w-full px-4">
        <div
          class="bg-white dark:bg-[#1a2732] rounded-2xl shadow-2xl p-8 flex flex-col items-center animate-entrance"
        >
          <span class="material-symbols-outlined text-yellow-500 text-7xl mb-4">cloud_sync</span>
          <h1 class="text-3xl sm:text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-3">
            Pago pendiente
          </h1>
          <p
            class="text-base sm:text-lg text-slate-700 dark:text-slate-300 mb-6 text-center leading-relaxed max-w-prose"
          >
            Tu hechizo de pago está siendo procesado.<br />
            Te notificaremos por correo cuando se confirme tu suscripción.
          </p>
          <button
            @click="goDashboard"
            class="inline-flex items-center gap-2 bg-yellow-500 text-white font-semibold py-2 px-5 rounded-lg shadow hover:bg-yellow-600 transition-transform transform hover:-translate-y-0.5"
          >
            <span class="material-symbols-outlined">dashboard</span>
            Ir al Dashboard
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goDashboard = () => router.push('/dashboard')
</script>

<style scoped>
.dashboard {
  background-image: url('@/assets/images/dashboard_bg.png');
  background-position: center;
  background-size: cover;
}
.material-symbols-outlined {
  font-size: 48px;
}
.animate-entrance {
  animation: fadeInScale 420ms cubic-bezier(0.2, 0.9, 0.3, 1) both;
}
@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: translateY(8px) scale(0.985);
  }
  60% {
    opacity: 1;
    transform: translateY(-4px) scale(1.01);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
