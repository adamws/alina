<script setup>
import { reactive, ref } from "vue";
import Slider from "@vueform/slider";
import { grades } from "../utils/grades.js";

const state = reactive({
  value: [0, grades.length - 1],
});
const emit = defineEmits(["update"]);

// change of low limit can already push high limit (handled by Slider component),
// need to handle case where new high limit is lower than current low limit:
function highLimitCallback(event) {
  if (event.target.value < state.value[0]) {
    state.value[0] = event.target.value;
  }
}
</script>

<template>
  <div class="container">
    <select v-model="state.value[0]" class="grade left">
      <option v-for="(grade, index) in grades" :value="index">
        {{ grade }}
      </option>
    </select>
    <Slider
      :min="0"
      :max="grades.length - 1"
      :lazy="false"
      :tooltips="false"
      v-model="state.value"
      @update="$emit('update', $event)"
      class="slider hidden-mobile"
    />
    <div class="slider-mobile"></div>
    <select
      v-model="state.value[1]"
      @change="highLimitCallback($event)"
      class="grade right"
    >
      <option v-for="(grade, index) in grades" :value="index">
        {{ grade }}
      </option>
    </select>
  </div>
</template>

<style src="@vueform/slider/themes/default.css"></style>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 65px 1fr 65px;
  grid-template-areas: "left slider right";
}
.grade {
  padding: 0.6em 0 !important;
}
.grade.left {
  grid-area: left;
}
.grade.right {
  grid-area: right;
}
.slider {
  --slider-connect-bg: var(--main-theme-color);
  --slider-handle-ring-color: #ef444430;
  top: 17px;
  margin-left: 10px;
  margin-right: 10px;
  grid-area: slider;
}
.slider-mobile {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 17px;
  border-top: 3px solid var(--main-theme-color);
  margin-bottom: 20px;
  border-bottom: 3px solid var(--main-theme-color);
  border-radius: 3px;
  grid-area: slider;
}
@media (max-width: 440px) {
  .slider {
    display: none !important;
  }
}
@media (min-width: 441px) {
  .slider-mobile {
    display: none !important;
  }
}
</style>
