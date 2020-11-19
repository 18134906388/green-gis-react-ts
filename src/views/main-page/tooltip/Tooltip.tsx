/**
 * Tooltip
 * @author 李志伟
 */

import React from 'react';
import {
  Map,
  Point,
  Polyline,
  SimpleFillSymbol,
  FeatureClass,
  FeatureLayer,
  SimpleRenderer,
  CategoryRenderer,
  CategoryRendererItem,
  Field,
  FieldType,
  GeometryType,
  Graphic,
  SimpleMarkerSymbol,
  Feature,
  LatLngType,
  GCJ02,
} from '@src/library/green-gis-js/src/index';
let amap = null;
let map = null;
export default class TooltipComponent extends React.Component {
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
      const field = new Field();
      field.name = 'name';
      field.type = FieldType.String;
      const renderer = new CategoryRenderer();
      renderer.generate(featureClass, field);
      featureLayer.renderer = renderer;
      featureLayer.zoom = [5, 20];
      featureLayer.on('click', event => {
        console.log(event.feature.properties['name'], 'click');
      });
      featureLayer.on('mouseover', event => {
        map.showTooltip(event.feature, field);
        console.log(event.feature.properties['name'], 'mouse over');
      });
      featureLayer.on('mouseout', event => {
        console.log(event.feature.properties['name'], 'mouse out');
      });
      map.insertLayer(featureLayer, 0);
    };
    req.open('GET', '/public/geojson/beijing.json', true);
    req.send(null);
    // 缩放级别要为整数，不然会出现点位每次重绘 位置都会变化的情况
    map.setView([116.391193, 39.907776], 8);
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
