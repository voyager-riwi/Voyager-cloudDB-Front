<template>
  <header
    class="sticky top-0 z-50 flex items-center justify-between bg-background-light/80 p-4 pb-2 backdrop-blur-sm dark:bg-background-dark/80"
  >
    <div class="flex size-12 shrink-0 items-center text-primary dark:text-primary">
      <span class="material-symbols-outlined text-4xl">database</span>
    </div>
    <div class="flex items-center justify-end gap-4">
      <router-link
        to="/login"
        class="text-sm font-bold leading-normal tracking-[0.015em] text-zinc-600 dark:text-zinc-300 hover:text-primary transition-colors"
      >
        Login
      </router-link>
      <router-link
        to="/register"
        class="flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white hover:bg-blue-600 transition-colors"
      >
        <span class="truncate">Register</span>
      </router-link>
    </div>
  </header>
</template>
