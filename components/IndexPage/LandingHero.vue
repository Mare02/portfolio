<template>
  <div class="hero-background min-h-screen overflow-hidden grid content-center">
    <div class="container px-4 md:px-10 mx-auto">
      <div class="h-fit max-w-4xl font-semibold">
        <span class="text-3xl 2xl:text-4xl">Hello,</span>
        <h1 class="text-6xl sm:text-7xl 2xl:text-8xl break-words max-w-fit">I am a <br> Web Developer</h1>
        <p class="text-2xl 2xl:text-3xl pt-5 text-gray-800">
          I am Marko Obradović, a Web Developer. My passion lies in the art of crafting modern digital experiences that harmonize both form and function.
        </p>
        <div class="flex gap-4 mt-10">
          <a href="https://github.com/Mare02" target="_blank" class="w-8">
            <img src="~/assets/images/socials/github-mark.png" alt="">
          </a>
          <a href="https://www.linkedin.com/in/marko-obradovi%C4%87-18b252257/" target="_blank" class="w-8">
            <img src="~/assets/images/socials/In-Blue-48.png" alt="">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.hero-background {
  background-image: url(~/assets/images/hero-background.jpg);
  background-position: top;
  background-size: cover;
}
</style>