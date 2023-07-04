<template>
  <div>
    <div id="map-wrap" style="height: 80vh">
      <client-only>
        <l-map
          :zoom="20"
          :center="[this.$route.params.lat, this.$route.params.lon]"
        >
          <l-tile-layer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          ></l-tile-layer>
          <l-marker
            :lat-lng="[this.$route.params.lat, this.$route.params.lon]"
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
