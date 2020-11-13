/**
 * 动画
 * @author 李志伟
 */

import React from 'react';
import {
  Map,
  Polyline,
  LineAnimation,
  GCJ02,
  LatLngType,
} from '@src/library/green-gis-js/src/index';
let amap = null;
let map = null;
export default class ParticleAnimationComponent extends React.Component {
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
    const polyline1 = new Polyline([
      [116.397411, 39.909186],
      [109.519, 18.271],
    ]);
    const polyline2 = new Polyline([
      [116.397411, 39.909186],
      [119.519, 18.271],
    ]);
    const polyline3 = new Polyline([
      [116.397411, 39.909186],
      [119.519, 48.271],
    ]);
    const polyline4 = new Polyline([
      [116.397411, 39.909186],
      [109.519, 48.271],
    ]);
    const animation1 = new LineAnimation(polyline1);
    const animation2 = new LineAnimation(polyline2);
    const animation3 = new LineAnimation(polyline3);
    const animation4 = new LineAnimation(polyline4);
    map.addAnimation(animation1);
    map.addAnimation(animation2);
    map.addAnimation(animation3);
    map.addAnimation(animation4);
    // 缩放级别要为整数，不然会出现点位每次重绘 位置都会变化的情况
    map.setView([116.391193, 39.907776], 5);
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
