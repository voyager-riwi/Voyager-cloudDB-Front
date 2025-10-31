<template>
  <div class="@container">
    <div class="@[480px]:p-4">
      <div
        class="flex min-h-[480px] flex-col items-start justify-end gap-6 bg-blueviolet-500 rounded-md m-[2rem] px-4 pb-10 @[480px]:gap-8 @[480px]:rounded-xl @[480px]:px-10"
        :style="heroStyle"
      >
        <div class="flex flex-col gap-2 text-left">
          <h1
            class="text-4xl font-black leading-tight tracking-[-0.033em] text-white @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]"
          >
            Automated Cloud Database Management, Simplified.
          </h1>
          <h2
            class="text-sm font-normal leading-normal text-white @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal"
          >
            Create, scale, and manage all your databases from one secure platform.
          </h2>
        </div>
        <button
          class="flex h-10 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white hover:bg-blue-600 transition-colors @[480px]:h-12 @[480px]:px-5 @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
        >
          <span class="truncate">Get Started for Free</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroSection',
  computed: {
    heroStyle() {
      return {
        backgroundImage: `linear-gradient(rgba(16, 28, 34, 0.1) 0%, rgba(16, 28, 34, 0.6) 100%), url("${this.backgroundImage}")`,
      }
    },
  },
  data() {
    return {
      backgroundImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDawGFmSzbQaGSABw9_OZ5YztQ5Z_3bu_iogwqMU0jwNyY53jXrt_5-6LegUndPcflGJZjCb6CuxlC_xbP5MmRIkrIVWFO-gOk1pNnjUObCp9ikSn0LFxPW0Bb_htVvcOtNNzk7g-xyqmEAUrnc5dE0qLYskgolK-H4gIR3NK5jxfhv1O_CnhKDr1Fkeb4xkYVHxFp09nPAkbHAaAQyqicf1K1aQx_pxARAsZvqXAEJ9cLZs1AL4kQ2uMCCj9FpyY4QzgyWS4vh6T4")',
    }
  },
}
</script>
