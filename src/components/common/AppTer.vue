<template>
  <footer class="mt-12 px-4 py-8 bg-gray-100 dark:bg-[#0f1a21]">
    <div class="flex justify-center items-center gap-6">
      <SocialLink
        v-for="link in socialLinks"
        :key="link.id"
        :aria-label="link.ariaLabel"
        :href="link.href"
        :icon="link.icon"
        :type="link.type"
      />
    </div>
    <p class="text-center text-xs text-gray-500 dark:text-gray-500 mt-6">
      © 2024 CrudCloudDb. All rights reserved.
    </p>
  </footer>
</template>

<script>
import SocialLink from '../about/SocialLink.vue'

export default {
  name: 'AboutFooter',
  components: {
    SocialLink,
  },
  data() {
    return {
      socialLinks: [
        {
          id: 1,
          ariaLabel: 'Blog',
          href: '#',
          icon: 'rss_feed',
          type: 'icon',
        },
        {
          id: 2,
          ariaLabel: 'Careers',
          href: '#',
          icon: 'work',
          type: 'icon',
        },
        {
          id: 3,
          ariaLabel: 'Twitter',
          href: '#',
          icon: 'twitter',
          type: 'svg',
        },
      ],
    }
  },
}
</script>
