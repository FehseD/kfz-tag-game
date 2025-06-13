import { defineStore } from "pinia";

export type GameData = {
  id: number;
  tag: string,
  county: string,
  state: string,
  explanation: string
}

export const useGameDataStore = defineStore("dataGameStore", {
  state: () => ({
    data: [] as Array<GameData>
  }),
  actions: {
    async loadGameData() {
      const res = await fetch('./data.json');
      const data = await res.json();
      data.forEach((gameData: GameData, index: number) => {
        gameData.id = index;
      });
      this.data = data;
    },
  }
});
