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
    '@pinia/nuxt'
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  head: {
    titleTemplate(title: string) {
      return (title ? `${title} | ` : '') + 'haku-works'
    },
    htmlAttrs:{
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#'
    },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'haku-works', },
      { hid: 'og:type', property: 'og:type', content: 'article' },
      { hid: 'og:url', property: 'og:url', content: 'https://haku-work.app.web' },
      { hid: 'og:title', property: 'og:title', content: 'haku-works', },
      { hid: 'og:description', property: 'og:description', content: '主に石膏や粘土で造形した立体物置き場。', },
      // { hid: 'og:image', property: 'og:image', content: 'https://ogp画像への絶対パス' },
      { hid: 'og:locale', content: 'ja_jp' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@haku-works' },
    ],
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+JP&display=swap' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.6.1/css/all.css' }
    ]
  },
})