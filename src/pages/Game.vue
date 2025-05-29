<template>
  <v-container class="d-flex justify-center align-center h-100">
    <v-window
      v-model="window">
      <v-window-item v-for="game in games" :key="'game-' + game.t">
        <v-card width="50em">
          <v-card-title>
            {{ game.o.toLocaleLowerCase() }}
          </v-card-title>
          <v-card-subtitle v-if="revealed">
            <span v-for="oChar in game.o.split('')" :key="game.o + '-' + oChar"
                  :style="'color:' + (oChar == oChar.toUpperCase() ? 'green' : '')">
                {{ oChar }}
            </span>
          </v-card-subtitle>

          <v-card-actions class="d-flex flex-column">
            <v-btn v-for="answers in game.answers" :key="answers.text"
                   :color="revealed && answers.isRight ? 'success': 'error'" variant="flat"
                   :text="answers.text"
                   block @click="revealed = true"/>
          </v-card-actions>
          <v-card-actions>
            <v-spacer/>
            <v-btn v-if="window != games.length - 1 && revealed" @click="window++; revealed = false" color="info" variant="tonal"
                   text="next"/>
            <v-btn v-else-if="revealed" @click="restart()" color="info" variant="tonal">
              Restart
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGameStore } from "@/stores/GameStore";
import { ref, Ref } from "vue";

const games = storeToRefs(useGameStore()).game;
const window: Ref<number> = ref(0);
const revealed = ref(false);

function restart() {
  revealed.value = false;
  window.value = 0;
  useGameStore().startGame(5);
}

</script>

<style scoped>

</style>
