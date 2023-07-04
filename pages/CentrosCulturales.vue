<template>
  <div>
    <div class="flex flex-col bg-primary-800 p-2 mx-auto">
      <h1
        class="text-uppercase text-3xl text-center font-bold text-red-400 p-2"
      >
        Centros Culturales
      </h1>

      <div class="flex justify-center">
        <p
          class="text-lg w-3/4 md:w-1/2 rounded-lg text-center text-red-800 bg-primary-400 p-2"
        >
          Si diriges un centro cultural como un museo, sala de teatro,
          biblioteca u otro tipo de espacio, regístrate en nuestra plataforma y
          conecta con nuevas audencias.
        </p>
      </div>

      <p class="pt-3 pb-3 text-lg text-center text-red-400">
        <a
          href="https://forms.gle/QEEZSEbQGmVpKtHTA"
          target="blank"
          class="underline hover:text-red-100"
        >
          Regístrate gratuitamente
        </a>
      </p>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 md:mx-10 px-4 md:gap-5 gap-y-5 justify-center my-2"
    >
      <div
        class="mx-0 md:mx-2 sm:mx-0 bg-gray-300 rounded-lg p-2 flex justify-between"
        v-for="atractivo in arrayList"
        :key="atractivo.id"
      >
        <img
          :src="baseurl + '/storage/' + atractivo.image"
          class="max-h-32 w-32 pr-2 md:pr-2 md:max-h-60 md:w-60 object-contain rounded-full"
        />

        <span>
          <p class="font-bold text-lg">{{ atractivo.nombre_institucion }}</p>
          <p class="italic pb-2" v-html="atractivo.description"></p>
          <div class="pb-3 pt-1">
            <a :href="url + atractivo.sitio_web" target="_blank">{{
              atractivo.sitio_web
            }}</a>
          </div>

          <a
            :href="'https://www.facebook.com/' + atractivo.facebook"
            target="_blank"
          >
            <i class="fab fa-facebook fa-2x"></i
          ></a>
          <a
            :href="'https://www.instagram.com/' + atractivo.instagram"
            target="_blank"
          >
            <i class="fab fa-instagram fa-2x"></i
          ></a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  layout: "Default",
  data() {
    return {
      url: "https://",
      arrayList: [],
      page: 0,
      cerro: "",
      modal: false,
      atractivo_modal: "",
      baseurl: process.env.baseURL,
    };
  },

  components: {},

  mounted() {
    this.listCentros();
  },
  methods: {
    listCentros() {
      axios;
      this.$axios
        .get("/api-centros-culturales") // Va a web.php por defecto y busca el nombre de la ruta que arroja el JSON
        .then((respuesta) => (this.arrayList = respuesta.data));
      //     console.log('arrayList', this.arrayList);
      // }).catch(error => { console.log('error en LISTTAR SHOW', error) })
    },
  },
};
</script>
