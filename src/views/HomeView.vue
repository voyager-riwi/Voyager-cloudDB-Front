<template>
  <div class="min-h-screen bg-[#192b33] dark:bg-background-dark font-display">
    <main>
      <HeroSection />
      <FeatureSection />
      <DatabaseGrid />
      <CTASection />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import HeroSection from '../components/HeroSection.vue'
import FeatureSection from '../components/FeatureSection.vue'
import DatabaseGrid from '../components/DatabaseGrid.vue'
import CTASection from '../components/CTASection.vue'
import AppFooter from '../components/common/AppFooter.vue'
import AppNavbar from '../components/common/AppNavbar.vue'

export default {
  name: 'App',
  components: {
    HeroSection,
    FeatureSection,
    DatabaseGrid,
    CTASection,
    AppFooter,
    AppNavbar,
  },
}
</script>
