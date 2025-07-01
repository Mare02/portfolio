<template>
  <div class="">
    <NuxtLayout class="nav-top-padding pb-10">
      <section-title class="mb-6 md:mb-8" :title="$t('My projects')"></section-title>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 py-8">
      <NuxtLink
          v-for="project in projects"
          :key="project.name.en"
          :to="localePath(`/projects/${project.slug.en}`)"
          :title="project.name[locale]"
          class="hover:opacity-80 theme-transition h-full"
        >
          <div class="flex flex-col rounded-2xl overflow-hidden border-2 h-full">
            <div class="aspect-video w-full overflow-hidden">
              <img
                :src="project.images[0]"
                :alt="project.name[locale]"
                class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div class="p-6 border-t-2 rounded-b-2xl landing-hero-background flex-1">
              <h2 class="section-pharagraph font-semibold gradient-text">
                {{ project.name[locale] }}
              </h2>
              <p class="section-pharagraph-small">
                {{ project.description[locale] }}
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
import SectionTitle from '@/components/MainElements/SectionTitle.vue';
import projects from '@/data/projects.json';
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();

const localePath = useLocalePath();

useSeoMeta({
  title: t('seo.index.title'),
  description: t('seo.index.description'),
});
</script>