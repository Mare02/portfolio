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
            <form @submit.prevent="submitForm">
              <input
                v-model="form.from"
                type="email"
                name="email"
                class="w-full mb-4 md:mb-6 p-2 md:p-4 rounded-lg border-4 border-gray-200 outline-blue-500"
                :placeholder="t('Your email')"
              >
              <input
                v-model="form.subject"
                type="text"
                name="subject"
                class="w-full mb-4 md:mb-6 p-2 md:p-4 rounded-lg border-4 border-gray-200 outline-blue-500"
                :placeholder="t('Subject')"
              >
              <textarea
                v-model="form.message"
                name="msg"
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
  const { createEmailTemplate } = useUtils();
  const config = useRuntimeConfig();
  import SectionTitle from '@/components/MainElements/SectionTitle.vue';
  import Socials from '@/components/MainElements/Socials.vue';
  import Email from '@/lib/smtp.js';

  const form = ref({
    from : undefined,
    subject : undefined,
    message : undefined,
  })

  const submitForm = async () => {
    const emailTemplateData = {
      sender: form.value.from,
      message: form.value.message,
      sentAt: new Date(),
    };
    const emailBody = createEmailTemplate(emailTemplateData);
    console.log({
      Host : config.public.ELASTIC_EMAIL_SMTP_HOST,
      Username : config.public.ELASTIC_EMAIL_SMTP_USERNAME,
      Password : config.public.ELASTIC_EMAIL_SMTP_PASSWORD,
      To : config.public.ELASTIC_EMAIL_SMTP_USERNAME,
      From : 'webaffiliatemarko@gmail.com',
      Subject : form.value.subject,
      Body : emailBody
    });
    // return;

    try {
      await Email.send({
        Host : config.public.ELASTIC_EMAIL_SMTP_HOST,
        Username : config.public.ELASTIC_EMAIL_SMTP_USERNAME,
        Password : config.public.ELASTIC_EMAIL_SMTP_PASSWORD,
        To : config.public.ELASTIC_EMAIL_SMTP_USERNAME,
        From : config.public.ELASTIC_EMAIL_SMTP_USERNAME,
        Subject : form.value.subject,
        Body : emailBody
      }).then((res) => {
          console.log(res);
        }
      )
    } catch (error) {
      console.log(error);
    }
  };

  useSeoMeta({
    title: t('Contact me'),
  });
</script>
