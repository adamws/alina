<script setup>
import { reactive, ref, onMounted } from "vue";

const emit = defineEmits(["close"]);
</script>

<template>
  <div id="modal-backdrop" class="modal-backdrop">
    <button type="button" class="btn-close" @click="$emit('close')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
    <div class="map modal" role="dialog">
      <p>
        Celem Aliny jest pomoc w wyszukiwaniu dróg wspinaczkowych o danej
        trudności w wybranym rejonie.
      </p>
      <p>
        Alina nie zastępuje przewodnika, kóry przedstawia dokładny przebieg
        dróg.
      </p>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  /* z-index needed to stay on top of leaflet elements */
  z-index: 10000;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  width: 50%;
  height: auto;
  margin: auto;
}
@media (max-width: 440px) {
  .modal {
    width: 85%;
  }
}

.btn-close {
  position: absolute;
  top: 30px;
  right: 10px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-color: #ffffff;
  border: none;
  padding: 8px 0;
}
</style>
