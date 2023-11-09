<template>
  <div v-if="title" class="w-full flex items-center gap-10 md:gap-20">
    <h2 class="section-title">{{ title }}</h2>
    <div class="w-full h-1 bg-gray-200"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>