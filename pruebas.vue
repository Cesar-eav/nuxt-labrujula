<template>
  <div>
    <div id="map-wrap" style="height: 80vh">
      <ClientOnly>
        <l-map :zoom="15" :center="center">
          <l-tile-layer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          ></l-tile-layer>
          <l-circle-marker
            :lat-lng="center"
            :radius="20"
            weight="3"
            color="#FF0000"
          ></l-circle-marker>

          <l-marker :lat-lng="center"></l-marker>
          <l-marker :lat-lng="userLocation" v-if="userLocation">
            <l-popup>Posición Actual</l-popup>

            <l-routing-machine-control
              v-if="userLocation && waypoints.length === 2"
              :waypoints="waypoints"
            ></l-routing-machine-control>
          </l-marker>
        </l-map>
      </ClientOnly>
    </div>
  </div>
</template>

<script>
import { LCircleMarker, LMarker, LRoutingMachineControl } from "vue2-leaflet";
import L from 'leaflet';

export default {
  layout: "Default",

  data() {
    return {
      isClient: false,
      zoom: 13,
      tileLayerUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      center: [0, 0], // Valor inicial, se actualizará con la posición actual del usuario
      userLocation: null, // La posición actual del usuario
      waypoints: [],
      destination: [51.505, -0.09], // Coordenadas del punto de destino
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
            this.updateWaypoints(); // Actualiza los waypoints después de obtener la ubicación del usuario
          },
          (error) => {
            console.error("Error en getCurrentPosition:", error);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },

    updateWaypoints() {
      // Verifica si userLocation tiene valores antes de definir los waypoints
      if (this.userLocation) {
        this.waypoints = [
          L.latLng(this.userLocation[0], this.userLocation[1]), // Punto de inicio (latitud y longitud del primer marcador)
          L.latLng(this.destination[0], this.destination[1]), // Punto de destino (latitud y longitud del segundo marcador)
        ];
      }
    },
  },

  mounted() {
    this.isClient = process.client; // Actualiza el valor de isClient con el lado del cliente

    if (this.isClient) {
      this.comprobacion();
    }
  },

  components: {
    LCircleMarker,
    LMarker,
    LRoutingMachineControl,
  },
};
</script>
