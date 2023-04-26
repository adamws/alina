<script setup>
import { computed, ref, watch } from "vue";
import { useRocksStore } from "../stores/rocks";
import { grades } from "../utils/grades.js";
import GradeSlider from "./GradeSlider.vue";
import ButtonList from "./ButtonList.vue";

const emit = defineEmits(["routeSelect"]);

const rockStore = useRocksStore();

const buttonListRef = ref(null);

const routes = computed(() => {
  return rockStore.routes.sort(
    (a, b) => grades.indexOf(b.difficulty) - grades.indexOf(a.difficulty)
  );
});

function gradeChange(value) {
  rockStore.selectedGrade = value;
  buttonListRef.value.reset();
}

function routeSelect(value) {
  if (value.size !== 0) {
    const index = value.entries().next().value[0];
    emit("routeSelect", routes.value[index]);
  } else {
    emit("routeSelect", {});
  }
}

watch(routes, () => {
  buttonListRef.value.reset();
});
</script>

<template>
  <div class="routes-container">
    <div class="grade-selection">
      <GradeSlider @update="gradeChange" />
    </div>
    <div class="routes-buttons">
      <ButtonList
        ref="buttonListRef"
        :elements="routes.map((e) => `${e.name} (${e.difficulty})`)"
        @change="routeSelect"
        singleSelect
      />
    </div>
  </div>
</template>

<style scoped>
.routes-container {
  display: grid;
  overflow: hidden;
}
.grade-selection {
  width: 90%;
  margin-left: 5%;
}
.routes-buttons {
  overflow-y: scroll;
}
</style>
