<template>
  <NuxtLayout name="full-screen-section" :title="$t('My skills')">
    <div>
      <div class="flex flex-col items-center justify-between md:flex-row gap-10 lg:gap-20">
        <div class="max-md:flex justify-center shrink-0">
          <img class="w-full md:w-60 lg:w-80" loading="lazy" src="@/assets/images/guy_skills.jpeg" alt="a guy handling computers">
        </div>
        <div class="max-w-4xl">
          <p
            class="section-pharagraph"
            v-html="replaceTextBetweenEscapeCharacters(
              $t('MySkills.description'), 'span', 'gradient-text'
            )"
          ></p>
        </div>
      </div>
      <div class="mt-20 flex flex-wrap items-center justify-center gap-10 lg:gap-20">
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
            'bg-green-100': categoryName === 'frontend',
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