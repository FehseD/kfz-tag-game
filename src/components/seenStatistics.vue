<template>
  <div class="h-100 d-flex align-center justify-center">
    <v-card class="w-100 w-sm-100 w-md-75 w-lg-75 w-xxl-50">
      <v-card-title>
        Seen Statistics
      </v-card-title>
      <div class="mb-4">
        <Pie :data="chartConfigTagToCity" :options="options"/>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { Pie } from "vue-chartjs";
import { computed, ref } from "vue";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useSaveStore } from "@/stores/SaveStore";
import { storeToRefs } from "pinia";
import { useGameDataStore } from "@/stores/GameDataStore";

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
</script>

<style scoped>

</style>
