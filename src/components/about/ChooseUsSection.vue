<template>
  <div>
    <h3
      class="text-gray-900 text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5"
    >
      Why Choose Us?
    </h3>
    <div class="flex flex-col gap-4 px-4">
      <ValuePropositionCard
        v-for="proposition in valuePropositions"
        :key="proposition.id"
        :icon="proposition.icon"
        :title="proposition.title"
        :description="proposition.description"
      />
    </div>
  </div>
</template>

<script>
import ValuePropositionCard from './ValuePropositionCard.vue'

export default {
  name: 'WhyChooseUsSection',
  components: {
    ValuePropositionCard,
  },
  data() {
    return {
      valuePropositions: [
        {
          id: 1,
          icon: 'savings',
          title: 'Cost-Efficiency',
          description:
            'Reduce operational overhead with automated management and pay-as-you-go scaling.',
        },
        {
          id: 2,
          icon: 'speed',
          title: 'Developer Productivity',
          description:
            'Empower your developers to focus on building features, not managing infrastructure.',
        },
        {
          id: 3,
          icon: 'cloud_sync',
          title: 'Multi-Cloud Support',
          description: 'Avoid vendor lock-in with seamless support for major cloud providers.',
        },
      ],
    }
  },
}
</script>
