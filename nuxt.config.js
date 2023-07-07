export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "LaBrujula.Tk",
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
      { rel: "icon", type: "image/x-icon", href: "/favicon-16x16.png" },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css",
      },
    ],
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js",
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js",
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css",
      },
      
    ],
  },

  target : "server",

  googleAnalytics: {
    id: "G-RCZ6EYBXLP" // Reemplaza con tu ID de seguimiento de Google Analytics
  },

  publicRuntimeConfig: {
    googleAnalytics: {
      id: "G-RCZ6EYBXLP"
    }
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "@/plugins/vue-infinite-loading", mode: "client" },
    { src: "@/plugins/v-viewer", mode: "client" },
    { src: "@/plugins/leaflet.js", mode: "client", srr: false },
    { src: '@/plugins/ga.js', mode: 'client'}

  ],

  router: {
    extendRoutes(routes, resolve) {
      routes.push(

        {
          path: '/:lat/:lon',
          component: resolve(__dirname, "components/osm.vue"),
          validate: {
            lat: /^\d+(\.\d+)?$/,
            lon: /^\d+(\.\d+)?$/
          }
        }
      );
    },
  },

  routes: [],

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["leaflet/dist/leaflet.css"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-analytics",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "nuxt-leaflet",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "https://elpionerodv.cl",
    // baseURL: 'http://127.0.0.1:8000'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  env: {
    baseURL: process.env.BASE_URL || "https://elpionerodv.cl",
    // baseURL: process.env.BASE_URL || 'http://127.0.0.1:8000'
  },
};
