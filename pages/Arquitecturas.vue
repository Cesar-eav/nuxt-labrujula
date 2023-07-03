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
      Arquitectura
    </div>

    <div
      v-viewer
      class="grid grid-cols-1 md:grid-cols-3 md:mx-10 sm:mx-0 md:gap-5 gap-y-5 justify-center md:px-0 px-2"
    >
      <div
        class="mx-0 md:mx-2 sm:mx-0 bg-red-800 rounded-lg"
        v-for="arquitectura in arrayList"
        :key="arquitectura.id"
      >
        <img
          :src="baseurl + '/storage/' + arquitectura.image"
          class="rounded-lg"
        />
        <div class="flex justify-between mx-3">
          <button
            @click="openModal(arquitectura)"
            class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm py-2 px-2 mr-3 my-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Más información
          </button>

          <nuxt-link

            class="block px-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm py-2 my-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            :to="'/' + arquitectura.lat + '/' + arquitectura.lon"
            target="_blank"
            :lat="arquitectura.lat"
            :lon="arquitectura.lon">
            Ir al mapa
          </nuxt-link>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ModalComponent from "@/components/Modal.vue";

export default {
  layout: "Default",

  data() {
    return {
      arrayList: [],
      modal: false,
      page: 0,
      cerro: "",
      modal: false,
      atractivo_modal: "",
      baseurl: process.env.baseURL,
    };
  },
  components: {
    ModalComponent,
  },

  mounted() {
    this.listarquitecturas();
  },
  methods: {
    listarquitecturas() {
      axios;
      this.$axios
        .get("api-arquitecturas") // Va a web.php por defecto y busca el nombre de la ruta que arroja el JSON
        .then((respuesta) => (this.arrayList = respuesta.data));
      //     console.log('arrayList', this.arrayList);
      // }).catch(error => { console.log('error en LISTTAR SHOW', error) })
    },

    deleteMural() {
      axios.delete("mural.destroy").then((response) => {
        console.log(response);
      });
      //     .catch(error => {
      //         console.log(error)
      //     })
    },
    closeModal(value) {
      //El parametro VALUE es el FALSE que se está emitiendo desde componente hijo MODAL.VUE
      this.modal = value;
      console.log("CLOSE MODAL");
    },
    openModal(data) {
      this.modal = true;
      this.atractivo_modal = data;
    },
  },
};
</script>
