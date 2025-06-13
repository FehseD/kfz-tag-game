import { defineStore, storeToRefs } from "pinia";
import { GameData, useGameDataStore } from "@/stores/GameDataStore";



export type Game = GameData & {
  answers: Array<{ text: string, isRight: boolean }>
}

export const useGameStoreCityToTag = defineStore("gameStoreCityToTag", {
  state: () => ({
    game: [] as Game[],
    // data: [] as Array<GameData>
  }),
  actions: {
    // async loadGameData() {
    //   const res = await fetch('./data.json');
    //   this.data = await res.json();
    // },
    startGame(gameSize: number) {
      const gameDataStoreData = storeToRefs(useGameDataStore()).data;
      this.game = [];
      const kreiseIds = [] as number[];
      for (let i = 0; i < gameSize; i++) {
        let selectedKreis;

        do {
          selectedKreis = Math.round(Math.random() * (gameDataStoreData.value.length - 1));
        } while (kreiseIds.includes(selectedKreis))

        kreiseIds.push(selectedKreis);
      }
      kreiseIds.forEach((kreisId) => {
        const kreis = gameDataStoreData.value[kreisId] as Game;
        kreis.id = kreisId;
        kreis.answers = this.giveAnswers(kreis);
        this.game.push(kreis);
      });
      console.log(this.game);
    },
    giveAnswers(gameItem: Game): Array<{ text: string, isRight: boolean }> {
      const answers = [
        {text: gameItem.tag, isRight: true},
        {text: this.giveRandomShit(gameItem.explanation, gameItem.tag), isRight: false},
        {text: this.giveRandomShit(gameItem.explanation, gameItem.tag), isRight: false}];
      return this.shuffle(answers);
    },
    giveRandomShit(inputString: string, realTag: string): string {
      let preAnswer = [] as Array<{ id: number, char: string }>
      const amount = Math.ceil(Math.random() * 3);
      let alreadyPicked = [] as number[];

      while (preAnswer.length != amount) {
        const randomIndex = Math.round(Math.random() * (inputString.length - 1));
        const newLetter = inputString.charAt(randomIndex).toUpperCase();

        if (![' ', '_', '-', '/', '(', ')'].includes(newLetter) && !alreadyPicked.includes(randomIndex)) {
          preAnswer.push({id: randomIndex, char: newLetter});
          alreadyPicked.push(randomIndex);
        }

        if (realTag == preAnswer.map((value) => {
          return value.char
        }).toString().replaceAll(',', '').toUpperCase()) {
          preAnswer = [];
          alreadyPicked = [];
        }
      }

      preAnswer.sort((a, b) => a.id - b.id);

      return preAnswer.map((value) => {
        return value.char
      }).toString().replaceAll(',', '');
    },
    shuffle(array: Array<{ text: string, isRight: boolean }>): Array<{ text: string, isRight: boolean }> {
      let currentIndex = array.length;

      // While there remain elements to shuffle...
      while (currentIndex != 0) {

        // Pick a remaining element...
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
      return array;
    }
  },
  getters: {}
})
