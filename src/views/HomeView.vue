<template>
  <div class="min-h-screen bg-[#192b33] bg-background-dark font-display">
    <DinamycNavbar />
    <main>
      <HeroSection />
    </main>
  </div>
</template>

<script>
import HeroSection from '../components/HeroSection.vue'
import DinamycNavbar from '@/components/common/DinamycNavbar.vue'

export default {
  name: 'App',
  components: {
    DinamycNavbar,
    HeroSection,
  },
}
</script>
