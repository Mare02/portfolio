<template>
  <NuxtLayout name="full-screen-section" :title="$t('My skills')">
    <div>
      <!-- <div class="flex flex-col-reverse sm:flex-row items-center gap-10 sm:gap-20">
        <p
          class="section-pharagraph"
          v-html="replaceTextBetweenEscapeCharacters(
            $t('MySkills.description'), 'span', 'gradient-text'
          )"
        ></p>
        <div class="min-w-1/5">
          <img src="@/assets/images/guy_skills.jpeg" alt="">
        </div>
      </div> -->
      <div class="flex flex-col-reverse md:grid grid-cols-12 place-items-center gap-10">
        <div class="col-span-12 md:col-span-7">
          <p
            class="section-pharagraph"
            v-html="replaceTextBetweenEscapeCharacters(
              $t('MySkills.description'), 'span', 'gradient-text'
            )"
          ></p>
        </div>
        <div class="col-span-12 md:col-span-4 max-md:flex justify-center">
          <img class="w-full md:w-60 lg:w-80 max-w-fit" loading="lazy" src="@/assets/images/guy_skills.jpeg" alt="a guy handling computers">
        </div>
      </div>
      <div class="mt-12 flex flex-wrap items-center justify-center gap-10 lg:gap-20">
        <div v-for="skill in skillsWithIcons" :key="skill.name" class="w-auto h-10 lg:h-12 2xl:h-14">
          <img
            class="h-full w-full object-cover"
            :src="`/techLogos/${skill.iconName}`"
            :alt="`${skill.name} logo`"
            loading="lazy"
          >
        </div>
      </div>
      <div class="mt-10 md:mt-20 flex flex-col sm:flex-row justify-evenly gap-5 md:gap-10 xl:gap-20 mx-auto">
        <div
          v-for="(category, categoryName) in skills"
          :key="category"
          class="flex flex-col w-full p-4 md:p-6 rounded-2xl section-pharagraph"
          :class="{
            'bg-blue-200': categoryName === 'frontend',
            'bg-blue-100': categoryName === 'backend',
            'bg-blue-50': categoryName === 'additional',
          }"
        >
          <div class="flex items-center gap-5 mb-4 md:mb-6">
            <span class="capitalize font-bold">{{ $t(categoryName) }}</span>
            <div class="w-full h-0.5 bg-gray-800"></div>
          </div>
          <div class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-1">
            <span v-for="(skill, index) in category" :key="index">
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script>
import mySkills from '@/utils/data/mySkills.json';
import { utilsMixin } from '@/utils/mixins/utilsMixin.js';

export default {
  computed: {
    skills() {
      return mySkills;
    },
    skillsWithIcons() {
      return [
        ...this.skills.frontend,
        ...this.skills.backend,
        ...this.skills.additional
      ].filter(skill => skill.iconName);
    },
    allSkills() {
      return [
        ...this.skills.frontend,
        ...this.skills.backend,
        ...this.skills.additional
      ];
    },
  },
  mixins: [ utilsMixin ],
}
</script>