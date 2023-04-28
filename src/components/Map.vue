<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRocksStore } from "../stores/rocks";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Rocks from "./Rocks.vue";
import Routes from "./Routes.vue";

const defultView = ref([50.867, 15.8682]);

const rockStore = useRocksStore();

const state = reactive({
  map: {},
  highlightLayer: {},
});

function rockSelect(rockSet) {
  state.highlightLayer.clearLayers();
  rockSet.forEach((index) => {
    const rock = rockStore.rocks[index];
    if (rock !== undefined) {
      state.highlightLayer.addData(rock);
    }
  });
  rockStore.selectedRocks = rockSet;
}

function routeSelect(route) {
  if (Object.keys(route).length !== 0) {
    const rock = rockStore.rocks.find((e) => e.id === route.parentId);
    const latLngs = rock.geometry.coordinates[0].map((v) =>
      L.latLng(v[1], v[0])
    );
    const popupPosition = L.latLngBounds(latLngs).getCenter();
    L.popup({ autoClose: true, closeButton: false })
      .setLatLng(popupPosition)
      .setContent(
        `<p><b>${rock.properties.name}</b><br/>
        ${route.name} - ${route.difficulty}<br/>
        str. ${route.properties.page}</p>`
      )
      .openOn(state.map);
  } else {
    state.map.closePopup();
  }
}

function updateMap() {
  state.map.fitBounds(rockStore.selectedMapRegionBounds);
}

function setupMap() {
  state.map = L.map("map", { scrollWheelZoom: false }).setZoom(16);
  updateMap();
  var tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(state.map);
  state.highlightLayer = L.geoJSON().addTo(state.map);
}

function addHelpButton() {
  const HelpControl = L.Control.extend({
    options: {
      position: "topright",
    },

    onAdd: function (map) {
      const container = L.DomUtil.create("div", "leaflet-bar leaflet-control");
      const a = L.DomUtil.create("a", "leaflet-control-custom", container);
      const span = L.DomUtil.create("span", "", a);

      span.innerHTML = "?";

      // don't let double clicks and mousedown get to the map
      L.DomEvent.addListener(a, 'dblclick', L.DomEvent.stop);
      L.DomEvent.addListener(a, 'mousedown', L.DomEvent.stop);
      L.DomEvent.addListener(a, 'mouseup', L.DomEvent.stop);

      L.DomEvent.on(a, "click", function () {
        console.log("button clicked");
      });

      return container;
    },
  });

  state.map.addControl(new HelpControl());
}

onMounted(() => {
  setupMap();
  addHelpButton();
});
</script>

<template>
  <div id="map" class="map"></div>
  <Rocks class="left" @region-change="updateMap" @rock-select="rockSelect" />
  <Routes class="right" @route-select="routeSelect" />
</template>

<style scoped></style>
