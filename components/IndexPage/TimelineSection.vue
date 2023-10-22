<template>
  <NuxtLayout name="full-screen-section" :title="$t('My experience')">
    <Timeline :events="localeEvents"></Timeline>
  </NuxtLayout>
</template>

<script>
import Timeline from '@/components/UI/Timeline.vue';
import myExperience from '@/utils/data/myExperience.json';

export default {
  components: { Timeline },
  computed: {
    localeEvents() {
      const eventArr = [];
      for (const experience of myExperience) {
        eventArr.push(
          {
            date: {
              from: experience.date.from,
              to: experience.date.to,
            },
            title: experience.title[this.$i18n.locale],
            description: experience.description[this.$i18n.locale],
          }
        );
      }
      return eventArr;
    },
  }
}
</script>