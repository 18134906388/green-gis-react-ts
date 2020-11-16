/**
 * 字符符号
 * @author 李志伟
 */

import React from 'react';
import {
  Map,
  Point,
  Graphic,
  LetterSymbol,
  GCJ02,
  LatLngType,
} from '@src/library/green-gis-js/src/index';
let amap = null;
let map = null;
export default class LetterSymbolComponent extends React.Component {
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
    const symbol = new LetterSymbol();
    symbol.strokeStyle = '#ffffff';
    symbol.fillStyle = '#ff0000';
    symbol.fontColor = '#ffffff';
    symbol.fontSize = 12;
    symbol.radius = 10;
    symbol.letter = 'A';
    const point = new Point(116.391193, 39.907776);
    const graphic = new Graphic(point, symbol);
    map.addGraphic(graphic);
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