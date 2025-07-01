<template>
  <div>
    <LandingHero />
    <NuxtLayout>
      <AboutSection />
      <SkillsSection />
      <TimelineSection />
    </NuxtLayout>
  </div>
</template>

<script setup>
import LandingHero from '@/components/IndexPage/LandingHero.vue';
import AboutSection from '@/components/IndexPage/AboutSection.vue';
import SkillsSection from '@/components/IndexPage/SkillsSection.vue';
import TimelineSection from '@/components/IndexPage/TimelineSection.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

useSeoMeta({
  title: t('seo.index.title'),
  description: t('seo.index.description'),
  ogTitle: t('seo.index.title'),
  ogDescription: t('seo.index.description'),
});
</script>
