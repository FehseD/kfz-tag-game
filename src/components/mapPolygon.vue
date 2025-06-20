<template>
  <l-marker :lat-lng="pos">
    <l-tooltip>{{ props.city.state + ', ' + props.city.explanation + ' ' + props.city.tag }}</l-tooltip>
  </l-marker>
  <l-polygon :lat-lngs="latLngs" color="green"/>
</template>

<script setup lang="ts">
import { GameData, MapData, useGameDataStore } from "@/stores/GameDataStore";
import { computed } from "vue";
import { LMarker, LPolygon, LTooltip } from "@vue-leaflet/vue-leaflet";
import { storeToRefs } from "pinia";

const props = defineProps<{
  city: GameData
}>();


const gameDataStoreMapData = storeToRefs(useGameDataStore());

const pos = computed(() => {
  const foundMapData = gameDataStoreMapData.mapData.value.find(value => value.id == props.city.id) as MapData;
  if (foundMapData.data.length == 0) {
    console.log(foundMapData);
    return [0, 0];
  }
  return [foundMapData.data[0].lat, foundMapData.data[0].lon];
});

const latLngs = computed(() => {
  const foundMapData = gameDataStoreMapData.mapData.value.find(value => value.id == props.city.id) as MapData | undefined;
  if (foundMapData == undefined) {
    console.log(props.city);
    return [];
  }

  if (foundMapData.data[0].geojson.type == "Polygon") {
    return foundMapData.data[0].geojson.coordinates[0].map(value => {
      return [value[1], value[0]];
    });
  }

  if (foundMapData.data[0].geojson.type == "MultiPolygon") {
    return foundMapData.data[0].geojson.coordinates[0][0].map(value => {
      return [value[1], value[0]];
    });
  }

  console.log(foundMapData);
  return [];

});
</script>

<style scoped>

</style>
