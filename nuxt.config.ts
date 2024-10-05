// https://nuxt.com/docs/api/configuration/nuxt-config
const development = process.env.NODE_ENV !== 'production';
const baseUrl = development
  ? process.env.DEV_DOMAIN
  : process.env.PROD_DOMAIN;

export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      MAILJET_API_KEY: process.env.MAILJET_API_KEY,
      MAILJET_API_SECRET: process.env.MAILJET_API_SECRET,

      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
      SENDGRID_SENDER: process.env.SENDGRID_SENDER,
      SENDGRID_EMAIL_TO: process.env.SENDGRID_EMAIL_TO,
      API_URL: `${baseUrl}/api`,
    },
  },
  modules: [
    '@vee-validate/nuxt',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    'nuxt-mdi',
  ],
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
  css: ['@/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  i18n: {
    lazy: true,
    langDir: 'lang',
    strategy: 'prefix_except_default',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'sr',
        iso: 'sr',
        name: 'Srpski',
        file: 'sr.json',
      },
    ],
    defaultLocale: 'en',
  },
})
