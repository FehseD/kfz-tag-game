<template>
  <v-app>
    <v-main>
      <router-view v-if="!loadingData"/>
      <v-container v-else height="100%">
        <v-skeleton-loader height="100%" :elevation="24" type="card"></v-skeleton-loader>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { useSaveStore } from "@/stores/SaveStore";
import { ref } from "vue";
import { useGameDataStore } from "@/stores/GameDataStore";

const saveStoreMethods = useSaveStore();
const dataStore = useGameDataStore();

const loadingData = ref(true);

Promise.all([saveStoreMethods.loadAnswers(), dataStore.loadGameData()]).then(() => {
  loadingData.value = false;
});
</script>
