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
      <div class="text-xl 2xl:text-2xl font-semibold">
        &#60;Marko Obradović /&#62;
      </div>
      <LocaleSwitcher />
    </div>
  </div>
</template>

<script>
import Socials from '@/components/MainElements/Socials.vue';
import LocaleSwitcher from '~/components/UI/LocaleSwitcher.vue';

export default {
  mounted() {
    this.handleScroll();
    window.addEventListener("scroll", this.requestedScroll);
  },

  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 80;
    },
    requestedScroll() {
      window.requestAnimationFrame(this.handleScroll);
    },
  },

  data() {
    return {
      isScrolled: false,
    };
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.requestedScroll);
  },
  components: { Socials, LocaleSwitcher },
}
</script>
