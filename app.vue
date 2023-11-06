<template>
  <div class="font-ibmsans">
    <Navbar />
    <NuxtPage></NuxtPage>
  </div>
</template>
<script>
  import Navbar from './components/MainElements/Navbar.vue';
  export default {
    components: {
      Navbar,
    },
  }
</script>
