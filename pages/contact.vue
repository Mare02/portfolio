<template>
  <!-- https://web3forms.com/pricing - try with this form api in the future -->
  <div class="bg-gray-100 min-h-screen">
    <NuxtLayout class="nav-top-padding">
      <div class="flex  items-center gap-10 md:gap-20 md:mb-5">
        <section-title class="mb-0 md:mb-0" :title="t('Contact me')"></section-title>
        <socials class="max-md:hidden"></socials>
      </div>
      <div class="flex justify-between flex-wrap mt-2 md:mb-5">
        <div class="flex flex-col md:flex-row md:gap-6 gap-1 underline lg:text-lg mb-2">
          <div class="flex items-center gap-2 w-max">
            <MdiIcon icon="mdiEmail"/>
            <a class="break-words" href="mailto:marko123obradovic@gmail.com">marko123obradovic@gmail.com</a>
          </div>
          <div class="flex items-center gap-2">
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
          class="w-full md:w-2/3 bg-white p-4 md:p-6 rounded-2xl border-4 border-gray-200"
        >
          <contact-form
            v-if="!isFormSubmitted"
            @success="handleFormSuccess"
          ></contact-form>

          <div v-else class="mt-4 md:mt-0">
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

  const isFormSubmitted = ref(false);

  const handleFormSuccess = () => {
    isFormSubmitted.value = true;
  };

  useSeoMeta({
    title: t('Contact me'),
  });
</script>
