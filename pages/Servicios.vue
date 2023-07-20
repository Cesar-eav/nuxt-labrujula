<template>
  <div class="flex flex-col justify-center">
    <modal-component
      :modal="modal"
      :atractivo_modal="atractivo_modal"
      @clicked="closeModal"
    />

    <div
      class="text-uppercase text-3xl text-center font-bold text-red-400 pt-4 pb-3"
    >
      Servicios
    </div>

    <p class="text-xl text-red-600 text-center">
      Servicios publicos como baños, estacionamiento para bicicletas, puntos de
      información tburística y mucho más.
    </p>

    <div class="container mx-auto px-4">
      <div class="grid grid-cols-3 gap-4 items-start">
        <!-- Columna 1 -->
        <div class="bg-red-400 rounded-lg p-4 flex  flex-col justify-center items-center align-middle	">
      
            <i class="far fa-question-circle fa-3x"></i>
            <p class="font-bold">Puntos de Información</p>
                <a href="https://goo.gl/maps/dbNiUaG4PksNXT6p9" target="_blank"><li>Muelle Prat</li></a>
                <a href="https://goo.gl/maps/zNApord6HE1Kx4Ws8" target="_blank"><li>Pergola de las Flores </li></a>
                <a href="https://goo.gl/maps/Scnn4bnfLXJZseSx5" target="_blank"><li>Paseo Dimalow</li></a>
                <a href="https://goo.gl/maps/7bb8vuzuaMwK8RKSA" target="_blank"><li>Terminal de buses</li></a>
                <a href="https://goo.gl/maps/zX8hyZCLT6YT87Wv9" target="_blank"><li>Plaza O'Higgins</li></a>
                <div class="bg-red-700 w-full text-center text-white rounded-lg py-2 ">MAPA</div>
   
        </div>
        <div
          class="bg-red-400 rounded-lg p-4 flex flex-col justify-center items-center"
        >
          <i class="fas fa-toilet fa-3x"></i>
          <p class="font-bold">Baños</p>
          <a href="https://goo.gl/maps/VjqKsUNR3TL1W5W48" target="_blank"><li>Mercado Puerto: $300</li></a>
          <a href="https://goo.gl/maps/dbNiUaG4PksNXT6p9" target="_blank"><li>Muelle Prat: $500</li></a>
          <a href="https://goo.gl/maps/PAoRqz4aY4MHo6vy8" target="_blank"><li>Estación Puerto: $400</li></a>
          <a href="https://goo.gl/maps/L2w3Pw81ox4taEkN6" target="_blank"><li>Paseo 21 de mayo: $300</li></a>
          <a href="https://goo.gl/maps/zNApord6HE1Kx4Ws8" target="_blank"><li>Pergola de las Flores: $350</li></a>
          <a href="https://goo.gl/maps/NR2a5ryzMY7PuM7L7" target="_blank"><li>Plaza Victoria: $300</li></a>
          <a href="https://goo.gl/maps/92GZWNUEi5hRFijQA" target="_blank"><li>Plaza del pueblo: $300</li></a>
          <a href="https://goo.gl/maps/zX8hyZCLT6YT87Wv9" target="_blank"><li>Plaza O'Higgins: $350</li></a>
          <a href="https://goo.gl/maps/7bb8vuzuaMwK8RKSA" target="_blank"><li>Terminal de buses: $350</li></a>
          <a href="https://goo.gl/maps/LLGYtTBvuLvvSg9L7" target="_blank"><li>Mercado Cardonal: $300</li></a>
          <a href="https://goo.gl/maps/4oGNDTWk4BVUzSeb8" target="_blank"><li>Muelle Barón: $300</li></a>
          <div class="bg-red-700 w-full text-center text-white rounded-lg py-2 ">MAPA</div>
        </div>
  

        <!-- Columna 2 -->
        <div class="bg-white rounded-lg p-4 flex justify-center items-center">
          <div>
            <i class="fas fa-bicycle fa-3x"></i>

            <p>Bicicleteros</p>
          </div>
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
    this.listIglesias();
  },
  methods: {
    listIglesias() {
      axios;
      this.$axios
        .get("api-iglesias") // Va a web.php por defecto y busca el nombre de la ruta que arroja el JSON
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
