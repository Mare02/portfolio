<template>
  <!-- https://web3forms.com/pricing - try with this form api in the future -->
  <div class="main-section-background">
    <NuxtLayout class="nav-top-padding pb-10">
      <div class="flex  items-center gap-10 md:gap-20 md:mb-6">
        <section-title class="mb-0 md:mb-0" :title="t('Contact me')"></section-title>
        <socials class="max-md:hidden"></socials>
      </div>
      <div class="flex justify-between flex-wrap mt-2 md:mb-5">
        <div class="flex flex-col md:flex-row md:gap-6 gap-1 lg:text-lg mb-2">
          <div class="flex items-center gap-2 w-max section-pharagraph-small underline">
            <MdiIcon icon="mdiEmail"/>
            <a class="break-words" href="mailto:marko123obradovic@gmail.com">marko123obradovic@gmail.com</a>
          </div>
          <div class="flex items-center gap-2 section-pharagraph-small underline">
            <MdiIcon icon="mdiPhone"/>
            <a href="tel:+381600324985">+381600324985</a>
          </div>
        </div>

        <socials class="md:hidden"></socials>
      </div>
      <div class="flex flex-col md:flex-row items-center md:items-start md:gap-5 lg:gap-20">
        <div class="md:w-1/3">
          <img class="h-44 md:h-auto" loading="lazy" src="@/assets/images/contact.png" alt="a guy handling computers"/>
        </div>

        <div
          class="w-full md:w-2/3 bg-white dark:bg-slate-800 p-4 md:p-6 rounded-2xl border-4 border-gray-200 dark:border-slate-700 theme-transition"
        >
          <contact-form
            v-show="!isFormSubmitted"
            @success="handleFormSuccess"
            @error="handleFormError"
          ></contact-form>

          <div v-show="isFormSubmitted" class="mt-4 md:mt-0">
            <template v-if="isFormSuccess">
              <div class="section-pharagraph font-semibold flex gap-3 mb-4">
                <MdiIcon icon="mdiCheckCircle" color="green" class="shrink-0"/>
                <span class="leading-6">
                  {{ $t('contact-submit-success-title') }}
                </span>
              </div>
              <div class="section-pharagraph-small">
                {{ $t('contact-submit-success-description') }}
              </div>
              <div class="section-pharagraph-small mt-2 flex items-center gap-4">
                <span class="text-gray-600">
                  <nuxt-link :to="localePath('/')">
                    <Button link class="flex items-center gap-2">
                      <MdiIcon icon="mdiArrowLeft"/>
                      <div>
                        {{ $t('Go back to homepage') }}
                      </div>
                    </Button>
                  </nuxt-link>
                </span>
              </div>
            </template>

            <template v-else-if="isFormError">
              <div class="section-pharagraph font-semibold flex gap-3 mb-4">
                <MdiIcon icon="mdiCloseCircle" color="red" class="shrink-0"/>
                <span class="leading-6">
                  {{ $t('contact-submit-error-title') }}
                </span>
              </div>
              <div class="section-pharagraph-small">
                {{ $t('contact-submit-error-description') }}
              </div>
              <div class="section-pharagraph-small mt-2 flex items-center gap-4">
                <span class="text-gray-600">
                  <Button link class="flex items-center gap-2" @click="retryForm">
                    <MdiIcon icon="mdiReload"/>
                    <div>
                      {{ $t('Try again') }}
                    </div>
                  </Button>
                </span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
  import SectionTitle from '@/components/MainElements/SectionTitle.vue';
  import ContactForm from '@/components/MainElements/ContactForm.vue';
  import Socials from '@/components/MainElements/Socials.vue';
  import Button from '@/components/UI/Button.vue';
  const localePath = useLocalePath();
  const { t } = useI18n();

  const isFormSuccess = ref(false);
  const isFormError = ref(false);

  const isFormSubmitted = computed(() => isFormSuccess.value || isFormError.value);

  const handleFormSuccess = () => {
    isFormSuccess.value = true;
  };
  const handleFormError = () => {
    isFormError.value = true;
  };

  const retryForm = () => {
    isFormError.value = false;
    isFormSuccess.value = false;
  };

  useSeoMeta({
    title: t('Contact me'),
  });
</script>
