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

        <img :src="baseurl+'/storage/' + ascensores.image" />

        <div class="flex justify-between">
          <button
            @click="openModal(ascensores)"
            class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm py-2 px-2 mr-3 my-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Más información
          </button>




          <a
            class="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm py-2 px-2 mr-3 my-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            :href="'/osm/' + ascensores.lat + '/' + ascensores.lon"
            target="blank"
            >Ir al mapa</a
          >
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import axios from "axios";
import ModalComponent from "@/components/ModalAscensores.vue";

export default {

  layout: "Default",

  data() {
    return {
      arrayList: [],
      modal: false,
      atractivo_modal: "",
      baseurl : process.env.baseURL

    };
  },
  components: {
    ModalComponent,
  },

  mounted() {
    this.listAscensores();
  },
  methods: {
    listAscensores() {
      axios
        this.$axios.get("/api-ascensores") // Va a web.php por defecto y busca el nombre de la ruta que arroja el JSON
        .then((respuesta) => (this.arrayList = respuesta.data));
      //     console.log('arrayList', this.arrayList);
      // }).catch(error => { console.log('error en LISTTAR SHOW', error) })
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