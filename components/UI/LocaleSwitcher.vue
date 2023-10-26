<template>
  <div
    @click="toggleDropdown"
    class="relative hover:bg-gray-200 rounded-full"
    :class="{'bg-gray-200': isOpen}"
    ref="target"
  >
    <div class="cursor-pointer p-1">
      <MdiIcon icon="mdiWeb" size="2.2em" />
    </div>
    <div
      v-if="isOpen"
      class="transition-all absolute right-0 w-max py-2 bg-white border border-gray-300 rounded shadow-lg"
    >
      <NuxtLink
        v-for="option in locales"
        :key="option.code"
        :to="switchLocalePath(option.code)"
        class="block px-4 py-2 text-gray-800 cursor-pointer font-semibold text-lg 2xl:text-xl"
        :class="option.code === locale ? 'bg-indigo-100' : 'hover:bg-indigo-50'"
      >
        {{ option.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';

const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

let isOpen = ref(false);

const target = ref(null);
onClickOutside(target, () => isOpen.value = false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
</script>
