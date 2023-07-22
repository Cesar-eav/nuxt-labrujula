<template>
  <div>
    <!-- <h1>Posición Geográfica Actual</h1>
    <p>Latitud: <span id="latitud"></span></p>
    <p>Longitud: <span id="longitud"></span></p> -->

    <div>
      <span v-if="$geolocation.loading">Loading location...</span>
      <span v-else-if="!$geolocation.supported"
        >Geolocation API is not supported</span
      >
      <span v-else
        >Range from destination: {{ inRange ? "Allowed" : "Disallowed" }}




        </span>
    </div>
   <p> GPS:{{$geolocation.loading  ? "Si" : "No"}}</p>
   <p>LAT: {{$geolocation.latitude}}</p>

  </div>
</template>





<script>
export default {
  layout: "Default",

  computed: {
    inRange() {
      const coords = this.$geolocation.coords;
    //   if (!coords) return "?";
    //   return distanceFrom(coords, this.destination) > 150;
    },
  },

    watch: {
    inRange(reached) {
      if (reached !== true) return
      console.log('Congratulations, you arrived')
      this.$geolocation.watch = false // Stop watching location
    }
  }
};
</script>

