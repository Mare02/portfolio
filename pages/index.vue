<template>
  <div>
    <LandingHero />
    <NuxtLayout>
      <AboutSection />
      <SkillsSection />
    </NuxtLayout>
  </div>
</template>
<script>
import LandingHero from '~/components/IndexPage/LandingHero.vue';
import AboutSection from '~/components/IndexPage/AboutSection.vue';
import SkillsSection from '~/components/IndexPage/SkillsSection.vue';
export default {
  components: {
    LandingHero,
    AboutSection,
    SkillsSection,
  },
}
</script>
