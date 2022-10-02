import { computed, ref } from "vue";
import { defineStore } from "pinia";
import L from "leaflet";
import rocksList from "./rocks.json";

export const useRocksStore = defineStore("rocks", () => {
  const mapRegions = ref([
    {
      name: "Góry Sokole",
      bounds: { corner1: [50.871, 15.865], corner2: [50.8635, 15.872] },
    },
    {
      name: "Wzgórze Sokolik",
      bounds: { corner1: [50.871, 15.865], corner2: [50.869, 15.872] },
    },
    {
      name: "Krzyżna Góra",
      bounds: { corner1: [50.8655, 15.865], corner2: [50.8635, 15.872] },
    },
  ]);

  const selectedMapRegion = ref(0);
  const selectedMapRegionBounds = computed(() => {
    return L.latLngBounds(
      mapRegions.value[selectedMapRegion.value].bounds.corner1,
      mapRegions.value[selectedMapRegion.value].bounds.corner2
    );
  });

  const rocks = computed(() => {
    return rocksList
      .filter(isRockInRegion)
      .filter((rock) => rock.routes !== undefined);
  });

  function isRockInRegion(item) {
    let coordinate = item.geometry.coordinates;
    let res = L.GeoJSON.coordsToLatLngs(coordinate, 1)[0][0];
    return selectedMapRegionBounds.value.contains(res);
  }

  const selectedRocks = ref(new Set());

  const routes = computed(() => {
    return rocks.value
      .filter(
        (_, i) => selectedRocks.value.size === 0 || selectedRocks.value.has(i)
      )
      .flatMap(({ id, routes = [] }) =>
        routes.map((value) => Object.assign({ parentId: id }, value))
      );
  });

  return {
    mapRegions,
    selectedMapRegion,
    selectedMapRegionBounds,
    rocks,
    selectedRocks,
    routes,
  };
});
