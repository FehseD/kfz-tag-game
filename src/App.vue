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
import { useGameStoreTagToCity } from "@/stores/GameStoreTagToCity";
import { ref } from "vue";
import { useGameStoreCityToTag } from "@/stores/GameStoreCityToTag";

const saveStoreMethods = useSaveStore();
saveStoreMethods.loadAnswers();

const loadingData = ref(true);

const gameStoreTagToCity = useGameStoreTagToCity();
gameStoreTagToCity.loadGameData().then(() => {
  loadingData.value = false;
});

const gameStoreCityToTag = useGameStoreCityToTag();
gameStoreCityToTag.loadGameData().then(() => {
  loadingData.value = false;
});
</script>
