/**
 * 高德地图基础应用、以及投影变换的使用
 * @author 李志伟
 */

import React from 'react';
import {
  Map,
  Graphic,
  SimpleMarkerSymbol,
  Point,
  Polyline,
  Polygon,
  SimpleLineSymbol,
  SimpleFillSymbol,
  BD09,
  GCJ02,
  LatLngType,
} from '@src/library/green-gis-js/src/index';
let amap = null;
let map = null;
export default class BasicComponent extends React.Component {
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
      // event.center为偏移后的高德坐标
      amap.setZoomAndCenter(event.zoom, event.center);
    });
    // 投影变换要最早设置
    map.setProjection(new GCJ02(LatLngType.GPS));
    const marker = new SimpleMarkerSymbol();
    marker.width = 32;
    marker.height = 32;
    marker.offsetX = -16;
    marker.offsetY = -32;
    marker.url = require('@src/assets/images/marker.svg').default;
    // await marker.load();
    // 天安门84坐标 116.391193, 39.907776
    // 天安门高德坐标 116.397437, 39.90918
    const point = new Point(116.391193, 39.907776);
    const graphic = new Graphic(point, marker);
    map.addGraphic(graphic);

    const start = 115.397411,
      end = 116.397411;
    const polyline1 = new Polyline([
      [start, 39.909186],
      [end, 39.909186],
    ]);
    const symbol1 = new SimpleLineSymbol();
    symbol1.strokeStyle = '#ff00ff';
    const graphic1 = new Graphic(polyline1, symbol1);
    map.addGraphic(graphic1);

    const lnglats = [];
    for (let lng = start; lng <= end; lng = lng + 0.01) {
      lnglats.push([lng, 39.909186]);
    }
    lnglats.push([end, 39.909186]);
    const polyline2 = new Polyline(lnglats);
    const symbol2 = new SimpleLineSymbol();
    symbol2.strokeStyle = '#000000';
    const graphic2 = new Graphic(polyline2, symbol2);
    map.addGraphic(graphic2);

    const polygon = new Polygon([
      [
        [116.326, 39.8969],
        [116.3342, 39.8975],
        [116.3466, 39.8982],
        [116.3548, 39.901],
        [116.3576, 39.8989],
        [116.396, 39.9003],
        [116.3988, 39.8893],
        [116.3988, 39.8728],
        [116.3933, 39.8721],
        [116.3809, 39.8714],
        [116.3507, 39.8694],
        [116.3493, 39.8742],
        [116.3452, 39.8735],
        [116.3425, 39.8763],
        [116.3205, 39.8749],
        [116.3219, 39.8831],
        [116.3246, 39.8852],
        [116.3246, 39.89],
        [116.326, 39.89],
        [116.326, 39.8969],
      ],
    ]);
    const symbol3 = new SimpleFillSymbol();
    const graphic3 = new Graphic(polygon, symbol3);
    map.addGraphic(graphic3);
    // 缩放级别要为整数，不然会出现点位每次重绘 位置都会变化的情况
    map.setView([116.391193, 39.907776], 12);
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
