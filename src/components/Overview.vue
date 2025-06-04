<template>
  <v-container class="d-flex justify-center align-center h-100">
    <v-card class="w-100 w-sm-100 w-md-75 w-lg-75 w-xxl-50 mx-auto">
      <v-card-title>
        Numberplate game
      </v-card-title>
      <v-card-item>
        <Pie :data="chartConfig" :options="options"/>
      </v-card-item>
      <v-card-actions>
        <v-btn @click="start()" variant="tonal" color="success" size="large" block>Start</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData
} from 'chart.js'
import { Pie } from 'vue-chartjs'
import { useGameStore } from "@/stores/GameStore";
import router from "@/router";
import { useSaveStore } from "@/stores/SaveStore";
import { storeToRefs } from "pinia";
import data from "../../public/data.json";
import { Ref, ref } from "vue";

ChartJS.register(ArcElement, Tooltip, Legend)

const gameStoreMethods = useGameStore();
const saveStore = storeToRefs(useSaveStore());

function start() {
  gameStoreMethods.startGame(5);
  router.push('/game');
}

const chartConfig: Ref<ChartData<"pie", number[], unknown>> = ref({
  labels: ['Right:' + saveStore.rightAnswered.value.length, 'Wrong:' + saveStore.wrongerAnswered.value.length, 'Unseen:' + (data.length - saveStore.wrongerAnswered.value.length - saveStore.rightAnswered.value.length)],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
      data: [saveStore.rightAnswered.value.length, saveStore.wrongerAnswered.value.length, data.length - saveStore.wrongerAnswered.value.length - saveStore.rightAnswered.value.length],
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
