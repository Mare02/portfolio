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

<script setup lang="ts">
import LandingHero from '~/components/IndexPage/LandingHero.vue';
import AboutSection from '~/components/IndexPage/AboutSection.vue';
import SkillsSection from '~/components/IndexPage/SkillsSection.vue';
import TimelineSection from '~/components/IndexPage/TimelineSection.vue';

useSeoMeta({
  title: 'Marko Obradovic',
});
</script>
