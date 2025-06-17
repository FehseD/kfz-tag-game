<template>
  <l-marker :lat-lng="pos">
    <l-tooltip>{{ props.city.state + ', ' + props.city.explanation + ' ' + props.city.tag }}</l-tooltip>
  </l-marker>
  <l-polygon :lat-lngs="latLngs" color="green"/>
</template>

<script setup lang="ts">
import { GameData } from "@/stores/GameDataStore";
import { ref, Ref } from "vue";
import { LMarker, LPolygon, LTooltip } from "@vue-leaflet/vue-leaflet";

const props = defineProps<{
  city: GameData
}>();

const latLngs: Ref<Array<Array<number>>> = ref([]);
const pos: Ref<Array<number>> = ref([0, 0]);
fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + props.city.state + ' ' + props.city.explanation + '&limit=1&polygon_geojson=1').then(async (response) => {
  const json = await response.json();
  if (json.length == 0) {
    console.log(props.city);
  } else {
    pos.value = [json[0].lat, json[0].lon];
    latLngs.value = json[0].geojson.coordinates[0].map((lngsLat: Array<number>) => {
      return [lngsLat[1], lngsLat[0]];
    });
  }
});
</script>

<style scoped>

</style>
