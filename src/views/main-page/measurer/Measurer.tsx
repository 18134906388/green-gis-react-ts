/**
 * Measurer
 * @author 李志伟
 */

import React from 'react';
import { Map, LatLngType, GCJ02 } from '@src/library/green-gis-js/src/index';
import { Button } from 'antd';
import './measurer.less';
let amap = null;
let map = null;
export default class MeasurerComponent extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      measurer: null,
    };
  }
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
    // 缩放级别要为整数，不然会出现点位每次重绘 位置都会变化的情况
    map.setView([116.391193, 39.907776], 17);
    this.setState({
      measurer: map.measurer,
    });
    map.measurer.measurePolyLine();
  }
  componentWillUnmount() {
    map.destroy();
    amap.destroy();
    amap = null;
    map = null;
  }
  handleClick(e) {
    switch (e) {
      case 'length':
        this.state.measurer.measurePolyLine();
        break;
      case 'area':
        this.state.measurer.measurePolygon();
        break;
      case 'clear':
        this.state.measurer.clear();
        break;
    }
  }
  render() {
    return (
      <div className="map-content">
        <div className="botton-box">
          <Button onClick={() => this.handleClick('length')}>length</Button>
          <Button onClick={() => this.handleClick('area')}>area</Button>
          <Button onClick={() => this.handleClick('clear')}>clear</Button>
        </div>
        <div id="foo" className="foo"></div>
        <div id="amap" className="amap"></div>
      </div>
    );
  }
}
