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
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
          { name: 'description', content: '当サイトはリバース:1999の2次創作サイトです。ここでは、私 [haku] の作った2次創作作品の再展示をしています。「なければ作る」を行動指針に、リバース:1999に登場する芸術品を立体化しています。' },
          { property: "og:type", content: "website" },
          {
            property: "og:title",
            content: `${process.env.TITLE} | リバース:1999　2次創作サイト`,
          },
          { property: "og:url", content: process.env.BASE_URL },
          { property: "og:locale", content: "ja_JP" },
          { property: "og:site_name", content: process.env.TITLE },
          {
            property: "og:description",
            content:
              "当サイトはリバース:1999の2次創作サイトです。ここでは、私 [haku] の作った2次創作作品の再展示をしています。",
          },
          {
            property: "og:image",
            content: `${process.env.BASE_URL}/img/sweet_fable.jpg`,
          },
          { property: "twitter:card", content: "summary" },
          { property: "twitter:site", content: process.env.TITLE },
          {
            property: "twitter:title",
            content: `${process.env.TITLE} | リバース:1999　2次創作サイト`,
          },
          {
            property: "twitter:description",
            content:
              "当サイトはリバース:1999の二次創作サイトです。ここでは、私 [haku] の作った2次創作作品の再展示をしています。",
          },
          {
            property: "twitter:image",
            content: `${process.env.BASE_URL}/img/sweet_fable.jpg`,
          },
      ],
    }
  }
})