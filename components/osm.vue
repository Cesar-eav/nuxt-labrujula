<template>
  <div>
    <div id="map-wrap" style="height: 80vh">
      <ClientOnly >
        <l-map :zoom="10" :center="[routeParams.lat, routeParams.lon]">
          <l-tile-layer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          ></l-tile-layer>
          <l-marker :lat-lng="[routeParams.lat, routeParams.lon]"></l-marker>
          <l-marker :lat-lng="userLocation" v-if="userLocation">
            <l-popup>Posición Actual</l-popup>
          </l-marker>
        </l-map>
      </ClientOnly >
    </div>
  </div>
</template>

<script>
//import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';

export default {
  layout: "Default",
  props: ["lat", "lon"],

  data() {
    return {
      isClient: false,
      zoom: 13,
      center: [0, 0], // Valor inicial, se actualizará con la posición actual del usuario
      tileLayerUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      userLocation: null, // La posición actual del usuario
    };
  },

  methods: {
    comprobacion() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.userLocation = [
              position.coords.latitude,
              position.coords.longitude,
            ];
            this.center = this.userLocation; // Actualiza el centro del mapa con la posición del usuario
          },
          (error) => {
            console.error("Error en getCurrentPosition:", error);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },
  },

  mounted() {
    this.isClient = process.client; // Actualiza el valor de isClient con el lado del cliente

    if (this.isClient) {
      this.comprobacion();
    }
  },

  components: {},

  computed: {
    routeParams() {
      return this.$route.params;
    },
    // leafletMarker() {
    //   return () => import("vue2-leaflet").then((module) => module.LMarker);
    // },
  },
};
</script>
