<template>
  <div class="h-100 d-flex align-center justify-center">
    <v-card class="w-100 w-sm-100 w-md-75 w-lg-75 w-xxl-50">
      <v-card-title>
        Numberplate game
      </v-card-title>
      <div
        class="w-100 d-flex flex-column flex-sm-row flex-md-row flex-lg-row flex-xl-row flex-xxl-row justify-center mb-8">
        <div class="d-flex flex-column align-center">
          <p>Tag to City</p>
          <div>
            <Pie :data="chartConfigTagToCity" :options="options"/>
          </div>
        </div>
        <div class="d-flex flex-column align-center">
          <p>City to Tag</p>
          <div>
            <Pie :data="chartConfigCityToTag" :options="options"/>
          </div>
        </div>
      </div>
      <div>
        <v-btn @click="startCityToTag()" variant="tonal" color="success" size="large" block class="my-2">City to Tag
          Start
        </v-btn>
        <v-btn @click="startTagToCity()" disabled variant="tonal" color="success" size="large" block>Tag to City Start
        </v-btn>
      </div>
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
import { useGameStoreCityToTag } from "@/stores/GameStoreCityToTag";
import { storeToRefs } from "pinia";
import { useSaveStore } from "@/stores/SaveStore";
import { useGameStoreTagToCity } from "@/stores/GameStoreTagToCity";
import { useGameDataStore } from "@/stores/GameDataStore";

ChartJS.register(ArcElement, Tooltip, Legend)

const gameStoreCityToTagMethods = useGameStoreCityToTag();
const saveStore = storeToRefs(useSaveStore());

const gameStoreTagToCityMethods = useGameStoreTagToCity();

const gameDataStoreData = storeToRefs(useGameDataStore()).data;

function startCityToTag() {
  gameStoreCityToTagMethods.startGame(5);
  router.push('/gamectt');
}

function startTagToCity() {
  gameStoreTagToCityMethods.startGame(5);
  router.push('/gamettc');
}

const chartConfigCityToTag: Ref<ChartData<"pie", number[], unknown>> = ref({
  labels: ['Right:' + saveStore.ctt.value.rightAnswered.length, 'Wrong:' + saveStore.ctt.value.wrongerAnswered.length, 'Unseen:' + (gameDataStoreData.value.length - saveStore.ctt.value.wrongerAnswered.length - saveStore.ctt.value.rightAnswered.length)],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
      data: [saveStore.ctt.value.rightAnswered.length, saveStore.ctt.value.wrongerAnswered.length, gameDataStoreData.value.length - saveStore.ctt.value.wrongerAnswered.length - saveStore.ctt.value.rightAnswered.length],
    }
  ]
});

const chartConfigTagToCity: Ref<ChartData<"pie", number[], unknown>> = ref({
  labels: ['Right:' + saveStore.ttc.value.rightAnswered.length, 'Wrong:' + saveStore.ttc.value.wrongerAnswered.length, 'Unseen:' + (gameDataStoreData.value.length - saveStore.ttc.value.wrongerAnswered.length - saveStore.ttc.value.rightAnswered.length)],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
      data: [saveStore.ttc.value.rightAnswered.length, saveStore.ttc.value.wrongerAnswered.length, gameDataStoreData.value.length - saveStore.ttc.value.wrongerAnswered.length - saveStore.ttc.value.rightAnswered.length],
    }
  ]
});

const options = ref({
  responsive: true,
  maintainAspectRatio: false
});
</script>

<style scoped>

</style>
