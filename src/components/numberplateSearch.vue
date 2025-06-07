<template>
  <div class="h-100 d-flex align-start justify-center" style="margin-bottom: 20em">
    <v-card class="w-100 w-sm-100 w-md-75 w-lg-75 w-xxl-50">
      <v-card-title>Search</v-card-title>
      <v-card-subtitle>
        <v-text-field v-model="filter" label="Tag filter"></v-text-field>
      </v-card-subtitle>
      <v-data-table :items="items"/>
    </v-card>
  </div>
  <v-card
    :class="'position-fixed left-0 right-0 bottom-0 h-25 mx-auto d-flex flex-nowrap flex-column ' + (useDisplay().mobile.value ? '' : 'pa-4')"
    max-width="60em">
    <div :class="'d-flex flex-wrap align-stretch flex-grow-1 ' + (useDisplay().mobile.value ? 'ga-2' : 'gc-4')">
      <v-btn v-for="char in chars" :disabled="!available.includes(char)" :key="'char:' + char"
             :rounded="useDisplay().mobile.value ? 1 : true"
             class="flex-grow-1" :style="'height: ' + (useDisplay().mobile.value ? '' : '4em')"
             :size="useDisplay().mobile.value ? 30 : undefined"
             :color="!available.includes(char) ? '' : 'grey-darken-3'" @click="input(char)">
        {{ char }}
      </v-btn>
      <v-btn rounded width="5em" elevation="10" color="warning" icon="mdi-backspace" class="flex-grow-1"
             @click="filter = filter.slice(0, -1)" :size="useDisplay().mobile.value ? 30 : undefined"
             :style="'height: ' + (useDisplay().mobile.value ? '' : '4em')"/>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { GameData, useGameStore } from "@/stores/GameStore";
import { Ref, ref, watch } from "vue";
import { useDisplay } from "vuetify";

const chars = ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'Ü', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ö', 'Ä', 'Y', 'X', 'C', 'V', 'B', 'N', 'M'];
const available: Ref<Array<string>> = ref([]);

const gameStore = storeToRefs(useGameStore());

const items: Ref<Array<GameData>> = ref(gameStore.data.value);


const filter = ref('');

function input(char: string) {
  if (filter.value === null || filter.value === '') {
    filter.value = char;
  } else {
    filter.value += char;
  }
}

watch(filter, filterPossibleChars);

function filterPossibleChars(newVal: string) {
  available.value = [];
  const re = new RegExp(newVal, "iyg");
  items.value = gameStore.data.value.filter((gameData) => gameData.tag.match(re));

  if (items.value.length == 0) {
    items.value = gameStore.data.value;
  }

  for (const gameData of items.value) {
    for (const [index, char] of gameData.tag.split('').entries()) {
      if (filter.value.length == index && !available.value.includes(char)) {
        available.value.push(char);
      }
    }
  }
}

filterPossibleChars('');
</script>

<style scoped>

</style>
