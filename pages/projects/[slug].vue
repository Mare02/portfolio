<script setup>
import SectionTitle from '@/components/MainElements/SectionTitle.vue';
import Button from '@/components/UI/Button.vue';
import imageUrlBuilder from "@sanity/image-url";

import Lightgallery from 'lightgallery/vue';
import lgZoom from 'lightgallery/plugins/zoom';
import 'lightgallery/css/lightgallery.css';

import { useI18n } from 'vue-i18n';
const { locale } = useI18n();
const route = useRoute();

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source).url()
    : null;

const query = groq`*[_type == "project" && slug.en.current == $slug][0]`;
const { data } = await useSanityQuery(query, { slug: route.params.slug });
const project = data.value;
</script>

<template>
  <NuxtLayout class="nav-top-padding pb-20">
    <div
      class="w-full max-h-72 overflow-hidden flex items-start justify-center rounded-2xl border-2"
      v-if="project && project.images[0]"
    >
      <img
        :src="urlFor(project.images[0].asset._ref)"
        :alt="project.name[locale]"
        class="w-full h-auto object-cover"
        loading="lazy"
      >
    </div>
    <div class="flex flex-col lg:flex-row lg:items-center lg:gap-20 mb-4 lg:mb-0" v-if="project && project.name">
      <section-title class="mb-4 md:mb-6 mt-8 gradient-text" :title="project.name[locale]"></section-title>
      <div
        class="flex items-center gap-4 min-w-max"
        v-if="project.websiteUrl[locale] || project.sourceCodeUrl"
      >
        <a :href="project.websiteUrl[locale]" target="_blank" rel="noopener noreferrer" v-if="project.websiteUrl[locale]">
          <Button link class="border-2">
            <MdiIcon icon="mdiWeb" class="mr-2"/>
            {{ $t('Website') }}
          </Button>
        </a>
        <a :href="project.sourceCodeUrl" target="_blank" rel="noopener noreferrer" v-if="project.sourceCodeUrl">
          <Button link class="border-2">
            <MdiIcon icon="mdiCodeBraces" class="mr-2"/>
            {{ $t('Code') }}
          </Button>
        </a>
      </div>
    </div>
    <p class="section-pharagraph mb-4 md:mb-6" v-if="project && project.description[locale]">
      {{ project.description[locale] }}
    </p>
    <div class="py-4 mb-4 md:mb-6" v-if="project && project.images && project.images.length">
      <h3 class="section-pharagraph mb-3 underline">{{ $t('Project gallery') }}</h3>
      <lightgallery
        :settings="{ speed: 500, plugins: [lgZoom], selector: 'a' }"
        class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4"
      >
        <a
          v-for="image in project.images"
          :key="image.asset._ref"
          :href="urlFor(image.asset._ref)"
          :data-src="urlFor(image.asset._ref)"
          class="block aspect-square overflow-hidden rounded-lg border-2"
        >
          <img
            :alt="image"
            :src="urlFor(image.asset._ref)"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </a>
      </lightgallery>
    </div>
    <div class="prose dark:prose-invert dark:text-gray-200" v-if="project && project.htmlContent[locale]">
      <SanityContent :blocks="project.htmlContent[locale]" />
    </div>
  </NuxtLayout>
</template>
