export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  css: ['~/assets/css/main.css'],

  i18n: {
    defaultLocale: 'da',
    langDir: 'locales/',
    lazy: true,
    strategy: 'no_prefix',
    bundle: { optimizeTranslationDirective: false },
    locales: [
      { code: 'da', name: 'Dansk',    file: 'da.json', language: 'da-DK' },
      { code: 'en', name: 'English',  file: 'en.json', language: 'en-US' },
      { code: 'fr', name: 'Français', file: 'fr.json', language: 'fr-FR' },
      { code: 'sw', name: 'Swahili',  file: 'sw.json', language: 'sw-KE' },
    ],
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'BIAK — Brønderslev International Apostolsk Kirke',
      meta: [
        { name: 'description', content: 'Et levende kristent fællesskab i Brønderslev med folk fra hele verden.' },
        { name: 'keywords', content: 'kirke, BIAK, Brønderslev, kristen, apostolsk' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/biak-logo.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },

  runtimeConfig: {
    adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
    sessionSecret: process.env.SESSION_SECRET || 'biak-session-secret-change-in-production-min32!!',
  },

  nitro: {
    preset: 'node-server',
  },
})
