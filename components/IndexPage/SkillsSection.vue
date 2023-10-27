<template>
  <NuxtLayout name="full-screen-section" :title="$t('My skills')">
    <div>
      <p class="section-pharagraph">{{ $t('MySkills.description') }}</p>
      <div class="mt-10 md:mt-20 flex flex-wrap items-center justify-center gap-10 lg:gap-20">
        <div v-for="skill in skillsWithIcons" :key="skill.name" class="w-auto h-10 lg:h-12 2xl:h-14">
          <img
            class="h-full w-full object-cover"
            :src="`/techLogos/${skill.iconName}`"
            :alt="`${skill.name} logo`"
            loading="lazy"
          >
        </div>
      </div>
      <div class="mt-10 md:mt-20 flex flex-col md:flex-row justify-evenly gap-5 md:gap-10 xl:gap-20 mx-auto">
        <div
          v-for="(category, categoryName) in skills"
          :key="category"
          class="flex flex-col w-full p-4 md:p-6 rounded-2xl  section-pharagraph"
          :class="{
            'bg-green-100': categoryName === 'frontend',
            'bg-orange-100': categoryName === 'backend',
            'bg-red-100': categoryName === 'additional',
          }"
        >
          <div class="flex items-center gap-5 mb-4 md:mb-6">
            <span class="capitalize font-bold underline">{{ $t(categoryName) }}</span>
            <div class="w-full h-0.5 bg-gray-800"></div>
          </div>
          <ul class="text-gray-800 section-pharagraph-small">
            <li v-for="(skill, index) in category" :key="index">
              {{ skill.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script>
import mySkills from '@/utils/data/mySkills.json';

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
  },
}
</script>