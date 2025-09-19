<script setup>
import SectionTitle from '@/components/MainElements/SectionTitle.vue';
import { useI18n } from 'vue-i18n';
import Button from '@/components/UI/Button.vue';
const { t, locale } = useI18n();
import { ref } from 'vue';
import imageUrlBuilder from "@sanity/image-url";

const localePath = useLocalePath();

const resourceView = ref('grid');

const toggleResourceView = (view) => {
  resourceView.value = view;
  if (window && localStorage.getItem('resourceView') !== view) {
    localStorage.setItem('resourceView', view);
  }
};

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

onMounted(() => {
  if (window && localStorage) {
    resourceView.value = localStorage.getItem('resourceView') || 'grid';
  }
});

useSeoMeta({
  title: t('seo.projects.title'),
  description: t('seo.projects.description'),
  ogTitle: t('seo.projects.title'),
  ogDescription: t('seo.projects.description'),
});

const query = groq`*[_type == "project"]`;
const { data } = await useSanityQuery(query);
const projects = data.value;
</script>

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
    <div
      v-if="projects && projects.length"
      class="grid py-8 gap-6 lg:gap-8" :class="resourceView === 'grid' ? 'md:grid-cols-2' : ''"
    >
      <NuxtLink
        v-for="project in projects"
        :key="project._id"
        :to="localePath(`/projects/${project.slug.en.current}`)"
        :title="project.name[locale]"
        class="hover:opacity-80 theme-transition h-full"
      >
        <div class="flex rounded-2xl overflow-hidden border-2 h-full" :class="resourceView === 'grid' ? 'flex-col' : ''">
          <div
            class="overflow-hidden"
            :class="resourceView === 'list' ? 'w-1/2 md:w-1/4 md:aspect-video' : 'w-full aspect-video'"
          >
            <img
              :src="urlFor(project.images[0].asset._ref)"
              :alt="project.name[locale]"
              class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div
            class="rounded-b-2xl bg-gray-100 dark:bg-slate-900 p-4 md:p-6 theme-transition w-full"
            :class="resourceView === 'grid' ? 'border-t-2' : ''"
          >
            <div
              class="flex"
              :class="resourceView === 'list' ? 'flex-col sm:flex-row sm:items-center sm:justify-between' : 'items-center justify-between'"
            >
              <h2 class="section-pharagraph font-semibold gradient-text">
                {{ project.name[locale] }}
              </h2>
              <div class="flex items-start gap-1">
                <a
                  @click.stop=""
                  v-if="project.websiteUrl && project.websiteUrl[locale]"
                  :href="project.websiteUrl[locale]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button icon>
                    <MdiIcon icon="mdiWeb" />
                  </Button>
                </a>
                <a
                  @click.stop=""
                  v-if="project.sourceCodeUrl"
                  :href="project.sourceCodeUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button icon>
                    <MdiIcon icon="mdiCodeBraces" />
                  </Button>
                </a>
              </div>
            </div>
            <p class="section-pharagraph-small">
              {{ project.description[locale] }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>
