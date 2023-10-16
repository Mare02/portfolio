<template>
  <NuxtLayout name="full-screen-section" :title="$t('My skills')">
    <div>
      <p class="section-pharagraph">{{ $t('MySkills.description') }}</p>
      <div class="mt-10 md:mt-20 flex flex-wrap items-center justify-center gap-16">
        <div v-for="skill in skills" :key="skill.name" class="w-auto h-10 md:h-14">
          <img class="h-full w-full object-cover" :src="`/techLogos/${skill.iconName}.png`" :alt="`${skill.name} logo`" loading="lazy">
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script>
export default {
  data() {
    return {
      skills: [
        {
          name: 'JavaScript',
          iconName: 'JavaScript',
        },{
          name: 'HTML',
          iconName: 'html5',
        },
        {
          name: 'CSS',
          iconName: 'css3',
        },
        {
          name: 'Vue',
          iconName: 'vue',
        },
        {
          name: 'Nuxt 3',
          iconName: 'Nuxt3',
        },
        {
          name: 'MySQL',
          iconName: 'mysql',
        },
        // {
        //   name: 'Databases',
        //   iconName: 'database',
        // },
        {
          name: 'Tailwind',
          iconName: 'tailwind',
        },
        {
          name: 'Sourcetree',
          iconName: 'sourcetree',
        },
      ],
    }
  },
}
</script>