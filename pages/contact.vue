<template>
  <div class="bg-gray-100 min-h-screen">
    <NuxtLayout class="nav-top-padding">
        <div class="flex flex-col sm:flex-row sm:items-center gap-10 md:gap-20 md:mb-20">
          <section-title class="mb-0 md:mb-0" :title="t('Contact me')"></section-title>
          <socials class=""></socials>
        </div>
        <div class="flex flex-col md:flex-row items-center md:items-start md:gap-5 lg:gap-20">
          <div class="md:w-1/3">
            <img class="h-44 md:h-auto" loading="lazy" src="@/assets/images/contact.png" alt="a guy handling computers"/>
          </div>
          <div class="md:w-2/3 bg-white p-4 md:p-6 rounded-2xl border-4 border-gray-200 section-pharagraph-small">
            <form @submit.prevent="sendEmail">
              <input
                v-model="from"
                type="email"
                class="w-full mb-4 md:mb-6 p-2 md:p-4 rounded-lg border-4 border-gray-200 outline-blue-500"
                :placeholder="t('Your email')"
              >
              <input
                v-model="subject"
                type="text"
                class="w-full mb-4 md:mb-6 p-2 md:p-4 rounded-lg border-4 border-gray-200 outline-blue-500"
                :placeholder="t('Subject')"
              >
              <textarea
                v-model="message"
                class="w-full h-40 mb-4 md:mb-6 p-2 md:p-4 rounded-lg border-4 border-gray-200 outline-blue-500"
                :placeholder="t('Your message')"
              ></textarea>

              <button
                class="bg-blue-500 w-full text-white font-semibold rounded-lg p-4 hover:bg-blue-600"
                type="submit"
              >
                {{ t('Submit') }}
              </button>
            </form>
          </div>
        </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
  const { t } = useI18n();
  import SectionTitle from '@/components/MainElements/SectionTitle.vue';
  import Socials from '@/components/MainElements/Socials.vue';

  const to = ref('marko123obradovic@gmail.com');
  let from = ref(undefined);
  let subject = ref(undefined);
  let message = ref(undefined);


  useSeoMeta({
    title: t('Contact me'),
  });
</script>
