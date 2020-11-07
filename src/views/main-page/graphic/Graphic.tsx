/**
 * 经纬线
 * @author 李志伟
 */

import React from 'react';
import {
  Map,
  Point,
  Polyline,
  Graphic,
  SimpleLineSymbol,
  SimplePointSymbol,
  SimpleMarkerSymbol,
  GraphicLayer,
} from '@src/library/green-gis-js/src/index';

export default class GraphicComponent extends React.Component {
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

    //画经线
    const lngLayer = new GraphicLayer();
    map.addLayer(lngLayer);
    const lngSymbol = new SimpleLineSymbol();
    lngSymbol.strokeStyle = '#0000ff';
    for (let i = -180; i <= 180; i = i + 10) {
      const line = new Polyline([
        [i, -80],
        [i, 80],
      ]);
      const graphic = new Graphic(line, lngSymbol);
      lngLayer.add(graphic);
    }
    //画纬线
    const latLayer = new GraphicLayer();
    map.addLayer(latLayer);
    const latSymbol = new SimpleLineSymbol();
    latSymbol.strokeStyle = '#4d9221';
    for (let j = -80; j <= 80; j = j + 10) {
      const line = new Polyline([
        [-180, j],
        [180, j],
      ]);
      const graphic = new Graphic(line, latSymbol);
      latLayer.add(graphic);
    }
    //画经纬线交点
    const pointLayer = new GraphicLayer();
    map.addLayer(pointLayer);
    const pointSymbol = new SimplePointSymbol();
    pointSymbol.radius = 5;
    pointSymbol.fillStyle = '#de77ae';
    pointSymbol.strokeStyle = '#c51b7d';
    for (let i = -180; i <= 180; i = i + 10) {
      for (let j = -90; j <= 90; j = j + 10) {
        const point = new Point(i, j);
        const graphic = new Graphic(point, pointSymbol);
        pointLayer.add(graphic);
      }
    }
    map.setView([0, 0], 3);
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
