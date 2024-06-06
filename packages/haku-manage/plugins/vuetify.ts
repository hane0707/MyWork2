import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        ssr: true,
        components:[
            components,
        ],
        directives,
        theme: {
            themes: {
                light: { // テーマ名
                    colors: { // 以下で色を指定する（下記はデフォルト色）{
                          bg1999 : '#57486c',
                          secondary: '#424242',
                          accent: '#82B1FF',
                          error: '#FF5252',
                          info: '#2196F3',
                          success: '#4CAF50',
                          warning: '#FFC107',
                    },
                },
            },
        }
    });

    nuxtApp.vueApp.use(vuetify);
});