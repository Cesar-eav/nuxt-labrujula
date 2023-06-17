<template>
  <div class="justify-center">
   <modal-component
      :modal="modal"
      :atractivo_modal="atractivo_modal"
      @clicked="closeModal"
    ></modal-component>

    <div class="flex justify-between my-4 mx-10">
      <p class="font-bold text-2xl text-red-600">Atractivos</p>
      <p class="text-uppercase text-3xl font-bold text-red-400">
        <!-- {{ ubicacion }} -->
      </p>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-3 md:mx-10 sm:mx-0 md:gap-5 gap-y-5 justify-center md:px-0 px-2"
    >
      <div
        class="mx-0 md:mx-2 sm:mx-0 bg-red-800 rounded-lg"
        v-for="atractivo in arrayList"
        :key="atractivo.id"
        
      >
        <div v-if="isMobileAgent">
          <img
            :src="'http://127.0.0.1:8000/storage/' + atractivo.image"
            alt="imagen"
            class="w-full h-60 rounded-lg"
          />

          <div v-html="atractivo.content"></div>
        </div>
        <div v-else v-viewer>
          <div>
            <img
              :src="baseurl+'/storage/' + atractivo.image"
              alt="imagen"
              class="w-full h-60 rounded-lg"
            />
          </div>
        </div>

        <div class="flex justify-between mx-3">
          <button
            @click="openModal(atractivo)"
            class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm py-2 px-2 mr-3 my-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Más información
          </button>

          <a
            class="block px-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm py-2 my-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            :href="'/osm/' + atractivo.lat + '/' + atractivo.lon"
            target="_blank"
          >
            Ir al mapa
          </a>
        </div>
      </div>
    </div>

    <infinite-loading @infinite="infiniteHandler" :identifier="infiniteId">
    </infinite-loading>
  </div>
</template>



<style>
.active {
  background-color: blue;
  font-weight: bold;
  color: bisque;
}
</style>

<script>
import axios from "axios";
import ModalComponent from "@/components/Modal.vue";

export default {
  layout: "Default",

  data() {
    return {
      arrayList: [],
      infiniteId:1,
      page:1,
      cerro: "",
      modal: false,
      atractivo_modal: "",
      baseurl : process.env.baseURL

    };
  },

  components: {
    ModalComponent,
    // InfiniteLoading,
  },


  computed: {
    isMobileAgent() {
      const userAgent = navigator.userAgent;
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );
    },
  },

  created(){
    
  },

  methods: {
    infiniteHandler($state) {
      console.log('STATE', $state);
      this.page++;

      const ubication = this.$route.params.ubication || ''; // Con esto, si el parámetro ubication no está presente en la ruta, se asignará un valor vacío a la variable ubication, evitando así el error de undefined.
      const url = `https://elpionerodv.cl/api-murales/${ubication}?page=${this.page}`;


      let limit = this.arrayList.length + 1;
      axios.get(url, { params: { limit: limit } }).then((response) => {
        const posts = response.data[1].data;

        if (posts.length) {
          // Si hay datos en la variable post
          this.arrayList = this.arrayList.concat(posts);
          console.log('HAY DATOS')
          setTimeout(() => {
            $state.loaded();
            console.log('CARGADO')

          }, 20);
        } else {
          // Si NO hay datos, ya finalizó
          $state.complete();
        }
     });
    },
    closeModal(value) {
    //  El parametro VALUE es el FALSE que se está emitiendo desde componente hijo MODAL.VUE
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
