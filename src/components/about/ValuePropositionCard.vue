<template>
  <div
    class="flex items-start gap-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a2732] p-4 hover:shadow-md transition-shadow"
  >
    <span class="material-symbols-outlined text-primary mt-1">{{ icon }}</span>
    <div class="flex flex-col">
      <h4 class="font-bold text-gray-900 dark:text-white">{{ title }}</h4>
      <p class="text-sm text-gray-600 dark:text-gray-400">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ValuePropositionCard',
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
}
</script>
