<template>
  <div class="flex flex-col gap-10 px-4 py-10 @container">
    <div class="flex flex-col gap-4">
      <h1
        class="max-w-[720px] text-[32px] font-bold leading-tight tracking-light text-zinc-900 text-white @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]"
      >
        Why Choose CCD?
      </h1>
      <p
        class="max-w-[720px] text-base font-normal leading-normal text-zinc-600 text-zinc-300"
      >
        Everything you need to manage your cloud databases efficiently and securely.
      </p>
    </div>
    <div class="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
      <FeatureCard
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
import FeatureCard from './FeatureCard.vue'

export default {
  name: 'FeatureSection',
  components: {
    FeatureCard,
  },
  data() {
    return {
      features: [
        {
          id: 1,
          icon: 'settings',
          title: 'Automated Management',
          description: 'Focus on your applications with automated scaling, backups, and updates.',
        },
        {
          id: 2,
          icon: 'hub',
          title: 'Multi-Engine Support',
          description: 'We support a wide variety of SQL and NoSQL databases to fit your needs.',
        },
        {
          id: 3,
          icon: 'security',
          title: 'Secure Centralized Control',
          description: 'Get a single-pane-of-glass view of your entire database infrastructure.',
        },
      ],
    }
  },
}
</script>
