import {
  GoogleMap,
  Marker,
  Polyline,
  Polygon,
  Rectangle,
  Circle,
  InfoWindow,
  CustomMarker,
  CustomControl,
  MarkerCluster
} from "vue3-google-map";

// Types
import type { App } from 'vue'

export default (app: App) => app
  .component('GoogleMap', GoogleMap)
  .component('Marker', Marker)
  .component('Polyline', Polyline)
  .component('Polygon', Polygon)
  .component('Rectangle', Rectangle)
  .component('Circle', Circle)
  .component('InfoWindow', InfoWindow)
  .component('CustomMarker', CustomMarker)
  .component('CustomControl', CustomControl)
  .component('MarkerCluster', MarkerCluster)
