<template>
  <div
    class="relative h-fit"
  >
    <Button
      @click="toggleDropdown"
      :class="{'bg-gray-200 dark:bg-slate-700': isOpen, 'px-3': showName}"
      ref="target"
      icon
    >
      <MdiIcon icon="mdiWeb"/>
      <span class="mx-2 font-medium" v-if="showName">{{ localeProperties.name }}</span>
    </Button>
    <div
      v-if="isOpen"
      :class="`${isOpen ? 'slide-down' : 'slide-up'} ${dropdownAlign === 'left' ? '' : 'right-0'}`"
      class="transition-all absolute py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded shadow-lg z-10"
    >
      <NuxtLink
        v-for="option in locales"
        :key="option.code"
        :to="switchLocalePath(option.code)"
        class="flex items-center gap-2 px-4 py-2 text-gray-800 dark:text-gray-200 cursor-pointer"
        :class="option.code === locale ? 'bg-indigo-100 dark:bg-cyan-800' : 'hover:bg-indigo-50 dark:hover:bg-cyan-900'"
      >
        <div class="w-max">
          <img class="w-6 h-auto" :src="`/svg-icons/${option.code}.svg`" alt="">
        </div>
        <span>
          {{ option.name }}
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
const { locale, locales, localeProperties } = useI18n();
const switchLocalePath = useSwitchLocalePath();
import Button from '@/components/UI/Button.vue';

const props = defineProps({
  dropdownAlign: {
    type: String,
    default: 'right',
  },
  showName: {
    type: Boolean,
    default: false,
  },
});

let isOpen = ref(false);

const target = ref(null);
onClickOutside(target, () => isOpen.value = false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style>
.slide-down {
  animation: slidedown .2s;
}
.slide-up {
  animation: slideup .2s;
}
@keyframes slidedown {
  from {
    transform: translateY(-20%);
  }

  to {
    transform: translateY(0%);
  }
}
@keyframes slideup {
  from {
    transform: translateY(0%);
  }

  to {
    transform: translateY(-20%);
  }
}
</style>
