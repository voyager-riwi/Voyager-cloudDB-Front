<template>
  <div
    class="flex flex-1 flex-col gap-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-4 hover:shadow-md transition-shadow"
  >
    <div class="text-primary">
      <span class="material-symbols-outlined">{{ icon }}</span>
    </div>
    <div class="flex flex-col gap-1">
      <h4 class="text-base font-bold leading-tight text-gray-900 dark:text-white">
        {{ title }}
      </h4>
      <p class="text-sm font-normal leading-normal text-gray-600 dark:text-gray-400">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutFeatureCard',
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
