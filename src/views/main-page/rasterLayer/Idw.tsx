/**
 * IDW
 * @author 李志伟
 */

import React from 'react';
import {
  Map,
  FeatureClass,
  FeatureLayer,
  SimpleRenderer,
  Field,
  InverseDistanceWeight,
  RasterLayer,
  GeometryType,
  GCJ02,
  LatLngType,
} from '@src/library/green-gis-js/src/index';
let amap = null;
let map = null;
export default class IdwComponent extends React.Component {
  componentDidMount() {
    amap = new window['AMap'].Map('amap', {
      fadeOnZoom: false,
      navigationMode: 'classic',
      optimizePanAnimation: false,
      animateEnable: false,
      dragEnable: false,
      zoomEnable: false,
      resizeEnable: true,
      doubleClickZoom: false,
      keyboardEnable: false,
      scrollWheel: false,
      expandZoomRange: true,
      zooms: [1, 20],
      mapStyle: 'amap://styles/fresh',
      features: ['road', 'point', 'bg'],
      viewMode: '2D',
    });
    map = new Map('foo');
    map.on('extent', event => {
      amap.setZoomAndCenter(event.zoom, event.center);
    });
    // 投影变换要最早设置
    map.setProjection(new GCJ02(LatLngType.GPS));
    const req = new XMLHttpRequest();
    req.onload = event => {
      const featureClass = new FeatureClass(GeometryType.Polygon);
      featureClass.loadGeoJSON(JSON.parse(req.responseText));
      const featureLayer = new FeatureLayer();
      featureLayer.featureClass = featureClass;
      const renderer = new SimpleRenderer();
      featureLayer.renderer = renderer;
      featureLayer.zoom = [10, 20];

      const field = new Field();
      field.name = 'DEPTH';
      const idw = new InverseDistanceWeight();
      idw.honey = true;
      idw.honeySide = 10;
      idw.generate(featureClass, field);
      const rasterLayer = new RasterLayer();
      rasterLayer.raster = idw;
      map.addLayer(rasterLayer);
    };
    req.open('GET', '/public/geojson/sensor.json', true);
    req.send(null);
    // 缩放级别要为整数，不然会出现点位每次重绘 位置都会变化的情况
    map.setView([109.519, 18.271], 13);
  }
  componentWillUnmount() {
    map.destroy();
    amap.destroy();
    amap = null;
    map = null;
  }
  render() {
    return (
      <div className="map-content">
        <div id="foo" className="foo"></div>
        <div id="amap" className="amap"></div>
      </div>
    );
  }
}
