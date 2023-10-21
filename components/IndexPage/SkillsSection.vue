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
          class="flex flex-col w-full p-6 bg-gray-100 rounded-2xl shadow-md shadow-indigo-300 section-pharagraph"
        >
          <div class="flex items-center gap-5 mb-5">
            <span class="capitalize font-bold underline">{{ $t(categoryName) }}</span>
            <div class="w-full h-0.5 bg-gray-300"></div>
          </div>
          <ul class="text-gray-800">
            <li v-for="skill in category" :key="skill.name">
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