import { defineNuxtConfig } from 'nuxt/config'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  // nitro.presetをfirebaseに指定
  nitro: { 
    preset: 'firebase' ,
    // 追加
    firebase: {
      nodeVersion: '20',
      gen: 2,
      httpsOptions: {
        region: 'asia-northeast1',
        maxInstances: 1
      }
    }
  },
  postcss :{
    plugins: { tailwindcss: {} },
  },
  components: true,
  css: ['~/assets/css/tailwind.css', 'vuetify/lib/styles/main.sass'],
  build: {
    transpile: ["vuetify"]
  },
  devtools: {
    enabled: true
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  runtimeConfig: {
    public: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || '',
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN || '',
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || '',
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET || '',
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID || '',
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID || '',
    },
  },
  // head: {
  //   titleTemplate(title: string) {
  //     return (title ? `${title} | ` : '') + 'haku-works'
  //   },
  //   htmlAttrs:{
  //     lang: 'ja',
  //     prefix: 'og: http://ogp.me/ns#'
  //   },
  //   title: process.env.npm_package_name || '',
  //   meta: [
  //     { charset: 'utf-8' },
  //     { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  //     { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
  //     { hid: 'og:site_name', property: 'og:site_name', content: 'haku-works', },
  //     { hid: 'og:type', property: 'og:type', content: 'article' },
  //     { hid: 'og:url', property: 'og:url', content: 'https://haku-work.app.web' },
  //     { hid: 'og:title', property: 'og:title', content: 'haku-works', },
  //     { hid: 'og:description', property: 'og:description', content: '主に石膏や粘土で造形した立体物置き場。', },
  //     // { hid: 'og:image', property: 'og:image', content: 'https://ogp画像への絶対パス' },
  //     { hid: 'og:locale', content: 'ja_jp' },
  //     { name: 'twitter:card', content: 'summary' },
  //     { name: 'twitter:site', content: '@haku-works' },
  //   ],
  //   link: [
  //     { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  //     { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+JP&display=swap' },
  //     { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.6.1/css/all.css' }
  //   ]
  // },
})