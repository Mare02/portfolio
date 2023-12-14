<template>
  <NuxtLayout name="full-screen-section" :title="$t('My skills')">
    <div>
      <div class="flex flex-col items-center justify-between md:flex-row gap-10 md:gap-20">
        <p
          class="section-pharagraph"
          v-html="replaceTextBetweenEscapeCharacters(
            $t('MySkills.description'), 'span', 'gradient-text'
          )"
        ></p>
      </div>
      <div class="mt-10 md:mt-20 w-full">
        <div class="marquee-wrapper">
            <div class="marquee-container">
              <div
                v-for="skill in skillsWithIcons"
                :key="skill.name"
                class="marquee-item"
              >
                <img
                  :src="`/techLogos/${skill.iconName}`"
                  :alt="`${skill.name} logo`"
                  class="marquee-item-logo"
                >
              </div>
            </div>
            <div class="marquee-container">
              <div
                v-for="skill in skillsWithIcons"
                :key="`${skill.name}2`"
                class="marquee-item"
              >
                <img
                  :src="`/techLogos/${skill.iconName}`"
                  :alt="`${skill.name} logo`"
                  class="marquee-item-logo"
                >
              </div>
            </div>
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
          <div class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-1 gap-1">
            <span v-for="(skill, index) in category" :key="index">
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const { replaceTextBetweenEscapeCharacters } = useUtils();
import skills from '@/data/mySkills.json';

const skillsWithIcons = [
    ...skills.frontend,
    ...skills.backend,
    ...skills.additional
  ].filter(skill => skill.iconName);
</script>
