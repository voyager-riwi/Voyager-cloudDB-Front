<template>
  <div
    class="flex flex-1 flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-[#1a2732] hover:shadow-lg transition-shadow"
  >
    <div class="text-primary dark:text-primary">
      <span class="material-symbols-outlined text-3xl">{{ icon }}</span>
    </div>
    <div class="flex flex-col gap-1">
      <h2 class="text-base font-bold leading-tight text-zinc-900 dark:text-white">{{ title }}</h2>
      <p class="text-sm font-normal leading-normal text-zinc-600 dark:text-zinc-300">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeatureCard',
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
