import { defineStore } from "pinia";

export type GameData = {
  id: number;
  tag: string,
  county: string,
  state: string,
  explanation: string
}

export type MapData = {
  id: number,
  data: Array<
    {
      lat: string,
      lon: string,
      geojson: {
        type: 'Point' | 'Polygon' | 'LineString' | 'MultiPolygon' | 'MultiLineString',
        coordinates:  Array<Array<Array<Array<number>>>>
      }
    }>
};


export const useGameDataStore = defineStore("dataGameStore", {
  state: () => ({
    data: [] as Array<GameData>,
    mapData: [] as MapData[],
  }),
  actions: {
    async loadMapData() {
      const res = await fetch('./mapData.json');
      this.mapData = await res.json();
    },
    async loadGameData() {
      const res = await fetch('./data.json');
      this.data = await res.json();
      await this.loadMapData();
    },
  }
});
