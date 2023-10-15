<template>
  <div class="hero-background min-h-screen overflow-hidden grid content-center">
    <div class="container px-4 md:px-10 mx-auto">
      <div class="h-fit max-w-4xl font-semibold">
        <span class="text-3xl 2xl:text-4xl">{{$t('Hello')}},</span>
        <h1
          class="text-6xl sm:text-7xl 2xl:text-8xl break-words max-w-fit"
          v-html="addLineBreaks($t('LandingHero.title'))"
        ></h1>
        <!-- <p class="text-2xl 2xl:text-3xl pt-5 text-gray-800 mb-10">
          {{$t('LandingHero.description')}}
        </p> -->
        <p
          class="text-2xl 2xl:text-3xl pt-5 text-gray-800 mb-10"
          v-html="replaceTextBetweenEscapeCharacters($t('LandingHero.description'), 'span', 'gradient-text')"
        ></p>
        <Socials />
      </div>
    </div>
  </div>
</template>

<script>
import { utilsMixin } from '@/mixins/utilsMixin.js';
import Socials from '../MainElements/Socials.vue';

export default {
  mixins: [utilsMixin],
  components: { Socials },
};
</script>
