<template>
  <div>
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
