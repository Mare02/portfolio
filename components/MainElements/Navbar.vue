<template>
  <div
    class="fixed z-10 top-0 w-full py-4 shadow transition-all duration-200"
    :class="{'shadow-md bg-white/50 backdrop-blur-md': isScrolled}"
  >
    <div class="container px-4 md:px-10 mx-auto flex justify-between">
      <div class="text-2xl font-semibold">
        &#60;Marko Obradović /&#62;
      </div>
      <div class="flex gap-6">
        <a href="https://github.com/Mare02" target="_blank" class="w-8">
          <img src="~/assets/images/socials/github-mark.png" alt="">
        </a>
        <a href="https://www.linkedin.com/in/marko-obradovi%C4%87-18b252257/" target="_blank" class="w-8">
          <img src="~/assets/images/socials/In-Blue-48.png" alt="">
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    mounted() {
      // add different style to navbar when scrolled
      window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll() {
        this.isScrolled = window.scrollY > 50;
      }
    },
    data() {
      return {
        isScrolled: false,
      }
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll);
    },
  }
</script>