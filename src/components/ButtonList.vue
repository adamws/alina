<script setup>
import { reactive } from "vue";

const props = defineProps({
  elements: Array[String],
  singleSelect: { type: Boolean, default: false },
});
const emit = defineEmits(["change"]);

const state = reactive({
  clickedButtons: new Set(),
});

function selectedRockClass(item) {
  return { active: state.clickedButtons.has(item) };
}

function click(item) {
  if (state.clickedButtons.has(item)) {
    state.clickedButtons.delete(item);
  } else {
    if (props.singleSelect) {
      state.clickedButtons.clear();
    }
    state.clickedButtons.add(item);
  }
  emit("change", state.clickedButtons);
}

const reset = () => {
  state.clickedButtons.clear();
  emit("change", state.clickedButtons);
};
defineExpose({ reset });
</script>

<template>
  <div>
    <li class="list-style-none" v-for="(item, index) in elements">
      <button
        class="button"
        :class="selectedRockClass(index)"
        @click="click(index)"
      >
        {{ item }}
      </button>
    </li>
  </div>
</template>

<style scoped>
.button {
  width: 90%;
  margin: 5px;
  border: 2px solid transparent;
}
.button:hover {
  border: 2px solid var(--accent-color);
}
.active {
  border: 2px solid var(--accent-color);
}
</style>
