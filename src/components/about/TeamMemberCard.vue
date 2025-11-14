<template>
  <div class="flex flex-col items-center gap-2 flex-shrink-0">
    <img class="w-24 h-24 rounded-full object-cover" :src="image" :alt="alt" loading="lazy" />
    <div class="text-center">
      <p class="font-bold text-sm text-gray-900 text-white">{{ name }}</p>
      <p class="text-xs text-gray-600 ">{{ position }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamMemberCard',
  props: {
    image: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
  },
}
</script>
