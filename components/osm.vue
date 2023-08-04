<template>
  <div>
    <div>
      <p v-if="hasGeolocationPermission">GPS: Si</p>
      <p v-else>GPS: No</p>
      <p v-if="latitude">LAT: {{ latitude }}</p>
    </div>
    <div id="map-wrap" style="height: 80vh">
      <ClientOnly>
        <l-map
          ref="map"
          :zoom="15"
          :center="[routeParams.lat, routeParams.lon]"
          @ready="onMapReady"
        >
          <l-tile-layer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          ></l-tile-layer>
          <l-circle-marker
            :lat-lng="[routeParams.lat, routeParams.lon]"
            :radius="20"
            :weight="3"
          ></l-circle-marker>

          <l-routing-machine 
          
              :waypoints="waypoints"
            ></l-routing-machine >

                <!-- Agregar el control de enrutamiento -->
    <l-routing-machine :ref="routingMachineRef" :waypoints="waypoints"></l-routing-machine>
    <!-- El resto del código ... -->
    <l-routing-control :ref="routingMachineRef" :waypoints="waypoints"></l-routing-control>


          <l-marker :lat-lng="[routeParams.lat, routeParams.lon]">
            <l-popup>Destino</l-popup>
          </l-marker>

          <l-marker :lat-lng="userLocation" v-if="userLocation">
            <l-popup>
              {{ `Posición Actual: ${userLocation[0]}, ${userLocation[1]}` }}
          </l-popup>

          </l-marker>
        </l-map>
      </ClientOnly>
    </div>
  </div>
</template>

<script>

import { LRoutingMachine } from "nuxt-leaflet";



export default {
  layout: "Default",

  data() {
    return {
      isClient: false,
      routingMachineRef: 'routingMachine', // Referencia al control de enrutamiento para poder acceder a él

      zoom: 13,
      tileLayerUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      //center: [this.lat, this.lon], // Valor inicial, se actualizará con la posición actual del usuario
      userLocation: null, // La posición actual del usuario
      waypoints: [
        {lat:-33.040372000, lng:-33.0563584},
        {lat:-71.632448000, lng:-71.3916416}
      ],
      latitude: null,
      longitude: null,
      hasGeolocationPermission: false,
      routeLine: null,
      destinationPoint: null,
    };
  },

  components: {
    LRoutingMachine,
  },

  methods: {
    // Comprueba si LRoutingMachine está activo
    isLRoutingMachineActive() {
      return !!this.$refs.routingMachine; // Verifica si la referencia existe
    },

    comprobacion() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.hasGeolocationPermission = true;

            this.userLocation = [
              position.coords.latitude,
              position.coords.longitude,
            ];
            this.updateWaypoints(); // Actualiza los waypoints después de obtener la ubicación del usuario
          },
          (error) => {
            this.hasGeolocationPermission = false;
            console.error("Error en getCurrentPosition:", error);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },

    async getCurrentPositionA() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.hasGeolocationPermission = true;

            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            console.log(
              `Latitude GPS: ${this.latitude}, Longitude: ${this.longitude}`
            );

          },

          (error) => {
            this.hasGeolocationPermission = false;
            console.error("Error en getCurrentPosition:", error);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },

    updateWaypoints() {
      // Verifica si userLocation y center tienen valores antes de definir los waypoints
      if (this.userLocation && this.latitude && this.longitude) {
        this.waypoints = [
          L.latLng(this.routeParams.lat, this.routeParams.lon), // Punto de inicio (latitud y longitud del primer marcador)
          L.latLng(this.userLocation[0], this.userLocation[1]), // Punto de destino (misma ubicación del usuario)
        ];

        const routingMachineComponent = this.$refs[this.routingMachineRef];
        if (routingMachineComponent) {
          routingMachineComponent.setWaypoints(this.waypoints);
        }
      }
    },

    onMapReady() {
      this.getCurrentPositionA();
    },
  },

  mounted() {
    this.isClient = process.client; // Actualiza el valor de isClient con el lado del cliente
    console.log('LRoutingMachine está activo:', this.isLRoutingMachineActive());

    if (this.isClient) {
      this.comprobacion();
      this.getCurrentPositionA();
    }
  },

  computed: {
    routeParams() {
      return this.$route.params;
    },
  },
};
</script>
