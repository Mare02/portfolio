<template>
  <NuxtLayout class="nav-top-padding pb-20">
    <section-title class="mb-6 md:mb-8" :title="$t('My projects')"></section-title>
    <div class="flex items-center justify-center gap-2">
      <Button @click="toggleResourceView('grid')" icon :active="resourceView === 'grid'">
        <MdiIcon icon="mdiViewGridOutline"/>
      </Button>
      <Button @click="toggleResourceView('list')" icon :active="resourceView === 'list'">
        <MdiIcon icon="mdiFormatListBulleted"/>
      </Button>
    </div>
    <div class="grid py-8 gap-6 lg:gap-8" :class="resourceView === 'grid' ? 'md:grid-cols-2' : ''">
      <NuxtLink
        v-for="project in projects"
        :key="project.name.en"
        :to="localePath(`/projects/${project.slug.en}`)"
        :title="project.name[locale]"
        class="hover:opacity-80 theme-transition h-full"
      >
        <div class="flex rounded-2xl overflow-hidden border-2 h-full" :class="resourceView === 'grid' ? 'flex-col' : ''">
          <div class="aspect-video overflow-hidden" :class="resourceView === 'list' ? 'w-1/3 md:w-1/4' : 'w-full'">
            <img
              :src="project.images[0]"
              :alt="project.name[locale]"
              class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div class="rounded-b-2xl bg-gray-100 dark:bg-slate-900 flex-1 p-4 md:p-6 theme-transition" :class="resourceView === 'grid' ? 'border-t-2' : ''">
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
</template>

<script setup>
import SectionTitle from '@/components/MainElements/SectionTitle.vue';
import projects from '@/data/projects.json';
import { useI18n } from 'vue-i18n';
import Button from '@/components/UI/Button.vue';
const { t, locale } = useI18n();
import { ref } from 'vue';

const localePath = useLocalePath();

const resourceView = ref('grid');
const toggleResourceView = (view) => {
  resourceView.value = view;
};

useSeoMeta({
  title: t('seo.index.title'),
  description: t('seo.index.description'),
});
</script>