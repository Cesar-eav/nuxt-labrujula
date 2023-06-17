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
      Parques, Plazas y Huertos Ubanos
    </div>

    <div
      class="text-uppercase text-xl text-center font-bold text-red-400 pt-4 pb-3"
    >
      En construcción
    </div>

    <div class="flex justify-center">
      <p
        class="text-lg w-3/4 md:w-1/2 rounded-lg text-center text-red-800 bg-primary-400 p-2"
      >
        Si estás a cargo una plaza, huerto, parque comunitario o cualquier
        espacio al aire libre que pudiera entrar en estas categorias te
        invitamos a registrarte en LaBrujula.Tk
      </p>
    </div>

    <p class="pt-3 pb-3 text-lg text-center text-red-400">
      <a
        href="https://forms.gle/5aMR2ZhyaLapoF4h8
"
        target="blank"
        class="underline hover:text-red-100"
      >
        Regístrate gratuitamente
      </a>
    </p>

    <div class="flex flex-row">
      <div
        class="hidden text-uppercase text-xl text-center font-bold text-red-400 w-60"
      >
        O` Higgins, de La Victoria, Anibal Pinto, Sotomayor, Echaurren,
        Waddington, Bismarck, Eleuterio Ramirez, Cívica, Mena, Simon Bolivar,
        Playa Yungay, Carlos von Moltke, San Francisco de Asis, Pajaritos,
        Esmeralda, Wheelwright, Rubén Darío, El Descanso.
      </div>

      <div
        class="hidden text-uppercase text-xl text-center font-bold text-red-400 w-60"
      >
        Parque El Litre, Quintil, Parque Escuela 36, Parque Quebrada Verde,
      </div>
    </div>

    <div v-viewer class="flex flex-wrap justify-center md:px-0 px-2">
      <!-- <div class="w-96 mx-1 mb-2 bg-red-800 rounded-lg " v-for="miradores in arrayList" :key="miradores.id">
        <img :src="'storage/'+miradores.image" class="rounded-lg" /> 


        <div class="flex justify-between">
          <button
            @click="openModal(miradores)"
            class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm py-2 px-2 mr-3 my-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Más información
          </button>

          <a
            class="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm py-2 px-2 mr-3 my-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            :href="'/osm/' + miradores.lat + '/' + miradores.lon"
            target="blank"
            >Ir al mapa</a
          >
        </div> -->
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
      page: 0,
      cerro: "",
      modal: false,
      atractivo_modal: "",
    };
  },
  components: {
    ModalComponent,
  },

  mounted() {
    this.listPlazas();
  },
  methods: {
    listPlazas() {
      axios
        .get("api-miradores") // Va a web.php por defecto y busca el nombre de la ruta que arroja el JSON
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
