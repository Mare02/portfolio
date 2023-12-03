<template>
  <span
    class="loading-spinner"
    :class="
      (small ? 'w-5 h-5' : 'w-7 h-7'),
      (white ? 'white' : 'black')
    "
  ></span>
</template>

<script setup>
const props = defineProps({
  small: {
    type: Boolean,
    default: false,
  },
  white: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.loading-spinner {
  border-bottom-color: transparent !important;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.loading-spinner.black {
  border: 3px solid black;
}
.loading-spinner.white {
  border: 3px solid white;
}
@keyframes rotation {
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
}
</style>