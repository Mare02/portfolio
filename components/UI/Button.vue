<template>
  <button
    class="cursor-pointer select-none transition-all font-semibold hover:bg-gray-200"
    :class="
      (icon ? 'px-1 py-1 rounded-full' : 'px-4 py-2 rounded-xl')
    "
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
  label: {
    type: String,
    default: 'Button'
  },
  icon: {
    type: Boolean,
    default: false,
  },
});
</script>