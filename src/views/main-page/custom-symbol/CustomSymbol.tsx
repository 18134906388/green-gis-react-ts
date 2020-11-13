/**
 * 自定义符号
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
function ShapeSymbol() {
  this.lineWidth = 2;
  this.strokeStyle = '#ff0000';
  this.fillStyle = '#ff000088';
  this.radius = 6;
  this.sides = 4;
}
ShapeSymbol.prototype.draw = function(ctx, screenX, screenY) {
  ctx.save();
  //keep size
  //地理坐标 转回 屏幕坐标
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.lineWidth = this.lineWidth;
  ctx.strokeStyle = this.strokeStyle;
  ctx.fillStyle = this.fillStyle;
  ctx.beginPath(); //Start path
  //ctx.arc(screenX, screenY, this.radius, 0, Math.PI * 2, true);
  ctx.moveTo(screenX, screenY - this.radius);
  for (let i = 1; i < this.sides; i++) {
    const rad = ((2 * Math.PI) / this.sides) * i;
    ctx.lineTo(screenX + this.radius * Math.sin(rad), screenY - this.radius * Math.cos(rad));
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};
ShapeSymbol.prototype.contain = function(anchorX, anchorY, screenX, screenY) {
  return (
    Math.sqrt(
      (anchorX - screenX) * (anchorX - screenX) + (anchorY - screenY) * (anchorY - screenY),
    ) <= this.radius
  );
};
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
    const symbol = new ShapeSymbol();
    symbol.strokeStyle = '#ffffff';
    symbol.fillStyle = '#ff0000';
    symbol.radius = 10;
    symbol.sides = 4;
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
