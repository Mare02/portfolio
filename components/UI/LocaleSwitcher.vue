<template>
  <div
    class="relative h-fit"
  >
    <Button
      @click="toggleDropdown"
      :class="{'bg-gray-200': isOpen}"
      ref="target"
      icon
    >
      <MdiIcon icon="mdiWeb" size="1.8rem" />
    </Button>
    <div
      v-if="isOpen"
      :class="isOpen ? 'slide-down' : 'slide-up'"
      class="transition-all absolute right-0 py-2 bg-white border border-gray-300 rounded shadow-lg"
    >
      <NuxtLink
        v-for="option in locales"
        :key="option.code"
        :to="switchLocalePath(option.code)"
        class="flex items-center gap-2 px-4 py-2 text-gray-800 cursor-pointer"
        :class="option.code === locale ? 'bg-indigo-100' : 'hover:bg-indigo-50'"
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
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
import Button from '@/components/UI/Button.vue';

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
    opacity: 0;
    transform: translateY(-20%);
  }

  to {
    opacity: 100;
    transform: translateY(0%);
  }
}
@keyframes slideup {
  from {
    opacity: 100;
    transform: translateY(0%);
  }

  to {
    opacity: 0;
    transform: translateY(-20%);
  }
}
</style>
