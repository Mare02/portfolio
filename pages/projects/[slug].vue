<template>
  <NuxtLayout class="nav-top-padding pb-20">
    <div class="w-full max-h-72 overflow-hidden flex items-start justify-center rounded-2xl border-2">
      <img
        :src="project.images[0]"
        :alt="project.name[locale]"
        class="w-full h-auto object-cover"
        loading="lazy"
      >
    </div>
    <div class="flex flex-col lg:flex-row lg:items-center lg:gap-20 mb-4 lg:mb-0">
      <section-title class="mb-4 md:mb-6 mt-8 gradient-text" :title="project.name[locale]"></section-title>
      <div class="flex items-center gap-4 min-w-max">
        <a :href="project.website_url" target="_blank" rel="noopener noreferrer" v-if="project.website_url">
          <Button link class="border-2">
            <MdiIcon icon="mdiSearchWeb" class="mr-2"/>
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
    <p class="section-pharagraph mb-4 md:mb-6">
      {{ project.description[locale] }}
    </p>
    <div class="prose dark:prose-invert dark:text-gray-200" v-if="project.html[locale]">
      <div v-html="project.html[locale]"></div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import SectionTitle from '@/components/MainElements/SectionTitle.vue';
import projects from '@/data/projects.json';
import Button from '@/components/UI/Button.vue';
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();
const route = useRoute();

const project = projects.find(project => project.slug.en === route.params.slug);
</script>