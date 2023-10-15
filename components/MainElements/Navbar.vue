<template>
  <div
    class="fixed z-10 top-0 w-full py-4 shadow transition-all duration-200"
    :class="{'shadow-md bg-white': isScrolled}"
  >
    <div class="container px-4 md:px-10 mx-auto flex justify-between">
      <div class="text-2xl font-semibold">
        &#60;Marko Obradović /&#62;
      </div>
      <Socials />
    </div>
  </div>
</template>
<script>
import Socials from './Socials.vue';

export default {
  mounted() {
  this.handleScroll();
  window.addEventListener("scroll", this.requestedScroll);
},

methods: {
  handleScroll() {
    this.isScrolled = window.scrollY > 50;
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
  components: { Socials },
}
</script>