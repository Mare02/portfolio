// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
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
    /* module options */
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
