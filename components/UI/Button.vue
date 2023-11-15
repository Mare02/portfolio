<template>
  <button
    class="cursor-pointer select-none transition-all font-semibold"
    :class="
      (icon ? 'px-1.5 py-1.5 rounded-full' : 'px-4 py-2 rounded-xl'),
      (link ? 'hover:underline hover:bg-gray-100' : 'hover:bg-gray-200')
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
  link: {
    type: Boolean,
    default: false,
  },
});
</script>