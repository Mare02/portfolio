<template>
  <button
    class="cursor-pointer select-none transition-all flex items-center"
    :class="
      (icon ? 'px-1.5 py-1.5 rounded-full' : 'rounded-lg px-3 py-2 '),
      (link ? 'hover:bg-gray-100 dark:hover:bg-slate-700 justify-start' : `${primary ? 'hover:bg-blue-600 dark:hover:bg-gray-200' : 'hover:bg-gray-200 dark:hover:bg-slate-700'} justify-center`),
      (primary ? 'bg-blue-500 dark:bg-white section-pharagraph-inverted' : 'section-pharagraph-small'),
      (block ? 'w-full' : 'w-max-content'),
      (large && !icon ? 'px-4 py-3' : ''),
      (disabled ? 'pointer-events-none opacity-75' : ''),
      (active ? 'bg-gray-200 dark:bg-slate-600' : '')
    "
  >
    <loading-spinner v-if="loading" white></loading-spinner>
    <template v-else>
      <slot>{{ label }}</slot>
    </template>
  </button>
</template>

<script setup>
  import LoadingSpinner from '@/components/UI/LoadingSpinner.vue';

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
    loading: {
      type: Boolean,
      default: false,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  });
</script>