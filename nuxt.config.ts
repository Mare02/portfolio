// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/i18n',
  ],
  plugins: [
    { src: "@/plugins/aos.client.ts", ssr: false, mode: "client" }
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
        name: 'English(US)',
        file: 'en.json',
      },
      {
        code: 'sr',
        iso: 'sr',
        name: 'Serbian(Latin)',
        file: 'sr.json',
      },
    ],
    defaultLocale: 'en',
  },
})
