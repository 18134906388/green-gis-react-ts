/**
 * 简单标注
 * @author 李志伟
 */

import React from 'react';
import {
  Map,
  GCJ02,
  LatLngType,
  Point,
  Polyline,
  SimpleFillSymbol,
  FeatureClass,
  FeatureLayer,
  SimpleRenderer,
  CategoryRenderer,
  CategoryRendererItem,
  Field,
  Label,
  Tooltip,
  NullCollision,
  FieldType,
  Graphic,
  SimpleMarkerSymbol,
  Feature,
  SimpleTextSymbol,
  GeometryType,
} from '@src/library/green-gis-js/src/index';

export default class SimpleLabelComponent extends React.Component {
  componentDidMount() {
    const amap = new window['AMap'].Map('amap', {
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
    const map = new Map('foo');
    map.on('extent', event => {
      amap.setZoomAndCenter(event.zoom, event.center);
    });
    // 投影变换要最早设置
    map.setProjection(new GCJ02(LatLngType.GPS));
    const req = new XMLHttpRequest();
    req.onload = event => {
      const featureClass = new FeatureClass(GeometryType.Point);
      featureClass.loadGeoJSON(JSON.parse(req.responseText));
      const featureLayer = new FeatureLayer();
      featureLayer.featureClass = featureClass;
      const field2 = new Field();
      field2.name = 'NAME';
      field2.type = FieldType.String;
      const renderer = new CategoryRenderer();
      renderer.generate(featureClass, field2);
      featureLayer.renderer = renderer;
      const label = new Label();
      const symbol = new SimpleTextSymbol();
      symbol.pointSymbolWidth = 12; //diameter
      symbol.pointSymbolHeight = 12; //diameter
      symbol.auto = true;
      /*symbol.offsetX = 0;  //
        symbol.offsetY = 6;  //radius
        symbol.placement = "BOTTOM";*/
      /*symbol.offsetX = 0;  //
        symbol.offsetY = -6;  //-radius
        symbol.placement = "TOP";*/
      /*symbol.offsetX = 6;  //radius
        symbol.offsetY = 0;  //
        symbol.placement = "RIGHT";*/
      /*symbol.offsetX = -6;  //radius
        symbol.offsetY = 0;  //
        symbol.placement = "LEFT";*/
      label.field = field2;
      label.symbol = symbol;
      label.collision = new NullCollision();
      featureLayer.label = label;
      featureLayer.labeled = true;
      featureLayer.zoom = [12, 20];
      map.addLayer(featureLayer);

      map.setView([109.519, 18.271], 13);
    };
    req.open('GET', '../src/assets/geojson/junction.json', true);
    req.send(null);
    // 缩放级别要为整数，不然会出现点位每次重绘 位置都会变化的情况
    map.setView([109.519, 18.271], 14);
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
