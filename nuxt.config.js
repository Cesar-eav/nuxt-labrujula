export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "nuxt-brujula4",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css",
      },
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js' },
    ]
  },

  googleAnalytics: {
    id: 'G-RCZ6EYBXLP', // Reemplaza con tu ID de seguimiento de Google Analytics
  },

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
      { src: '@/plugins/vue-infinite-loading', mode: 'client' },
      { src: '@/plugins/v-viewer', mode: 'client' },
  
    ],


  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/atractivos/:ubication?',
        component: resolve(__dirname, 'pages/atractivos.vue')
      })
    }
  },

  routes: [ ],

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],



  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    '@nuxtjs/google-analytics'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",


  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "https://elpionerodv.cl/",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  env: {
    baseURL: process.env.BASE_URL || 'https://elpionerodv.cl'
 
}



};
