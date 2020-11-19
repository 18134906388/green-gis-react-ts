/**
 * FitBound
 * @author 李志伟
 */

import React from 'react';
import {
  Map,
  Polygon,
  SimpleFillSymbol,
  Graphic,
  LatLngType,
  GCJ02,
} from '@src/library/green-gis-js/src/index';
let amap = null;
let map = null;
export default class FitBoundComponent extends React.Component {
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
    const polygon = new Polygon([
      [
        [121.522385, 31.203909],
        [121.520404, 31.199115],
        [121.525937, 31.198011],
        [121.527444, 31.202803],
      ],
    ]);
    const symbol = new SimpleFillSymbol();
    const graphic = new Graphic(polygon, symbol);
    map.addGraphic(graphic);
    map.fitBound(polygon.bound);
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
