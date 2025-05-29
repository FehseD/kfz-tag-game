import { defineStore } from "pinia";
import data from "@/assets/data";

export type Game = {
  t: string
  c: string
  s: string
  o: string
  answers: Array<{ text: string, isRight: boolean }>
}

export const useGameStore = defineStore("gameStore", {
  state: () => ({
    game: [] as Game[],
  }),
  actions: {
    startGame(gameSize: number) {
      this.game = [];
      const kreiseIds = [] as number[];
      for (let i = 0; i < gameSize; i++) {
        let selectedKreis;

        do {
          selectedKreis = Math.round(Math.random() * (data.length + 1));
        } while (kreiseIds.includes(selectedKreis))

        kreiseIds.push(selectedKreis);
      }
      kreiseIds.forEach((kreiseId) => {
        const kreis = data[kreiseId] as Game;
        kreis.answers = this.giveAnswers(kreis);
        this.game.push(kreis);
      });
      console.log(this.game);
    },
    giveAnswers(gameItem: Game): Array<{ text: string, isRight: boolean }> {
      const answers = [
        {text: gameItem.t, isRight: true},
        {text: this.giveRandomShit(gameItem.o), isRight: false},
        {text: this.giveRandomShit(gameItem.o), isRight: false}];
      return this.shuffle(answers);
    },
    giveRandomShit(value: string): string {
      let ans = "";
      for (let i = 0; i < Math.ceil(Math.random() * 3); i++) {
        ans += value.charAt(Math.round(Math.random() * value.length - 1)).toUpperCase();
      }
      return ans;
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
