<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-2 md:mb-4">
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
    <div class="mb-2 md:mb-4">
      <VeeField
        name="phone"
        type="tel"
        v-model="phone"
        :bind="phoneAttrs"
        class="input-field"
        :class="{'invalid': errors.phone}"
        :placeholder="`${t('Your phone number')} (${t('optional')})`"
      >
      </VeeField>
      <VeeErrorMessage name="phone" class="text-red-400"/>
    </div>
    <div class="mb-2 md:mb-4">
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
        class="input-field h-36 md:h-40"
        :class="{'invalid': errors.message}"
        :placeholder="t('Your message')"
      >
      </VeeField>
      <VeeErrorMessage name="message" class="text-red-400"/>
    </div>

    <div :class="{'cursor-not-allowed': !meta.valid}">
      <Button
        :loading="loading"
        :disabled="!meta.valid"
        primary
        block
        large
      >
        {{ t('Submit') }}
      </Button>
    </div>
  </form>
</template>

<script setup>
  import Button from '@/components/UI/Button.vue';
  import Email from '@/lib/smtp.js';
  const config = useRuntimeConfig();
  import { snackbarStore } from '@/store/snackbarStore.js';
  const { createContactEmailTemplate, phoneNumberRegex } = useUtils();
  import * as yup from 'yup';
  const { t } = useI18n();

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
    phone: yup
      .string()
      .matches(phoneNumberRegex, t('errorMessages.invalidPhoneNumber')),
  });

  const { values, errors, meta, defineField } = useForm({
    validationSchema: schema
  });

  const loading = ref(false);
  const emit = defineEmits(['formSubmit', 'success', 'error']);

  const [ email, emailAttrs ] = defineField('email');
  const [ subject, subjectAttrs ] = defineField('subject');
  const [ message, messageAttrs ] = defineField('message');
  const [ phone, phoneAttrs ] = defineField('phone');

  const onSubmit = async () => {
    if (loading.value) {
      return;
    }
    if (Object.keys(errors.value).length) {
      return;
    }

    loading.value = true;

    const emailTemplateData = {
      sender: values.email,
      phone: values.phone,
      message: values.message,
      sentAt: new Date(),
    };
    const emailBody = createContactEmailTemplate(emailTemplateData);

    try {
      await Email.send({
        Host : config.public.ELASTIC_EMAIL_SMTP_HOST,
        Username : config.public.ELASTIC_EMAIL_SMTP_USERNAME,
        Password : config.public.ELASTIC_EMAIL_SMTP_PASSWORD,
        To : config.public.ELASTIC_EMAIL_SMTP_USERNAME,
        From : config.public.ELASTIC_EMAIL_SMTP_SENDER,
        Subject : values.subject,
        Body : emailBody
      })
        .then((res) => {
          loading.value = false;
          emit('formSubmit');
          if (res === 'OK') {
            snackbarStore.dispatchSnackbar(t('contact-submit-success'), 'success');
            emit('success');
          }
          else {
            snackbarStore.dispatchSnackbar(t('contact-submit-error'), 'warning');
            emit('error');
          }
        }
      )
    } catch (error) {
      emit('formSubmit');
      emit('error');
      snackbarStore.dispatchSnackbar(t('contact-submit-error'), 'warning');
    }
  };
</script>