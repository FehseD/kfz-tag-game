<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { useSaveStore } from "@/stores/SaveStore";
const saveStoreMethods = useSaveStore();
saveStoreMethods.loadAnswers();
</script>
