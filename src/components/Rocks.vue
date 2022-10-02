<script setup>
import { ref } from "vue";
import { useRocksStore } from "../stores/rocks";
import ButtonList from "./ButtonList.vue";

const buttonListRef = ref(null);
const emit = defineEmits(["regionChange", "rockSelect"]);
const rockStore = useRocksStore();

function selectRegion(event) {
  rockStore.selectedMapRegion = event.target.options.selectedIndex;
  buttonListRef.value.reset();
  emit("regionChange");
}
</script>

<template>
  <div class="rocks-container">
    <div>
      <select class="region-select" @change="selectRegion($event)">
        <option v-for="item in rockStore.mapRegions">{{ item.name }}</option>
      </select>
    </div>
    <div class="rocks-buttons">
      <ButtonList
        ref="buttonListRef"
        :elements="rockStore.rocks.map((e) => e.properties.name)"
        @change="$emit('rockSelect', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.rocks-container {
  display: grid;
  overflow: hidden;
}
.region-select {
  min-width: 90%;
  background-image: linear-gradient(45deg, transparent 50%, var(--main-theme-color) 50%),
    linear-gradient(135deg, var(--main-theme-color) 50%, transparent 50%);
  background-position: calc(50% - 4px) calc(1em + 12px),
    calc(50% + 4px) calc(1em + 12px);
  background-size: 8px 8px, 8px 8px;
  background-repeat: no-repeat;
}
.rocks-buttons {
  overflow-y: scroll;
}
</style>
