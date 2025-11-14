<template>
  <div class="min-h-screen bg-background-light bg-background-dark font-display">
    <DinamycNavbar />
    <div
      class="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden"
    >
      <AboutHeroSection />
    </div>
  </div>
</template>

<script>
import DinamycNavbar from '@/components/common/DinamycNavbar.vue';
import AboutHeroSection from '../components/about/AboutHeroSection.vue'
export default {
  name: 'AboutPage',
  components: {
    DinamycNavbar,
    AboutHeroSection,
  },
  methods: {
    exploreFeatures() {
      // Lógica para explorar características
      console.log('Exploring features...')
      // this.$router.push('/features')
    },
  },
}
</script>

<style scoped>
@import 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap';
@import 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined';

.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}
</style>
