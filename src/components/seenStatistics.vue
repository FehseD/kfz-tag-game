<template>
  <div class="h-100 d-flex align-center justify-center">
    <v-card class="w-100 w-sm-100 w-md-75 w-lg-75 w-xxl-50">
      <v-card-title>
        Seen Statistics
      </v-card-title>
      <div class="mb-4">
        <Pie :data="chartConfigTagToCity" :options="options"/>
      </div>
      <div style="height:600px">
        <l-map ref="map" v-model:zoom="zoom" :center="pos" :useGlobalLeaflet="false">
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
          >
          </l-tile-layer>
          <map-polygon v-for="seen in found" :key="'map' + seen.id" :city="seen"/>
        </l-map>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet';
import { Pie } from "vue-chartjs";
import { computed, Ref, ref } from "vue";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useSaveStore } from "@/stores/SaveStore";
import { storeToRefs } from "pinia";
import { GameData, useGameDataStore } from "@/stores/GameDataStore";
import MapPolygon from "@/components/mapPolygon.vue";

const saveStore = useSaveStore();
const gameDataStoreData = storeToRefs(useGameDataStore()).data
ChartJS.register(ArcElement, Tooltip, Legend)

const chartConfigTagToCity = computed(() => {
  return {
    labels: ['Seen:' + saveStore.seen.length, 'Unseen:' + (gameDataStoreData.value.length - saveStore.seen.length)],
    datasets: [
      {
        backgroundColor: ['#41B883', '#00D8FF'],
        data: [saveStore.seen.length, gameDataStoreData.value.length - saveStore.seen.length],
      }
    ]
  }
});

const options = ref({
  responsive: true,
  maintainAspectRatio: false
});
const pos: Ref<Array<number>> = ref([51.1638175, 10.4478313])
const zoom = ref(6);

const found = computed(() => {
  let seenArray: Array<GameData> = [];
  saveStore.seen.forEach(seen => {
    seenArray.push(gameDataStoreData.value.find((gameData) => gameData.id == seen) as GameData
    );
  });
  return seenArray;
});
</script>

<style scoped>

</style>
