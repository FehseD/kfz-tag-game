<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        style="position: fixed; top: 1em; right: 1em"
        v-bind="activatorProps"
        icon="mdi-cog"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Dialog">
        <v-divider/>
        <v-card-text>
          Save Data
        </v-card-text>
        <v-card-item>
          <v-btn color="info" @click="saveStoreMethods.exportSaveData()">Export</v-btn>
        </v-card-item>
        <v-card-item>
          <v-file-input v-model="file" @change="uploadFile()" density="comfortable" label=".sav"/>
          <v-btn color="warning" @click="startImport()">Import</v-btn>
        </v-card-item>
        <v-card-text/>
        <v-divider/>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text="Close"
            @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { useSaveStore } from "@/stores/SaveStore";
import { ref, toRaw } from "vue";

const saveStoreMethods = useSaveStore();
const file = ref();
const fileData = ref();

function uploadFile() {
  const reader = new FileReader();
  reader.onload = (e) => {
    fileData.value = JSON.parse(e.target?.result as string);
  }
  reader.readAsText(file.value);
}

function startImport() {
  saveStoreMethods.importSaveData(toRaw(fileData.value));
}
</script>

<style scoped>

</style>
