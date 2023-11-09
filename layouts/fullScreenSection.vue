<template>
  <div class="py-16 lg:py-32 flex flex-col justify-center">
    <section-title :title="title" class="mb-10 md:mb-20"></section-title>
    <slot />
  </div>
</template>

<script setup>
import SectionTitle from '~/components/MainElements/SectionTitle.vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

