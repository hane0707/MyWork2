import { defineNuxtConfig } from 'nuxt/config'

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
  css: ['~/assets/css/tailwind.css'],
})