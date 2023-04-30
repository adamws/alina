<script setup>
import { reactive, ref, onMounted } from "vue";

const emit = defineEmits(["close"]);

</script>

<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        This is the default title!
        <button
          type="button"
          class="btn-close"
          @click="$emit('close')"
        >
          x
        </button>
      </header>
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
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    /* z-index needed to stay on top of leaflet elements */
    z-index: 10000;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header {
    display: flex;
    position: relative;
    padding: 15px;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }
</style>
