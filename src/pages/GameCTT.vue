<template>
  <v-container class="d-flex justify-center align-center h-100">
    <v-window
      v-model="window" style="width: 100%">
      <v-window-item v-for="game in games" :key="'game-' + game.tag">
        <v-card class="w-100 w-sm-100 w-md-75 w-lg-50 w-xxl-33 mx-auto">
          <v-card-title>
            <p v-if="!revealed">
              {{ game.explanation.toLocaleLowerCase() }}
            </p>
            <span v-else v-for="oChar in game.explanation.split('')" :key="game.explanation + '-' + oChar"
                  :style="'color:' + (oChar == oChar.toUpperCase() ? 'green' : '')">
                {{ oChar }}
            </span>
          </v-card-title>
          <v-card-subtitle>
            {{ game.county }}
          </v-card-subtitle>
          <v-card-subtitle>
            {{ game.state }}
          </v-card-subtitle>
          <v-card-actions class="d-flex flex-column">
            <v-btn v-for="answers in game.answers" :key="answers.text"
                   :color="revealed && answers.isRight ? 'success': 'error'" variant="flat"
                   :text="answers.text"
                   block @click="reveal(game.id, answers.isRight)"/>
          </v-card-actions>
          <v-card-actions>
            <v-btn v-if="window != 0" @click="window--">
              Back
            </v-btn>
            <v-btn @click="router.push('/')" variant="tonal" color="warning">
              Home
            </v-btn>
            <v-spacer/>
            <v-btn v-if="window != games.length - 1 && revealed" @click="window++; revealed = false" color="info"
                   variant="tonal">
              Next
            </v-btn>
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
import { ref, Ref } from "vue";
import { useSaveStore } from "@/stores/SaveStore";
import router from "@/router";
import { useGameStoreCityToTag } from "@/stores/GameStoreCityToTag";

const games = storeToRefs(useGameStoreCityToTag()).game;
const saveStoreMethods = useSaveStore();
const window: Ref<number> = ref(0);
const revealed = ref(false);

function restart() {
  revealed.value = false;
  window.value = 0;
  useGameStoreCityToTag().startGame(5);
}

function reveal(id: number, isRight: boolean) {
  if (revealed.value == true) return
  revealed.value = true;
  if (isRight) {
    saveStoreMethods.saveNewRightAnswerCityToTag(id);
  } else {
    saveStoreMethods.saveNewWrongAnswerCityToTag(id);
  }
}

</script>

<style scoped>

</style>
