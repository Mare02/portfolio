<template>
  <div class="bg-gray-100 min-h-screen">
    <NuxtLayout class="nav-top-padding">
        <div class="flex flex-col sm:flex-row sm:items-center gap-10 md:gap-20 mb-10 md:mb-20">
          <section-title class="mb-0 md:mb-0" :title="$t('Contact me')"></section-title>
          <socials class=""></socials>
        </div>
        <div class="bg-white p-4 md:p-6 rounded-2xl border-4 border-gray-200 section-pharagraph-small">
          <form>
            <input
              class="w-full mb-4 md:mb-6 p-2 md:p-4 rounded-lg border-4 border-gray-200 outline-blue-500"
              type="email"
              :placeholder="$t('Your email')"
            >
            <input
              class="w-full mb-4 md:mb-6 p-2 md:p-4 rounded-lg border-4 border-gray-200 outline-blue-500"
              type="text"
              :placeholder="$t('Subject')"
            >
            <textarea
              class="w-full h-40 mb-4 md:mb-6 p-2 md:p-4 rounded-lg border-4 border-gray-200 outline-blue-500"
              :placeholder="$t('Your message')"
            ></textarea>

            <button
              class="bg-blue-500 w-full text-white rounded-lg p-4 hover:bg-blue-600"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
  const route = useRoute();
  const { t } = useI18n();
  import SectionTitle from '@/components/MainElements/SectionTitle.vue';
  import Socials from '@/components/MainElements/Socials.vue';

  useSeoMeta({
    title: t('Contact me'),
  });
</script>
