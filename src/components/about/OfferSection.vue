<template>
  <div>
    <!-- Section Header: What We Offer -->
    <h3
      class="text-gray-900 text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5"
    >
      What We Offer
    </h3>

    <!-- Text Grid: Features -->
    <div class="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4 pt-0">
      <AboutFeatureCard
        v-for="feature in features"
        :key="feature.id"
        :icon="feature.icon"
        :title="feature.title"
        :description="feature.description"
      />
    </div>
  </div>
</template>

<script>
import AboutFeatureCard from './AboutFeatureCard.vue'

export default {
  name: 'OfferSection',
  components: {
    AboutFeatureCard,
  },
  data() {
    return {
      features: [
        {
          id: 1,
          icon: 'trending_up',
          title: 'Automated Scaling',
          description: 'Effortlessly scale your instances up or down based on demand.',
        },
        {
          id: 2,
          icon: 'shield',
          title: 'Ironclad Security',
          description: 'Rely on our robust, built-in security protocols to protect your data.',
        },
        {
          id: 3,
          icon: 'dashboard',
          title: 'Intuitive Dashboard',
          description: 'Manage all your databases from a single, easy-to-use interface.',
        },
        {
          id: 4,
          icon: 'database',
          title: 'Multi-Engine Support',
          description: 'Support for your favorite database engines, all in one place.',
        },
      ],
    }
  },
}
</script>
