<template>
  <div>
    <LandingHero />
    <NuxtLayout>
      <AboutSection />
    </NuxtLayout>
  </div>
</template>
<script>
import LandingHero from '~/components/IndexPage/LandingHero.vue';
import AboutSection from '~/components/IndexPage/AboutSection.vue';
export default {
  components: {
    LandingHero,
    AboutSection,
  },
}
</script>
