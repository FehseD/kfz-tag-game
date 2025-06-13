import { defineStore } from "pinia";

export const useSaveStore = defineStore("saveStore", {
  state: () => ({
    ctt: {
      rightAnswered: [] as Array<number>,
      wrongerAnswered: [] as Array<number>,
    },
    ttc: {
      rightAnswered: [] as Array<number>,
      wrongerAnswered: [] as Array<number>,
    },
    seen: [] as Array<number>,
  }),
  actions: {
    saveNewRightAnswerCityToTag(id: number) {
      if (!this.ctt.rightAnswered.includes(id)) {
        this.ctt.rightAnswered.push(id);
        const indexInWrong = this.ctt.wrongerAnswered.indexOf(id);

        if (indexInWrong != -1) {
          this.ctt.wrongerAnswered.splice(indexInWrong, 1);
        }
        this.saveInLocalStorage();
      }
    },
    saveNewWrongAnswerCityToTag(id: number) {
      if (!this.ctt.wrongerAnswered.includes(id)) {
        this.ctt.wrongerAnswered.push(id);
        const indexInRight = this.ctt.wrongerAnswered.indexOf(id);

        if (indexInRight != -1) {
          this.ctt.rightAnswered.splice(indexInRight, 1);
        }
        this.saveInLocalStorage();
      }
    },
    saveNewRightAnswerTagToCity(id: number) {
      if (!this.ctt.rightAnswered.includes(id)) {
        this.ctt.rightAnswered.push(id);
        const indexInWrong = this.ctt.wrongerAnswered.indexOf(id);

        if (indexInWrong != -1) {
          this.ctt.wrongerAnswered.splice(indexInWrong, 1);
        }
        this.saveInLocalStorage();
      }
    },
    saveNewWrongAnswerTagToCity(id: number) {
      if (!this.ctt.wrongerAnswered.includes(id)) {
        this.ctt.wrongerAnswered.push(id);
        const indexInRight = this.ctt.wrongerAnswered.indexOf(id);

        if (indexInRight != -1) {
          this.ctt.rightAnswered.splice(indexInRight, 1);
        }
        this.saveInLocalStorage();
      }
    },
    toggleSeen(id: number) {
      if (!this.seen.includes(id)) {
        this.seen.push(id);
      } else {
        this.seen.splice(this.seen.indexOf(id), 1);
      }
      this.saveInLocalStorage();
    },
    saveInLocalStorage() {
      localStorage.setItem('rightAnsweredCTT', JSON.stringify(this.ctt.rightAnswered));
      localStorage.setItem('wrongerAnsweredCTT', JSON.stringify(this.ctt.wrongerAnswered));

      localStorage.setItem('rightAnsweredTTC', JSON.stringify(this.ttc.rightAnswered));
      localStorage.setItem('wrongerAnsweredTTC', JSON.stringify(this.ttc.wrongerAnswered));

      localStorage.setItem('seenTags', JSON.stringify(this.seen));
    },
    async loadAnswers() {
      return new Promise(resolve => {

        const rightAnsweredCityToTag = localStorage.getItem('rightAnsweredCTT');
        const wrongerAnsweredCityToTag = localStorage.getItem('wrongerAnsweredCTT');
        if (rightAnsweredCityToTag != null) {
          this.ctt.rightAnswered = JSON.parse(rightAnsweredCityToTag);
        }
        if (wrongerAnsweredCityToTag != null) {
          this.ctt.wrongerAnswered = JSON.parse(wrongerAnsweredCityToTag);
        }

        const rightAnsweredTagToCity = localStorage.getItem('rightAnsweredTTC');
        const wrongerAnsweredTagToCity = localStorage.getItem('wrongerAnsweredTTC');
        if (rightAnsweredTagToCity != null) {
          this.ctt.rightAnswered = JSON.parse(rightAnsweredTagToCity);
        }
        if (wrongerAnsweredTagToCity != null) {
          this.ctt.wrongerAnswered = JSON.parse(wrongerAnsweredTagToCity);
        }

        const seenTags = localStorage.getItem('seenTags');
        if (seenTags != null) {
          this.seen = JSON.parse(seenTags);
        }
        resolve('done');
      });
    }
  },
  getters: {}
})
