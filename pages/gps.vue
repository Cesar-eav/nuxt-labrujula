<template>
  <div>

    <p v-if="hasGeolocationPermission">GPS: Si</p>
    <p v-else>GPS: No</p>
    <p v-if="latitude">LAT: {{ latitude }}</p>
    <p v-if="longitude">LAT: {{ longitude }}</p>





    </div>
</template>

<script>
export default {
  layout: "Default",

  data() {
    return {
      hasGeolocationPermission: false,
      latitude: null,
      longitude: null,
    };
  },

  methods: {
    comprobacion() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.hasGeolocationPermission = true;
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            console.log(
              `Latitude: ${this.latitude}, Longitude: ${this.longitude}`
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
  },

  mounted() {
    this.comprobacion();
  },
};
</script>
