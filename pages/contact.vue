<template>
  <div class="bg-gray-100 min-h-screen">
    <NuxtLayout class="nav-top-padding">
        <div class="flex flex-col sm:flex-row sm:items-center gap-10 md:gap-20 md:mb-20">
          <section-title class="mb-0 md:mb-0" :title="t('Contact me')"></section-title>
          <socials></socials>
        </div>
        <div class="flex flex-col md:flex-row items-center md:items-start md:gap-5 lg:gap-20">
          <div class="md:w-1/3">
            <img class="h-44 md:h-auto" loading="lazy" src="@/assets/images/contact.png" alt="a guy handling computers"/>
          </div>
          <div class="w-full md:w-2/3 bg-white p-4 md:p-6 rounded-2xl border-4 border-gray-200">
            <form @submit.prevent="onSubmit">
              <div class="mb-4 md:mb-6">
                <VeeField
                  name="email"
                  type="email"
                  v-model="email"
                  :bind="emailAttrs"
                  class="input-field"
                  :class="{'invalid': errors.email}"
                  :placeholder="t('Your email')"
                >
                </VeeField>
                <VeeErrorMessage name="email" class="text-red-400"/>
              </div>
              <div class="mb-4 md:mb-6">
                <VeeField
                  name="subject"
                  type="text"
                  v-model="subject"
                  :bind="subjectAttrs"
                  class="input-field"
                  :class="{'invalid': errors.subject}"
                  :placeholder="t('Subject')"
                >
                </VeeField>
                <VeeErrorMessage name="subject" class="text-red-400"/>
              </div>
              <div class="mb-4 md:mb-6">
                <VeeField
                  as="textarea"
                  name="message"
                  v-model="message"
                  :bind="messageAttrs"
                  class="input-field h-40"
                  :class="{'invalid': errors.message}"
                  :placeholder="t('Your message')"
                >
                </VeeField>
                <VeeErrorMessage name="message" class="text-red-400"/>
              </div>

              <button
                class="bg-blue-500 w-full text-white font-semibold rounded-lg p-4 hover:bg-blue-600"
                :class="{'opacity-75 pointer-events-none select-none': !meta.valid}"
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
  import SectionTitle from '@/components/MainElements/SectionTitle.vue';
  import Socials from '@/components/MainElements/Socials.vue';
  import Email from '@/lib/smtp.js';
  const config = useRuntimeConfig();
  const { t } = useI18n();
  const { createEmailTemplate } = useUtils();
  import * as yup from 'yup';

  const schema = yup.object().shape({
    email: yup
      .string()
      .required(t('errorMessages.required'))
      .email(t('errorMessages.invalidEmail')),
    subject: yup
      .string()
      .required(t('errorMessages.required')),
    message: yup
      .string()
      .required(t('errorMessages.required')),
  });

  const { values, errors, meta, defineField } = useForm({
    validationSchema: schema
  });

  const [ email, emailAttrs ] = defineField('email');
  const [ subject, subjectAttrs ] = defineField('subject');
  const [ message, messageAttrs ] = defineField('message');

  const onSubmit = async () => {
    if (Object.keys(errors.value).length) {
      console.log('pa de ces lebati');
      return;
    }
    const emailTemplateData = {
      sender: values.email,
      message: values.message,
      sentAt: new Date(),
    };
    const emailBody = createEmailTemplate(emailTemplateData);

    try {
      await Email.send({
        Host : config.public.ELASTIC_EMAIL_SMTP_HOST,
        Username : config.public.ELASTIC_EMAIL_SMTP_USERNAME,
        Password : config.public.ELASTIC_EMAIL_SMTP_PASSWORD,
        To : config.public.ELASTIC_EMAIL_SMTP_USERNAME,
        From : config.public.ELASTIC_EMAIL_SMTP_USERNAME,
        Subject : values.subject,
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
