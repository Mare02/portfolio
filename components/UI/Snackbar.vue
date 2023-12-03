<template>
  <div
    v-if="showSnackbar"
    class="w-full pointer-events-none z-50"
  >
    <div
      class="bg-white mx-auto w-fit rounded-b-xl border-2 text-lg font-semibold px-6 py-4 pointer-events-auto"
      :class="`border-${currentSnackbarColor}-300`"
    >
      <div class="flex items-center gap-4">
      <div class="h-6 w-6">
        <MdiIcon :icon="currentSnackbarIcon" :color="currentSnackbarColor"/>
      </div>
        <p>
          {{ message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { snackbarStore } from '~/store/snackbarStore.js';
import { computed } from 'vue';

const snackbarTypeColors = {
  info: 'blue',
  alert: 'orange',
  warning: 'red',
  success: 'green',
};

const snackbarTypeIcons = {
  info: 'mdiInformation',
  alert: 'mdiAlertCircle',
  warning: 'mdiAlertCircle',
  success: 'mdiCheckCircle',
};

const showSnackbar = computed(() => {
  return snackbarStore.state.showSnackbar;
});
const message = computed(() => {
  return snackbarStore.state.snackbarMessage;
});

const currentSnackbarColor = computed(() => {
  return snackbarTypeColors[snackbarStore.state.snackbarType || 'info'];
});

const currentSnackbarIcon = computed(() => {
  return snackbarTypeIcons[snackbarStore.state.snackbarType || 'info'];
});
</script>