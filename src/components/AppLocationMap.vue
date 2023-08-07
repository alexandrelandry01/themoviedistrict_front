<template>
    <div id="mapView">
      <l-map ref="map" v-model:zoom="zoom" :center="formatCoordinates(locationInstance.address.coordinates)">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
        <l-marker :key="locationInstance.id" :lat-lng="formatCoordinates(locationInstance.address.coordinates)">
            <l-popup>{{ (locationInstance.address.houseNumber === null ? '' : locationInstance.address.houseNumber) }} {{ locationInstance.address.streetName + ', ' +
                        locationInstance.address.city + ', ' + locationInstance.address.territory + ', ' + 
                        locationInstance.address.country }}</l-popup>
        </l-marker>
      </l-map>
    </div>
  </template>
  
  <script>
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
  
  export default {
    props: {
        locationInstance: Object
    },
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LPopup
    },
    data() {
      return {
        zoom: 16,
        markers: [
            {
                id: 1,
                coords: [32.25434574584535, -101.47147141204873]
            }
        ]
      };
    },
    methods: {
        formatCoordinates(stringValue) {
            if (stringValue !== null && stringValue !== '' && (typeof stringValue !== 'undefined')) {
                return stringValue.split(",").map(Number);
            }
        }
    }
  };
  </script>
  
<style scoped>
#mapView {
    height: 350px;
    width: 350px;
}

@media (max-width: 620px) {
    #mapView {
        height: 250px;
        width: 250px;
    }
}

@media (max-width: 480px) {
    #mapView {
        height: 200px;
        width: 200px;
    }
}

@media (max-width: 412px) {
    #mapView {
        height: 155px;
        width: 155px;
    }
}
</style>