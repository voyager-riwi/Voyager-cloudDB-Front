<template>
  <section class="relative min-h-[80vh] overflow-hidden">
    <!-- Imagen de fondo -->
    <div class="absolute inset-0 -z-10">
      <img
        :src="backgroundImageUrl"
        alt="Database management background"
        class="w-full h-full object-cover"
        loading="eager"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20"></div>
    </div>

    <!-- Contenido -->
    <div class="relative z-10 h-full">
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[80vh] container px-4 py-12"
      >
        <!-- Columna de texto -->
        <div class="flex flex-col justify-center space-y-6 lg:space-y-8">
          <div class="space-y-4">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              Simplifying cloud database management
            </h1>
            <p class="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Automated, secure, and intuitive cloud database management across multiple engines.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              class="bg-primary hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Get Started for Free
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutHeroSection',
  data() {
    return {
      heroImageUrl: new URL('../../assets/images/cloud.png', import.meta.url).href,
      backgroundImageUrl: new URL('../../assets/images/home/home_bg_image.png', import.meta.url)
        .href,
    }
  },
}
</script>
