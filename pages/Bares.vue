<template>
    <div class="justify-center">
        <modal-component 
      :modal="modal" 
      :atractivo_modal = "atractivo_modal"
      @clicked="closeModal"/>

      
      <div class="text-uppercase text-3xl text-center font-bold text-red-400 pt-4 pb-3">Bares</div>
      <div class="text-uppercase text-xl text-center font-bold text-red-400 pt-4 pb-3">En construcción</div>
      <a href="https://www.instagram.com/barlibertyvalpo/" target="blank">
      <div class="text-center text-3xl font-bold text-red-400 pt-4 pb-3">El primero en apoyar la causa: Bar Liberty.<br> Pronto toda la información.</div></a>

      


<!-- <div v-viewer class="flex flex-wrap justify-center md:px-0 px-2 ">

    <div class="w-96 mx-1 mb-2 bg-red-800 rounded-lg " v-for="miradores in arrayList" :key="miradores.id">
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
        </div>


    </div>

</div> -->

    

    </div>
</template>


<script>

import axios from 'axios';
import ModalComponent from "@/components/Modal.vue";


export default {
  layout: 'Default',
    data() {
        return {
            arrayList:[],
            page: 0,
            cerro: "",
            modal: false,
            atractivo_modal: "",
        }
    },
    components: {
    ModalComponent,
  },

    mounted() {
        this.listMiradores();
    },
    methods: {
        
        listMiradores() {
            axios.get('api-miradores') // Va a web.php por defecto y busca el nombre de la ruta que arroja el JSON
            .then(respuesta => this.arrayList = respuesta.data);
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
    }
}
</script>


