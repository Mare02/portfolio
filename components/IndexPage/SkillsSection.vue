<template>
  <NuxtLayout name="full-screen-section" :title="$t('My skills')">
    <div>
      <p class="section-pharagraph">{{ $t('MySkills.description') }}</p>
      <div class="mt-10 md:mt-20 flex flex-wrap items-center justify-center gap-10 lg:gap-16">
        <div v-for="skill in allSkills" :key="skill.name" class="w-auto h-10 lg:h-12">
          <img
            class="h-full w-full object-cover"
            :src="`/techLogos/${skill.iconName}`"
            :alt="`${skill.name} logo`"
            loading="lazy"
          >
        </div>
      </div>
      <div class="mt-10 md:mt-20 flex flex-col sm:flex-row justify-evenly gap-5 md:gap-10 mx-auto">
        <div
          v-for="(category, categoryName) in skills"
          :key="category"
          class="flex flex-col w-full"
        >
          <div class="flex items-center gap-5 mb-5">
            <span class="capitalize font-bold text-2xl md:text-3xl underline">{{ categoryName }}</span>
            <div class="w-full h-0.5 bg-gray-200"></div>
          </div>
          <ul class="text-gray-800 text-xl md:text-2xl font-semibold list-inside list-disc">
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
export default {
  data() {
    return {
      skills: {
        frontend: [
          {
            name: 'JavaScript',
            iconName: 'JavaScript.png',
          },
          {
            name: 'HTML',
            iconName: 'html5.png',
          },
          {
            name: 'CSS',
            iconName: 'css3.png',
          },
          {
            name: 'SASS',
            iconName: 'sass.png',
          },
          {
            name: 'Tailwind',
            iconName: 'tailwind.png',
          },
          {
            name: 'Vue',
            iconName: 'vue.png',
          },
          {
            name: 'Nuxt 3',
            iconName: 'Nuxt3.png',
          },
        ],
        backend: [
          {
            name: 'MySQL',
            iconName: 'mysql.png',
          },
        ],
        other: [
          {
            name: 'SourceTree',
            iconName: 'sourcetree.png',
          },
        ],
      },
    }
  },
  computed: {
    allSkills() {
      return [
        ...this.skills.frontend,
        ...this.skills.backend,
        ...this.skills.other
      ];
    },
  },
}
</script>