<template>
<div>


<Osm :lat=this.$route.params.lat :lon=this.$route.params.lon />


</div>
</template>

<script>
import Osm from "@/components/osm.vue";

export default {
  layout: "Default",

  components: {
    Osm,
  },

  computed: {
    routeParams() {
      return this.$route.params;
    },
  },
};
</script>
