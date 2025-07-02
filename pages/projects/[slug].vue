<template>
  <NuxtLayout class="nav-top-padding pb-20">
    <div
      class="w-full max-h-72 overflow-hidden flex items-start justify-center rounded-2xl border-2"
      v-if="project.images[0]"
    >
      <img
        :src="project.images[0]"
        :alt="project.name[locale]"
        class="w-full h-auto object-cover"
        loading="lazy"
      >
    </div>
    <div class="flex flex-col lg:flex-row lg:items-center lg:gap-20 mb-4 lg:mb-0">
      <section-title class="mb-4 md:mb-6 mt-8 gradient-text" :title="project.name[locale]"></section-title>
      <div
        class="flex items-center gap-4 min-w-max"
        v-if="project.website_url[locale] || project.source_code_url"
      >
        <a :href="project.website_url[locale]" target="_blank" rel="noopener noreferrer" v-if="project.website_url[locale]">
          <Button link class="border-2">
            <MdiIcon icon="mdiWeb" class="mr-2"/>
            {{ $t('Website') }}
          </Button>
        </a>
        <a :href="project.source_code_url" target="_blank" rel="noopener noreferrer" v-if="project.source_code_url">
          <Button link class="border-2">
            <MdiIcon icon="mdiCodeBraces" class="mr-2"/>
            {{ $t('Code') }}
          </Button>
        </a>
      </div>
    </div>
    <p class="section-pharagraph mb-4 md:mb-6" v-if="project.description[locale]">
      {{ project.description[locale] }}
    </p>
    <div class="py-4" v-if="project.images.length">
      <h3 class="section-pharagraph mb-3 underline">{{ $t('Project gallery') }}</h3>
      <lightgallery
        :settings="{ speed: 500, plugins: [lgZoom] }"
        class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4"
      >
        <a
          v-for="image in project.images"
          :key="image"
          :href="image"
          class="block aspect-square overflow-hidden rounded-lg border-2"
        >
          <img
            :alt="image"
            :src="image"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </a>
      </lightgallery>
    </div>
    <div class="prose dark:prose-invert dark:text-gray-200" v-if="project.html[locale]">
      <div v-html="project.html[locale]"></div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import SectionTitle from '@/components/MainElements/SectionTitle.vue';
import projects from '@/data/projects.json';
import Button from '@/components/UI/Button.vue';

import Lightgallery from 'lightgallery/vue';
import lgZoom from 'lightgallery/plugins/zoom';
import 'lightgallery/css/lightgallery.css';

import { useI18n } from 'vue-i18n';
const { locale } = useI18n();
const route = useRoute();

const project = projects.find(project => project.slug.en === route.params.slug);
</script>

<style lang="css" scoped>
/* .lg-gallery img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}
.lg-gallery a {
  display: inline-block;
  width: 200px;
  margin: 5px;
} */
</style>
