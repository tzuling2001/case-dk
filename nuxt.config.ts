// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  css: [
    '~/assets/css/main.css',
    '~/assets/css/style.css',
    '~/assets/css/experience.css',
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    baseURL: '/case-dk/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
})
