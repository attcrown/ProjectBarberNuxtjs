import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - barber',
    title: 'barber',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href:'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap'},
      { ref: 'stylesheet', href:'https://fonts.googleapis.com/icon?family=Material+Icons'},
      { ref: 'stylesheet', href:'https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css'},

    ],
    
    script:[
      {src: "https://static.line-scdn.net/liff/edge/2/sdk.js"},
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyC9Wj5xc54F8z4NcK-7RBJBuVfMh6zh-xc',
          authDomain: 'projectbarber64-9435e.firebaseapp.com',
          databaseURL: 'https://projectbarber64-9435e-default-rtdb.asia-southeast1.firebasedatabase.app',
          projectId: 'projectbarber64-9435e',
          storageBucket: 'projectbarber64-9435e.appspot.com',
          messagingSenderId: '31761681328',
          appId: '1:31761681328:web:9cacd2e8ed95f3b7a4a475',
          measurementId: 'G-E9B3F9EB0E'
        },
        services: {
          auth: true, // Just as example. Can be any other service.
          firestore: true,
          functions: true,
          storage: true,
          database: true,
          messaging: true,
          performance: true,
          appCheck: true,
          analytics: true,
          remoteConfig: true
        }
      }
    ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,   //ธีม-ขาว / ดำ
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
