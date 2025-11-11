<template>
  <div
    class="min-h-screen bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200"
  >
    <div
      class="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden"
    >
      <AppBar />

      <AboutHeroSection />
      <!--
            <OfferSection />
      <ChooseUsSection />
      <PhilosophySection />
      <TeamSection />

      <AboutFooter />
      <FloatingCTA />
      -->
    </div>
  </div>
</template>

<script>
import AppBar from '../components/common/AppBar.vue'
import AboutHeroSection from '../components/about/AboutHeroSection.vue'
import OfferSection from '../components/about/OfferSection.vue'
import ChooseUsSection from '../components/about/ChooseUsSection.vue'
import PhilosophySection from '../components/about/PhilosophySection.vue'
import TeamSection from '../components/about/TeamSection.vue'
import AboutFooter from '../components/common/AppTer.vue'
import FloatingCTA from '../components/about/FloatingCTA.vue'
export default {
  name: 'AboutPage',
  components: {
    AppBar,
    AboutHeroSection,
    OfferSection,
    ChooseUsSection,
    PhilosophySection,
    TeamSection,
    AboutFooter,
    FloatingCTA,
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
