<template>
  <NuxtLayout name="full-screen-section" :title="$t('About me')">
    <div class="grid grid-cols-12">
      <div class="col-span-12 md:col-span-4 max-md:flex justify-center mb-10">
        <div class="w-36 md:w-80 max-w-fit rounded-2xl overflow-hidden shadow-md shadow-indigo-400">
          <img loading="lazy" src="~/assets/images/profile.jpeg" alt="">
        </div>
      </div>
      <div class="col-span-12 md:col-span-7 md:col-start-6">
        <p
          class="section-pharagraph"
          v-html="replaceTextBetweenEscapeCharacters(
            $t('AboutMe.section1'), 'span', 'gradient-text'
          )"
        ></p>
        <hr class="mt-3">
        <p
          class="section-pharagraph mt-3"
          v-html="replaceTextBetweenEscapeCharacters(
            $t('AboutMe.section2'), 'span', 'gradient-text'
          )"
        ></p>
        <hr class="mt-3">
        <p
          class="section-pharagraph mt-3"
          v-html="replaceTextBetweenEscapeCharacters(
            $t('AboutMe.section3'), 'span', 'gradient-text'
          )"
        ></p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script>
import { utilsMixin } from '@/utils/mixins/utilsMixin.js';

export default {
  mixins: [ utilsMixin ],
};
</script>
