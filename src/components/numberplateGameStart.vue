<template>
  <div class="h-100 d-flex align-center justify-center">
    <v-card class="w-100 w-sm-100 w-md-75 w-lg-75 w-xxl-50">
      <v-card-title>
        Numberplate game
      </v-card-title>
      <v-card-item class="h-25">
        <Pie :data="chartConfig" :options="options"/>
      </v-card-item>
      <v-card-actions>
        <v-btn @click="start()" variant="tonal" color="success" size="large" block>Start</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { Pie } from "vue-chartjs";
import router from "@/router";
import { ref, Ref } from "vue";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData
} from 'chart.js'
import { useGameStore } from "@/stores/GameStore";
import { storeToRefs } from "pinia";
import { useSaveStore } from "@/stores/SaveStore";

ChartJS.register(ArcElement, Tooltip, Legend)

const gameStoreMethods = useGameStore();
const gameStore = storeToRefs(gameStoreMethods);
const saveStore = storeToRefs(useSaveStore());

function start() {
  gameStoreMethods.startGame(5);
  router.push('/game');
}

const chartConfig: Ref<ChartData<"pie", number[], unknown>> = ref({
  labels: ['Right:' + saveStore.rightAnswered.value.length, 'Wrong:' + saveStore.wrongerAnswered.value.length, 'Unseen:' + (gameStore.data.value.length - saveStore.wrongerAnswered.value.length - saveStore.rightAnswered.value.length)],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
      data: [saveStore.rightAnswered.value.length, saveStore.wrongerAnswered.value.length, gameStore.data.value.length - saveStore.wrongerAnswered.value.length - saveStore.rightAnswered.value.length],
    }
  ]
});

const options = ref({
  responsive: true,
  maintainAspectRatio: false,
});
</script>

<style scoped>

</style>
