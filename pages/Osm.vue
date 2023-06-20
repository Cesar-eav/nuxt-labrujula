<template>
  <div>
    <div v-if="map">
      <client-only>
        <div id="map-wrap" style="height: 100vh">
            <l-map :zoom="13" :center="[this.lat, this.lon]">
              <l-tile-layer
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              ></l-tile-layer>
              <l-marker :lat-lng="[this.lat, this.lon]"></l-marker>
            </l-map>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
//import * as L from 'vue2-leaflet';

//import 'leaflet/dist/leaflet.css';


export default {
  layout: "Default",

  props: ["lat", "lon"],

  components: [
    //LMap, LTileLayer, LMarker
    ],

};
</script>
