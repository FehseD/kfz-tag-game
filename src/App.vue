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
import { useGameStore } from "@/stores/GameStore";
import { ref } from "vue";

const saveStoreMethods = useSaveStore();
saveStoreMethods.loadAnswers();

const loadingData = ref(true);

const gameStore = useGameStore();
gameStore.loadGameData().then(() => {
  loadingData.value = false;
});
</script>
