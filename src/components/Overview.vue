<template>
  <v-container fluid class="d-flex justify-center align-center h-100">
    <v-window v-model="page" show-arrows class="w-100 h-100">
      <v-window-item value="0" class="h-100">
        <numberplate-game-start/>
      </v-window-item>
      <v-window-item value="1" class="h-100">
        <numberplate-search/>
      </v-window-item>
      <v-window-item value="2" class="h-100">
        <seen-statistics/>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import NumberplateGameStart from "@/components/numberplateGameStart.vue";
import NumberplateSearch from "@/components/numberplateSearch.vue";
import SeenStatistics from "@/components/seenStatistics.vue";

const page = ref(0);
</script>

<style scoped>

</style>
