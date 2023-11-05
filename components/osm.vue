<template>
  <div>
    <div>
    <p v-if="hasGeolocationPermission">GPS: Si</p>
    <p v-else>GPS: No</p>
    <p v-if="latitude">LAT: {{ latitude }}</p>
  </div>
    <div id="map-wrap" style="height: 80vh">
      <ClientOnly>
        <l-map v-if="this.waypoints.length === 2" ref="map" :zoom="15" :center="[routeParams.lat, routeParams.lon]" @ready="onMapReady">
          <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
          <l-circle-marker :lat-lng="[routeParams.lat, routeParams.lon]" :radius="20" :weight="3"></l-circle-marker>
          <l-polyline v-if="routeLine" :lat-lngs="routeLine"></l-polyline>

          <l-marker :lat-lng="[routeParams.lat, routeParams.lon]">
            <l-popup>

              {{ `DESTINO : LAT ${routeParams.lat}, LON ${routeParams.lon}` }}


            </l-popup>
          </l-marker>

          <l-marker :lat-lng="userLocation" v-if="userLocation">
            <l-popup>
              {{ `Posición Actual: ${userLocation[0]}, ${userLocation[1]}` }}
            </l-popup>

          </l-marker>
          <l-routing-machine-control v-if="userLocation && waypoints.length === 2"
            :waypoints="waypoints"></l-routing-machine-control>

        </l-map>

      </ClientOnly>

      </ClientOnly>
    </div>

  </div>
</template>

<script>

import LRoutingMachineControl from "nuxt-leaflet";

export default {
  layout: "Default",

  data() {
    return {
      isClient: false,
      isClient: false,
      zoom: 13,
      tileLayerUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      userLocation: null, // La posición actual del usuario
      waypoints: [ ],
      latitude: null,
      longitude: null,
      hasGeolocationPermission: false,
      routeLine: null,
      destinationPoint: null


    };
  },

  components: {
    'l-routing-machine-control': LRoutingMachineControl

  },

  methods: {
     gpsPermission() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.hasGeolocationPermission = true;

            this.userLocation = [
              position.coords.latitude,
              position.coords.longitude,
            ];
    
                this.waypoints = [

                  [parseFloat(this.routeParams.lat), parseFloat(this.routeParams.lon)], // URL PUNTO LABRUJULA 
                  [this.latitude, this.longitude] // GPS
                
                ];
       

                this.onMapReady();

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

    async getCurrentPosition() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.hasGeolocationPermission = true;

            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            console.log(`Latitude GPS: ${this.latitude}, Longitude: ${this.longitude}`);


            setInterval(() => {
                this.waypoints = [

                  [parseFloat(this.routeParams.lat), parseFloat(this.routeParams.lon)], // URL PUNTO LABRUJULA 
                  [this.latitude, this.longitude] // GPS

             
                ];
                },100);
                console.log("[parseFloat(this.routeParams.lat), parseFloat(this.routeParams.lon)]",[parseFloat(this.routeParams.lat), parseFloat(this.routeParams.lon)]);
                console.log("[this.latitude, this.longitude]",[this.latitude, this.longitude]);
                
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


    onMapReady() {
      const map = this.$refs.map.mapObject;

      // Verificamos que los waypoints estén disponibles antes de configurar L.Routing.control
      if (this.waypoints.length === 2) {

        // Configuramos L.Routing.control con los waypoints
        L.Routing.control({
          waypoints: this.waypoints,
          routeWhileDragging: false,
        }).addTo(map);
      }
    },


  },

  mounted() {

    this.isClient = process.client; // Actualiza el valor de isClient con el lado del cliente

    if (this.isClient) {
      this.getCurrentPosition();

    }
  },



  computed: {
    routeParams() {
      return this.$route.params;
    },
  },
};
</script>