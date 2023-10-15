<template>
  <div class="min-h-screen flex flex-col justify-center">
    <div class="flex items-center gap-10 md:gap-20 mb-10 md:mb-36">
      <h2 class="text-3xl md:text-5xl font-semibold min-w-max text-gray-900">{{$t('About me')}}</h2>
      <div class="w-full h-1 bg-gray-200"></div>
    </div>
    <div class="grid grid-cols-12">
      <div class="col-span-12 md:col-span-4 max-md:flex justify-center mb-10">
        <div class="w-36 md:w-80 max-w-fit rounded-2xl overflow-hidden shadow-md shadow-indigo-400">
          <img loading="lazy" src="~/assets/images/profile.jpeg" alt="">
        </div>
      </div>
      <div class="col-span-12 md:col-span-7 md:col-start-6">
        <p
          class="text-xl lg:text-2xl 2xl:text-3xl font-semibold text-gray-800 lg:leading-7"
          v-html="replaceTextBetweenEscapeCharacters($t('AboutMe.section1'), 'span', 'gradient-text')"
        ></p>
        <hr class="mt-3">
        <p
          class="text-xl lg:text-2xl 2xl:text-3xl font-semibold text-gray-800 mt-3 lg:leading-7"
          v-html="replaceTextBetweenEscapeCharacters($t('AboutMe.section2'), 'span', 'gradient-text')"
        ></p>
        <hr class="mt-3">
        <p
          class="text-xl lg:text-2xl 2xl:text-3xl font-semibold text-gray-800 mt-3 lg:leading-7"
          v-html="replaceTextBetweenEscapeCharacters($t('AboutMe.section3'), 'span', 'gradient-text')"
        ></p>
      </div>
    </div>
  </div>
</template>

<script>
import { utilsMixin } from '@/mixins/utilsMixin.js';

export default {
  mixins: [ utilsMixin ],
};
</script>
