- `features.json` obtained by exporting OSM data from openstreetmap
  and converting with https://tyrasd.github.io/osmtogeojson/
- `rocks.json` created from `features.json` with `jq`:
  `[.features[] | select(.properties.natural == "bare_rock")]`
