<template>
  <a
    :aria-label="ariaLabel"
    :href="href"
    class=" hover:text-primary  hover:text-primary transition-colors"
  >
    <span v-if="type === 'icon'" class="material-symbols-outlined">{{ icon }}</span>
    <TwitterIcon v-else-if="type === 'svg' && icon === 'twitter'" />
  </a>
</template>

<script>
import TwitterIcon from '../icons/TwitterIcon.vue'

export default {
  name: 'SocialLink',
  components: {
    TwitterIcon,
  },
  props: {
    ariaLabel: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      validator: (value) => ['icon', 'svg'].includes(value),
    },
  },
}
</script>
