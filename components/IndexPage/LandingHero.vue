<template>
  <div class="min-h-screen md:bg-gray-100 grid content-center relative">
    <div class="container flex flex-col md:flex-row items-center lg:gap-10 px-4 md:px-10 mx-auto">
      <div class="h-fit max-w-4xl font-semibold relative z-10">
        <span class="section-pharagraph">{{$t('Hello')}},</span>
        <h1
          class="text-6xl sm:text-7xl 2xl:text-8xl break-words max-w-fit gradient-text to-black"
          v-html="addLineBreaks($t('LandingHero.title'))"
        ></h1>
        <p
          class="max-md:text-black section-pharagraph font-semibold pt-5 text-gray-800 mb-10"
          v-html="replaceTextBetweenEscapeCharacters($t('LandingHero.description'), 'span', 'gradient-text')"
        ></p>
        <Socials />
      </div>
      <div class="max-md:absolute max-md:opacity-20 max-md:inset-0 max-md:h-full max-md:w-full">
        <img class="max-md:h-full max-md:w-full max-md:object-cover" src="@/assets/images/hero-guy-coding.png" alt="">
      </div>
    </div>

    <div class="absolute bottom-20 left-0 right-0 flex justify-center">
      <scroll-indicator v-if="!isScrolled(200)"></scroll-indicator>
    </div>
  </div>
</template>

<script setup>
const { addLineBreaks, replaceTextBetweenEscapeCharacters, isScrolled } = useUtils();
import Socials from '@/components/MainElements/Socials.vue';
import ScrollIndicator from '@/components/UI/ScrollIndicator.vue';
</script>
