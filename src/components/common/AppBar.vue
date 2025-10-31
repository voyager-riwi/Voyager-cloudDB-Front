<template>
  <header
    class="sticky top-0 z-10 flex items-center bg-background-light/80 dark:bg-background-dark/80 p-4 pb-2 justify-between backdrop-blur-sm"
  >
    <div class="flex size-12 shrink-0 items-center justify-start text-gray-800 dark:text-white">
      <span class="material-symbols-outlined text-2xl cursor-pointer" @click="goBack"
        >arrow_back</span
      >
    </div>
    <h1
      class="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center text-gray-900 dark:text-white"
    >
      About CrudCloudDb
    </h1>
    <div class="size-12 shrink-0"></div>
  </header>
</template>

<script>
export default {
  name: 'AboutTopAppBar',
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>
