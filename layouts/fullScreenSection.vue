<template>
  <div class="py-16 lg:py-32 flex flex-col justify-center">
    <div v-if="title" class="flex items-center gap-10 md:gap-20 mb-10 md:mb-20">
      <h2 class="section-title">{{ title }}</h2>
      <div class="w-full h-1 bg-gray-200"></div>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
    },
  },
}
</script>
