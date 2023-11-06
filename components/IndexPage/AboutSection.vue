<template>
  <NuxtLayout name="full-screen-section" :title="$t('About me')">
    <div class="flex flex-col md:flex-row gap-10 lg:gap-20 justify-between">
      <div class="h-fit w-fit shrink-0 max-md:mx-auto rounded-2xl overflow-hidden border-2 border-x-teal-600 border-y-blue-500">
        <img class="w-40 md:w-60 lg:w-80" loading="lazy" src="~/assets/images/profile.jpeg" alt="my profile image">
      </div>
      <div class="max-w-4xl">
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
