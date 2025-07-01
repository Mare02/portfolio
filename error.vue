<template>
  <NuxtLayout class="nav-top-padding pb-10">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-gray-900 mb-4 gradient-text">404</h1>
      <h2 class="section-title">{{ $t('errorPage.title') }}</h2>
      <p class="section-pharagraph my-6">{{ $t('errorPage.description') }}</p>
      <div class="flex justify-center">
        <NuxtLink
          :to="localePath('/')"
        >
          <Button primary>
            <MdiIcon icon="mdiHomeOutline"></MdiIcon>
            <span class="ml-2">{{ $t('errorPage.goHome') }}</span>
          </Button>
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const localePath = useLocalePath();
import Button from '@/components/UI/Button.vue';
</script>
