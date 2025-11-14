<template>
  <div class="flex flex-col gap-3">
    <div
      class="aspect-square w-full rounded-xl bg-cover bg-center bg-no-repeat p-4 "
      :style="{
        backgroundImage: `url('${image}')`,
        backgroundSize: '70%',
        backgroundPosition: 'center',
      }"
      :data-alt="alt"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'DatabaseLogo',
  props: {
    image: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },
}
</script>
