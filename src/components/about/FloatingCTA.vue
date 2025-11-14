<template>
  <div
    class="sticky bottom-0 w-full p-4 bg-gradient-to-t from-background-light from-background-dark to-transparent"
  >
    <button
      class="w-full flex min-w-[84px] max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/30 hover:bg-blue-600 transition-colors"
      @click="exploreFeatures"
    >
      <span class="truncate">Explore Features</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'FloatingCTA',
}
</script>
