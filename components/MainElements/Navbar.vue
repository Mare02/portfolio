<template>
  <div
    class="fixed z-50 w-full py-3 2xl:py-4 shadow-md transition-all duration-300 bg-white"
    :class="
      isScrolled
        ? 'top-0'
        : 'top-0 sm:top-6 2xl:top-10 sm:rounded-full sm:container sm:mx-auto sm:inset-x-0'
    "
  >
    <div class="container px-4 md:px-10 mx-auto flex items-center justify-between">
      <nuxt-link class="section-pharagraph-small font-semibold" :to="localePath('/')">
        &#60;Marko Obradović /&#62;
      </nuxt-link>
      <div class="flex items-center gap-4 md:gap-6">
        <nuxt-link
          class="section-pharagraph-small font-semibold"
          :to="localePath('/contact')"
        >
          Contact
        </nuxt-link>
        <LocaleSwitcher />
      </div>
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath();
import { ref, onMounted, onBeforeUnmount } from 'vue';
const localePath = useLocalePath();
import LocaleSwitcher from '@/components/UI/LocaleSwitcher.vue';
import Button from '@/components/UI/Button.vue';

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 80;
};

const requestedScroll = () => {
  window.requestAnimationFrame(handleScroll);
};

onMounted(() => {
  handleScroll();
  window.addEventListener('scroll', requestedScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', requestedScroll);
});
</script>

