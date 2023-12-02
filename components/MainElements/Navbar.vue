<template>
  <div
    class="fixed z-50 w-full py-3 2xl:py-4 shadow-md transition-all duration-300 bg-white"
    :class="
      isScrolled
        ? 'top-0'
        : 'top-0 sm:top-6 2xl:top-10 sm:rounded-full sm:container sm:mx-auto sm:inset-x-0 md:shadow-xl md:shadow-blue-200'
    "
  >
    <div class="container px-4 md:px-10 mx-auto flex items-center justify-between">
      <div class="flex items-center gap-2">
        <nuxt-link
          class="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 flex"
          :to="localePath('/')"
        >
          <img
            class="h-full object-fill"
            src="@/assets/images/profile.jpeg"
            alt="profile"
            loading="lazy"
          >
        </nuxt-link>
        <nuxt-link :to="localePath('/')" class="leading-5 font-semibold text-lg">
          Marko Obradović
        </nuxt-link>
      </div>
      <div class="flex items-center">
        <nuxt-link
          class="section-pharagraph-small font-semibold mr-2"
          :to="localePath('/contact')"
        >
          <Button link class="hover:underline">
            {{ $t('Contact') }}
          </Button>
        </nuxt-link>
        <LocaleSwitcher />
      </div>
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath();
const { currentRoute } = useRouter();
import { computed } from 'vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
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

