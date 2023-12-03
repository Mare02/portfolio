<template>
  <div
    class="fixed w-full top z-50 transition-all duration-300 "
    :class="
        isScrolled
          ? 'top-0'
          : 'top-0 sm:top-6'
      "
  >
    <div
      class="w-full py-3 shadow-md bg-white"
      :class="{'2xl:top-10 sm:rounded-full sm:container sm:mx-auto sm:inset-x-0 md:shadow-xl md:shadow-blue-200': !isScrolled}"
    >
      <div class="container px-4 md:px-10 mx-auto flex items-center justify-between">
        <div class="flex items-center gap-2">
          <nuxt-link
            class="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 flex"
            :to="localePath('/')"
          >
            <img
              class="h-full object-fill"
              src="@/assets/images/profile.jpeg"
              alt="profile"
              loading="lazy"
            >
          </nuxt-link>
          <nuxt-link :to="localePath('/')" class="leading-5 font-semibold section-pharagraph-small">
            Marko Obradović
          </nuxt-link>
        </div>
        <div class="flex items-center">
          <nuxt-link
            class="font-semibold mr-2"
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

    <Snackbar />
  </div>
</template>

<script setup>
import Snackbar from '@/components/UI/Snackbar.vue';
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

