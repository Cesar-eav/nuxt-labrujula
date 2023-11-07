<template>
  <div class="flex flex-col justify-center">
    <h1 class="text-4xl text-red-600 text-center pt-5 pb-2 uppercase font-bold">
      Artistas.
    </h1>
    <p class="text-red-600 text-2xl text-center pb-3">
      Si quieres aparacer envíanos tus datos por interno a nuestro
      <a href="https://www.instagram.com/labrujula.tk/" target="_blank"><b>instagram.</b></a>
      
    </p>

    <div class="flex flex-col mx-2">
      <div v-for="artista in arrayList" :key="artista.id">

        <div v-if="artista.hm_points.length">

        <p class="text-red-600 text-3xl text-left font-bold pt-8">
          {{ artista.name }}
        </p>
        <p class="text-red-600 text-xl text-left font-bold pb-2">
          <a :href="url + '/' + artista.instagram_address" target="blank">
            {{ artista.instagram_address }}
          </a>
        </p>
        <div v-viewer class="flex flex-wrap mx-0">
          <div
            v-for="atractivo in artista.hm_points"
            :key="atractivo.id"
            class="w-80 h-50 p-1"
          >


            <img
              :src="baseurl+'/storage/' + atractivo.image"
              class="object-cover h-40 w-80 rounded-lg"
            />
            </div>
          </div>
          </div>
        </div>
      </div>

  </div>
</template>


<script>
import axios from "axios";

export default {
  layout: 'Default',

  data() {
    return {
      arrayList: [],
      page: 0,
      cerro: "",
      modal: false,
      atractivo_modal: "",
      url: "https://www.instagram.com",
      baseurl : process.env.baseURL
    }
  },

  head (){
    return {
      title: 'Artistas y muralistas',
      meta: [
       {name: 'description', content: 'Al Samir, A la Pinta, Allan Halley, Anis,Camilo Pinto Paredes, Giova, un.jotape'}
      ]
    }
  },

    mounted() {
    this.listArtists()
  },

  methods: {
    listArtists() {
      axios
      this.$axios
        .get("artistas") // Va a web.php por defecto y busca el nombre de la ruta que arroja el JSON
        .then((respuesta) => (this.arrayList = respuesta.data));
           console.log('arrayList', this.arrayList);
      // }).catch(error => { console.log('error en LISTTAR SHOW', error) })
    }

  },
};
</script>


