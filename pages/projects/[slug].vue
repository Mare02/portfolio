<template>
  <NuxtLayout class="nav-top-padding pb-10">
    <div class="w-full max-h-72 overflow-hidden flex items-start justify-center rounded-2xl border-2">
      <img
        :src="project.images[0]"
        :alt="project.name[locale]"
        class="w-full h-auto object-cover"
        loading="lazy"
      >
    </div>
    <section-title class="mb-6 md:mb-8 mt-8" :title="project.name[locale]"></section-title>
    <div class="prose dark:text-gray-200">
      <div v-html="project.html[locale]"></div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import SectionTitle from '@/components/MainElements/SectionTitle.vue';
import projects from '@/data/projects.json';
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();
const route = useRoute();

const project = projects.find(project => project.slug.en === route.params.slug);
</script>