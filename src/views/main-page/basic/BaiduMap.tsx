/**
 * 百度地图基础应用、以及投影变换的使用
 * @author 李志伟
 */

import React from 'react';
import {
  Map,
  Graphic,
  SimpleMarkerSymbol,
  Point,
  Polyline,
  SimpleLineSymbol,
  BD09,
  GCJ02,
  LatLngType,
} from '@src/library/green-gis-js/src/index';
let bmap = null;
let map = null;
export default class BasicComponent extends React.Component {
  componentDidMount() {
    bmap = new window['BMap'].Map(document.getElementById('amap'), {
      enableMapClick: false,
    });
    map = new Map('foo');
    map.on('extent', event => {
      bmap.centerAndZoom(new window['BMap'].Point(event.center[0], event.center[1]), event.zoom);
    });
    // 百度地图20级会出现点位每次重绘 位置都会变化的情况
    map.maxZoom = 19;
    // 投影变换要最早设置
    map.setProjection(new BD09(LatLngType.GPS));
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
    // 缩放级别要为整数，不然会出现点位每次重绘 位置都会变化的情况
    map.setView([116.391193, 39.907776], 12);
  }
  componentWillUnmount() {
    map.destroy();
    // 百度地图（webgl除外）没有销毁方法
    // bmap.destroy();
    bmap = null;
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