<template>
  <div class="@container px-4 py-8">
    <div class="flex flex-col gap-8">
      <div class="w-full rounded-xl overflow-hidden">
        <img
          :src="heroImageUrl"
          alt="Abstract gradient representing cloud technology and data flow"
          class="w-full h-64 object-cover"
        />
      </div>

      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2 text-left">
          <h2
            class="text-4xl font-black leading-tight tracking-[-0.033em] text-gray-900 dark:text-white @[480px]:text-5xl"
          >
            Simplifying cloud database management for developers everywhere.
          </h2>
          <p
            class="text-base font-normal leading-normal text-gray-600 dark:text-gray-400 @[480px]:text-lg"
          >
            Automated, secure, and intuitive cloud database management across multiple engines.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutHeroSection',
  data() {
    return {
      heroImageUrl: new URL('../../assets/images/cloud.png', import.meta.url).href,
    }
  },
}
</script>
