<template>
  <v-card v-if="useDisplay().mobile.value" class="position-fixed left-0 top-0 right-0" style="z-index: 9999">
    <v-text-field v-model="filter" label="Tag filter" density="compact"/>
  </v-card>
  <div class="h-100 d-flex align-start justify-center" style="margin-bottom: 20em">
    <v-card class="w-100 w-sm-100 w-md-75 w-lg-75 w-xxl-50 mt-16">
      <v-card-title>Search</v-card-title>
      <v-card-subtitle v-if="!useDisplay().mobile.value">
        <v-text-field v-model="filter" label="Tag filter"></v-text-field>
      </v-card-subtitle>
      <v-data-table v-if="!useDisplay().mobile.value" :items="items" :headers="headers">
        <template #item.seen="{item}">
          <v-checkbox-btn :model-value="saveStore.seen.value.includes(item.id)"
                          @click="saveStoreMethods.toggleSeen(item.id)"/>
        </template>
      </v-data-table>
      <v-data-iterator v-else :items=" items
          " :page="page">
        <template #default="{ items }">
          <template
            v-for="(item, i) in items"
            :key="i"
          >
            <v-card @click="saveStoreMethods.toggleSeen(item.raw.id)"
                    :color="saveStore.seen.value.includes(item.raw.id) ? 'green-darken-3': ''">
              <v-card-title>
                {{ item.raw.id }} {{ item.raw.county }}
              </v-card-title>
              <v-card-text>
                {{ item.raw.state }}
                <br>
                Tag: {{ item.raw.tag }}
                <br>
                Explanation: <span v-for="(char, index) in item.raw.explanation" :key="'char' + i + char + index"
                                   :style="'font-size:' + (char == char.toUpperCase() ? '1.5em' : '')">{{
                  char
                }}</span>
              </v-card-text>
            </v-card>
            <v-divider/>
          </template>
        </template>
        <template #footer>
          <v-pagination v-model="page" :length="items.length / 5"/>
        </template>
      </v-data-iterator>
    </v-card>
  </div>
  <v-card
    :class="'position-fixed left-0 right-0 bottom-0 h-25 mx-auto d-flex flex-nowrap flex-column ' + (useDisplay().mobile.value ? '' : 'pa-4')"
    max-width="60em">
    <div v-if="useDisplay().mobile.value" class="d-flex flex-wrap align-stretch flex-grow-1 ga-2 align-stretch">
      <v-btn v-for="char in available" :key="'char:' + char"
             class="flex-grow-1" style="height: unset;" :style="'width:' + (50 / available.length) + 'em'"
             size="30"
             :color="!available.includes(char) ? '' : 'grey-darken-3'" @click="input(char)">
        {{ char }}
      </v-btn>
      <v-btn rounded width="5em" elevation="10" color="warning" icon="mdi-backspace" class="flex-grow-1"
             @click="filter = filter.slice(0, -1)" size="30"
             style="height: unset"/>
    </div>
    <div v-else class="d-flex flex-wrap align-stretch flex-grow-1 gc-4">
      <v-btn v-for="char in chars" :disabled="!available.includes(char)" :key="'char:' + char"
             rounded
             class="flex-grow-1" style="height: 4em"
             :color="!available.includes(char) ? '' : 'grey-darken-3'" @click="input(char)">
        {{ char }}
      </v-btn>
      <v-btn rounded width="5em" elevation="10" color="warning" icon="mdi-backspace" class="flex-grow-1"
             @click="filter = filter.slice(0, -1)" style="height: 4em"/>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { Ref, ref, watch } from "vue";
import { useDisplay } from "vuetify";
import { GameData, useGameDataStore } from "@/stores/GameDataStore";
import { useSaveStore } from "@/stores/SaveStore";

const chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ä', 'Ö', 'Ü'];
const headers: any = [
  {
    title: 'Id',
    value: 'id',
    align: 'center',
  },
  {
    title: 'Tag',
    value: 'tag',
    align: 'left',
  },
  {
    title: 'County',
    value: 'county',
    align: 'left',
  },
  {
    title: 'Explanation',
    value: 'explanation',
    align: 'right'
  },
  {
    title: 'State',
    value: 'state',
    align: 'right'
  },
  {
    title: 'Seen',
    value: 'seen',
    align: 'right'
  }
]
const available: Ref<Array<string>> = ref([]);

const gameStore = storeToRefs(useGameDataStore());
const saveStoreMethods = useSaveStore();
const saveStore = storeToRefs(saveStoreMethods);

const items: Ref<Array<GameData>> = ref(gameStore.data.value);
const page = ref(1);
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
