<template>
  <div>
    <div>
    <p v-if="hasGeolocationPermission">GPS: Si</p>
    <p v-else>GPS: No</p>
    <p v-if="latitude">LAT: {{ latitude }}</p>
  </div>
    <div id="map-wrap" style="height: 80vh">
      <ClientOnly>
        <l-map ref="map" :zoom="15" :center="[routeParams.lat, routeParams.lon]" @ready="onMapReady">
          <l-tile-layer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          ></l-tile-layer>
          <l-circle-marker
            :lat-lng="[routeParams.lat, routeParams.lon]"
            :radius="20"
            :weight="3"
          ></l-circle-marker>
          <l-polyline  v-if="routeLine" :lat-lngs="routeLine"></l-polyline>

          <l-marker :lat-lng="[routeParams.lat, routeParams.lon]">
            <l-popup>Destino</l-popup>
          </l-marker>

          <l-marker :lat-lng="userLocation" v-if="userLocation">
            <l-popup>              
              {{ `Posición Actual: ${userLocation[0]}, ${userLocation[1]}` }}
            </l-popup>

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
//import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';

import { LRoutingMachineControl } from "nuxt-leaflet";
import { point, distance, lineString, featureCollection } from "@turf/turf";


export default {
  layout: "Default",

  data() {
    return {
      isClient: false,
      zoom: 13,
      tileLayerUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      //center: [this.lat, this.lon], // Valor inicial, se actualizará con la posición actual del usuario
      userLocation: null, // La posición actual del usuario
      waypoints: [],
      latitude: null,
      longitude: null,
      hasGeolocationPermission: false,
      routeLine: null,
      destinationPoint: null

    };
  },

  components: {
    LRoutingMachineControl,
  },

  methods: {
    comprobacion() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.hasGeolocationPermission = true;

            this.userLocation = [
              position.coords.latitude,
              position.coords.longitude,
            ];
            //this.center = this.userLocation; // Actualiza el centro del mapa con la posición del usuario
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
        console.log(`Latitude GPS: ${this.latitude}, Longitude: ${this.longitude}`);

        // Verifica si this.routeParams no es null antes de acceder a sus propiedades
        if (this.userLocation && this.userLocation.geometry?.coordinates) {
          // Utiliza la función point de Turf.js para crear un punto geográfico con las coordenadas del punto de destino
          this.destinationPoint = point([this.routeParams.lon, this.routeParams.lat]);

          // Utiliza la función point de Turf.js para crear puntos geográficos con las coordenadas de inicio y destino
          const startPoint = point([this.longitude, this.latitude]);
          const endPoint = point([this.routeParams.lon, this.routeParams.lat]);
          console.log("START", startPoint);

          // Utiliza la función lineString de Turf.js para crear una línea que conecte los puntos de inicio y destino
          this.routeLine = lineString([
            startPoint.geometry.coordinates,
            endPoint.geometry.coordinates,
          ]);

          // Agrega la línea al mapa
          if (this.isClient) {
            const map = this.$refs.map.mapObject;
            L.geoJSON(this.routeLine).addTo(map);
          }
        }
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
      }
    },

    onMapReady() {
      const map = this.$refs.map.mapObject;

      // Verificamos que los waypoints estén disponibles antes de configurar L.Routing.control
      if (this.waypoints.length === 2) {
        // Configuramos L.Routing.control con los waypoints
        L.Routing.control({
          waypoints: this.waypoints,
          routeWhileDragging: true,
        }).addTo(map);
      }
    },
  },

  mounted() {
    this.isClient = process.client; // Actualiza el valor de isClient con el lado del cliente

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