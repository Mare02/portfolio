<template>
  <div
    class="sidebar-wrapper"
    :class="`${show ? 'visible' : 'invisible'}`"
  >
    <div
      ref="clickOutsideTarget"
      class="sidebar"
    >
      <div class="sidebar-header">
        <slot name="sidebar-header"></slot>
      </div>
      <div class="sidebar-content">
        <slot name="sidebar-content"></slot>
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

const clickOutsideTarget = ref(null);
onClickOutside(clickOutsideTarget, () => emit('clickOutside'));
</script>
