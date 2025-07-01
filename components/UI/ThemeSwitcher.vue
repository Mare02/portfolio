<template>
  <div>
    <Button @click="toggleTheme" icon>
      <MdiIcon icon="mdiWhiteBalanceSunny"/>
    </Button>
  </div>
</template>

<script setup>
import Button from '@/components/UI/Button.vue';

const toggleTheme = () => {
  const colorMode = useColorMode();
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light';
};
</script>
