<template>
  <footer
    class="bg-background-light dark:bg-background-dark border-t border-zinc-200 dark:border-zinc-800"
  >
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-2xl">database</span>
          <span class="text-base font-bold text-zinc-900 dark:text-white">CCD</span>
        </div>
        <div class="flex flex-wrap justify-center gap-4 text-sm text-zinc-600 dark:text-zinc-300">
          <a class="hover:text-primary transition-colors" href="#">About Us</a>
          <a class="hover:text-primary transition-colors" href="#">Pricing</a>
          <a class="hover:text-primary transition-colors" href="#">Contact</a>
        </div>
        <div class="flex justify-center gap-4 text-zinc-600 dark:text-zinc-300">
          <a class="hover:text-primary transition-colors" href="#">
            <TwitterIcon />
          </a>
          <a class="hover:text-primary transition-colors" href="#">
            <LinkedInIcon />
          </a>
        </div>
      </div>
      <div
        class="mt-8 border-t border-zinc-200 pt-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400"
      >
        <p>© 2024 CrudCloudDb. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
import TwitterIcon from '../icons/TwitterIcon.vue'
import LinkedInIcon from '../icons/LinkedInIcon.vue'

export default {
  name: 'AppFooter',
  components: {
    TwitterIcon,
    LinkedInIcon,
  },
}
</script>
