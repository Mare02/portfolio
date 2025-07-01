<template>
  <div class="flex gap-4 md:gap-6">
    <a :href="config.socials.github" target="_blank" class="w-7 md:w-8 github-link hover:opacity-80 transition-opacity duration-200 dark:invert dark:brightness-0">
      <img loading="lazy" src="~/assets/images/socials/github-mark.png" alt="github icon">
    </a>
    <a :href="config.socials.linkedin" target="_blank" class="w-7 md:w-8 hover:opacity-80 transition-opacity duration-200">
      <img loading="lazy" src="~/assets/images/socials/In-Blue-48.png" alt="linkedin icon">
    </a>
  </div>
</template>

<script setup>
import config from '@/data/config.json';
</script>