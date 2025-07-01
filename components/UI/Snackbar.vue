<template>
  <div
    class="w-full pointer-events-none z-50"
  >
    <div
      class="bg-white dark:bg-slate-800 section-pharagraph-small mx-auto w-fit rounded-b-xl border-2 text-lg font-semibold px-6 py-4 pointer-events-auto"
      :style="`border-color: ${currentSnackbarColor}`"
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

const snackbarTypeColors = {
  info: 'rgb(59 130 246)',
  alert: 'rgb(253 186 116)',
  warning: 'rgb(239 68 68)',
  success: 'rgb(34 197 94)',
};

const snackbarTypeIcons = {
  info: 'mdiInformation',
  alert: 'mdiAlertCircle',
  warning: 'mdiAlertCircle',
  success: 'mdiCheckCircle',
};

const message = computed(() => {
  return snackbarStore.state.snackbarMessage;
});

const currentSnackbarColor = computed(() => {
  return snackbarTypeColors[snackbarStore.state.snackbarType] || currentSnackbarColor[0];
});

const currentSnackbarIcon = computed(() => {
  return snackbarTypeIcons[snackbarStore.state.snackbarType] || snackbarTypeIcons[0];
});
</script>