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

      ELASTIC_EMAIL_API_KEY: process.env.ELASTIC_EMAIL_API_KEY,
      ELASTIC_EMAIL_SMTP_USERNAME: process.env.ELASTIC_EMAIL_SMTP_USERNAME,
      ELASTIC_EMAIL_SMTP_PASSWORD: process.env.ELASTIC_EMAIL_SMTP_PASSWORD,
      ELASTIC_EMAIL_SMTP_HOST: process.env.ELASTIC_EMAIL_SMTP_HOST,
      API_URL: `${baseUrl}/api`,
    },
  },
  modules: [
    '@nuxtjs/i18n',
    'nuxt-mdi',
    '@vueuse/nuxt',
  ],
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
