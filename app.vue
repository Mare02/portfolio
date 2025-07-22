<template>
<div class="font-ibmsans">
    <Navbar />
    <NuxtPage></NuxtPage>
    <Footer />
  </div>
</template>
<script setup>
  import Navbar from '@/components/MainElements/Navbar.vue';
  import Footer from '@/components/MainElements/Footer.vue';

  useHead({
    meta: [
      {
        name: 'agd-partner-manual-verification'
      }
    ]
  });
</script>
