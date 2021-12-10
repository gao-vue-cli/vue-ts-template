<template>
  <div>
    <div id="mapDiv" ref="rootmap"></div>
    <!-- <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content" class="popup-content"></div>
    </div> -->

    <!-- <div class="t">点击我</div> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay';
import Point from 'ol/geom/Point';
import { fromLonLat, transform, toLonLat } from 'ol/proj';
import { defaults as defaultControls, FullScreen, ZoomSlider } from 'ol/control';
import { Icon, Stroke, Style, Circle, Fill, Text } from 'ol/style';
import { Vector as VectorSource, Cluster } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';

@Component({})
export default class About extends Vue {
  private map: any;
  private initMap() {
    const mapcontainer: any = this.$refs.rootmap;
    this.map = new Map({
      target: mapcontainer,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        // 地图缩放级别
        projection: 'EPSG:4326', // 使用这个坐标系
        center: [106.064839, 33.548857], // 深圳
        zoom: 5
      })
    });

    // 将弹窗添加到 map 地图中
  }
  private addPoint() {
    const lnglats = [
      [13150799.62389386, 2834221.515771012],
      [13153795.62389386, 2831226.515771622],
      [13152299.62389376, 2832221.515779022],
      [13151711.62389316, 2835221.51577102]
    ];
    const features: any[] = [];
    for (let i = 0; i < lnglats.length; i++) {
      features.push(
        new Feature({
          geometry: new Point(lnglats[i])
        })
      );
    }
    const source = new VectorSource({
      features
    });
    const clusterSource = new Cluster({
      distance: 0, // 这个是通过 distance 来控制两个点聚合的间距
      source
    });
    const styleCache: any = {};
    const clusters = new VectorLayer({
      source: clusterSource,
      style: (feature, resolution) => {
        const size = feature.get('features').length;
        let styles = styleCache[size];
        return (styles = [
          new Style({
            image: new Circle({
              radius: 10,
              stroke: new Stroke({
                color: '#fff'
              }),
              fill: new Fill({
                color: '#3399CC'
              })
            })
          })
        ]);
      }
    });
    this.map.addLayer(clusters);
  }
  private mounted() {
    this.initMap();
    this.addPoint();
  }
}
</script>

<style scoped lang="scss">
#mapDiv {
  width: 100%;
  height: 100%;
  position: absolute;
}
.t {
  position: absolute;
  width: 300px;
  height: 300px;
  // border: 1px solid red;
}
</style>
<style lang="scss" scoped>
html,
body {
  height: 100%;
}
#app {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: none;
  #map {
    height: 888px;
    min-height: calc(100vh - 50px);
  }
}
.ol-popup {
  position: absolute;
  background-color: white;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
}
.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: ' ';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.popup-content {
  width: 400px;
}
.ol-popup-closer:after {
  content: '✖';
}
</style>
