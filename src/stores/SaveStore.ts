import { defineStore } from "pinia";
import { toRaw } from "vue";

type saveData = {
  ctt: {
    rightAnswered: Array<number>
    wrongerAnswered: Array<number>
  }
  ttc: {
    rightAnswered: Array<number>
    wrongerAnswered: Array<number>,
  }
  seen: Array<number>
}

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
  } as saveData),
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
          this.ttc.rightAnswered = JSON.parse(rightAnsweredTagToCity);
        }
        if (wrongerAnsweredTagToCity != null) {
          this.ttc.wrongerAnswered = JSON.parse(wrongerAnsweredTagToCity);
        }

        const seenTags = localStorage.getItem('seenTags');
        if (seenTags != null) {
          this.seen = JSON.parse(seenTags);
        }
        resolve('done');
      });
    },
    triggerDownload(blob: Blob, filename: string) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    },
    exportSaveData() {
      const jsonString = JSON.stringify(toRaw(this.$state), null, 2);
      const blob = new Blob([jsonString], {type: 'application/json'});
      this.triggerDownload(blob, 'kftSave.sav');
    },
    importSaveData(saveData: saveData) {
      console.log(saveData);
      if (Object.keys(saveData).length == 3) {
        this.$state = saveData;
        this.saveInLocalStorage();
      } else {
        console.error('Wrong File');
      }
    }
  },
  getters: {}
})
