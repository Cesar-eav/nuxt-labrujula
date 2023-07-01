<template>
  <div class="mx-5">

        <div id="map-wrap" style="height: 60vh">
            <l-map :zoom="20" :center="[this.lat, this.lon]">
              <l-tile-layer
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              ></l-tile-layer>
              <l-marker :lat-lng="[this.lat, this.lon]"></l-marker>
            </l-map>
        </div>

  </div>
</template>

<script>



export default {
  
  layout: "Default",
  props: ["lat", "lon"],


};
</script>
