<template>
  <NuxtLayout name="full-screen-section" :title="$t('My Projects')">
    <div class="overflow-x-auto flex space-x-20">
      <div
        v-for="project in projects"
        :key="project.title"
        class="flex-none bg-white rounded-lg relative rounded-3xl overflow-hidden"
      >
        <img :src="project.image" alt="Project Image" class=" h-96 w-96 object-cover rounded-md">
        <div class="absolute inset-0 flex flex-col justify-end p-4 bg-black/30">
          <div>
            <h3 class="font-bold mt-2 title text-white section-pharagraph-text">{{ project.title }}</h3>
            <p class="text-white section-pharagraph-text-small">{{ project.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import projects from '@/data/myProjects.json';
</script>