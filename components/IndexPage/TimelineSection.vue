<template>
  <NuxtLayout name="full-screen-section" :title="$t('My experience')">
    <Timeline :events="events"></Timeline>
  </NuxtLayout>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();
import Timeline from '@/components/UI/Timeline.vue';
import myExperience from '@/data/myExperience.json';

const events = ref(myExperience.map(experience => ({
  date: {
    from: experience.date.from,
    to: experience.date.to,
  },
  title: experience.title[locale.value],
  description: experience.description[locale.value],
  workplace: experience.workplace[locale.value],
  location: experience.location[locale.value],
})));
</script>