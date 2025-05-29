<template>
  <v-container>
    <v-card>
      <v-btn @click="start()">Start</v-btn>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">

import { useGameStore } from "@/stores/GameStore";
import router from "@/router";

const gameStoreMethods = useGameStore();

function start() {
  gameStoreMethods.startGame(5);
  router.push('/game');
}
</script>

<style scoped>

</style>
