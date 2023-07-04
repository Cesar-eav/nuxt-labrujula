<template>
  <div>
    <div id="map-wrap" style="height: 80vh">
      <client-only>
        <l-map
          :zoom="20"
          :center="[routeParams.lat, routeParams.lon]"
        >
          <l-tile-layer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          ></l-tile-layer>
          <l-marker
            :lat-lng="[routeParams.lat, routeParams.lon]"
          ></l-marker>
        </l-map>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  layout: "Default",
  props: ["lat", "lon"],

  components: {},
  computed: {
    routeParams() {
      return this.$route.params;
    },
  },
};
</script>
