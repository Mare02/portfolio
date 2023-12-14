<template>
  <div
    v-show="show"
    class="fixed inset-0 bg-black bg-opacity-20 z-50 flex justify-start md:hidden"
  >
    <div
      ref="target"
      class="h-full bg-white shadow-lg shadow-gray-500 overflow-y-auto transition-all sidebar"
      :class="`${show ? 'w-2/3 active' : 'w-0'}`"
    >
      <div class="h-32 bg-gray-200 grid content-center p-4">
        <slot name="sidebar-header"></slot>
      </div>
      <div class="flex flex-col items-start gap-2 px-4 py-2">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['clickOutside']);

const target = ref(null);
onClickOutside(target, () => emit('clickOutside'));
</script>
