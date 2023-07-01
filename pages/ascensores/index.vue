<template>
  <div class="justify-center">
    <modal-component
      :modal="modal"
      :atractivo_modal="atractivo_modal"
      @clicked="closeModal"
    />

    <div
      class="text-uppercase text-3xl text-center font-bold text-red-400 pt-4 pb-3"
    >
      Ascensores Valparaíso
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-3 md:mx-10 sm:mx-0 md:gap-5 gap-y-5 justify-center md:px-0 px-2"
    >
      <div
        class="mx-0 md:mx-2 sm:mx-0 bg-red-800 rounded-lg"
        v-for="ascensores in arrayList"
        :key="ascensores.id"
      >
        <p class="text-xl text-red-200 text-center py-2 uppercase font-bold">
          Ascensor {{ ascensores.nombre }}
        </p>

        <img :src="baseurl + '/storage/' + ascensores.image" />

        <div class="flex justify-between">
          <button
            @click="openModal(ascensores)"
            class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm py-2 px-2 mr-3 my-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Más información 
          </button>

          <nuxt-link
            class="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm py-2 px-2 mr-3 my-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            :to="'/'+ascensores.lat+'/'+ascensores.lon"
            :lat="ascensores.lat"
            :lon="ascensores.lon"
          >
            Ir al mapa
          </nuxt-link>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ModalAscensores from "@/components/ModalAscensores.vue";
import Osm from "@/components/osm.vue";
import Id from "@/pages/ascensores/_id.vue";

export default {
  layout: "Default",

  data() {
    return {
      arrayList: [],
      modal: false,
      atractivo_modal: "",
      baseurl: process.env.baseURL,
    };
  },
  components: {
    ModalAscensores,
    Osm,
    Id
  },

  mounted() {
    this.listAscensores();
  },
  methods: {
    listAscensores() {
      axios;

      this.$axios
        .get("/api-ascensores")
        .then((respuesta) => {
          this.arrayList = respuesta.data;
          console.log("RESPONSE", respuesta.data);
          console.log("URL", respuesta.config.url);
          console.log("BASE", respuesta.config.baseURL);
        })
        .catch((error) => {
          console.error("Error en listAscensores:", error);
        });
    },
    closeModal(value) {
      //El parametro VALUE es el FALSE que se está emitiendo desde componente hijo MODAL.VUE
      this.modal = value;
      console.log("CLOSE MODAL");
    },
    openModal(data) {
      this.modal = true;
      this.atractivo_modal = data;
      console.log("MODAL A TRUE");
    },
  },
};
</script>
