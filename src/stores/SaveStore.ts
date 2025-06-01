import { defineStore } from "pinia";

export const useSaveStore = defineStore("saveStore", {
  state: () => ({
    rightAnswered: [] as Array<number>,
    wrongerAnswered: [] as Array<number>,
  }),
  actions: {
    saveNewRightAnswer(id: number) {
      if (!this.rightAnswered.includes(id)) {
        this.rightAnswered.push(id);
        const indexInWrong = this.wrongerAnswered.indexOf(id);

        if (indexInWrong != -1) {
          this.wrongerAnswered.splice(indexInWrong, 1);
        }
        this.saveInLocalStorage();
      }
    },
    saveNewWrongAnswer(id: number) {
      if (!this.wrongerAnswered.includes(id)) {
        this.wrongerAnswered.push(id);
        const indexInRight = this.wrongerAnswered.indexOf(id);

        if (indexInRight != -1) {
          this.rightAnswered.splice(indexInRight, 1);
        }
        this.saveInLocalStorage();
      }
    },
    saveInLocalStorage() {
      localStorage.setItem('rightAnswered', JSON.stringify(this.rightAnswered));
      localStorage.setItem('wrongerAnswered', JSON.stringify(this.wrongerAnswered));
    },
    loadAnswers() {
      this.rightAnswered = JSON.parse(localStorage.getItem('rightAnswered'));
      this.wrongerAnswered = JSON.parse(localStorage.getItem('wrongerAnswered'));
    }
  },
  getters: {}
})
