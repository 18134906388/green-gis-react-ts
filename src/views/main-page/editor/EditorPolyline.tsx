/**
 * EditorPolyline
 * @author 李志伟
 */

import React from 'react';
import {
  Map,
  LatLngType,
  GCJ02,
  FeatureClass,
  FeatureLayer,
  SimpleRenderer,
  GeometryType,
  SimpleLineSymbol,
} from '@src/library/green-gis-js/src/index';
import { Button } from 'antd';
import './editor.less';
let amap = null;
let map = null;
export default class EditorPolylineComponent extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      editor: null,
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
    const req = new XMLHttpRequest();
    req.onload = event => {
      const featureClass = new FeatureClass(GeometryType.Point);
      featureClass.loadGeoJSON(JSON.parse(req.responseText));
      const featureLayer = new FeatureLayer();
      featureLayer.featureClass = featureClass;
      const renderer = new SimpleRenderer();
      const symbol = new SimpleLineSymbol();
      symbol.strokeStyle = '#008888';
      renderer.symbol = symbol;
      featureLayer.renderer = renderer;
      featureLayer.zoom = [13, 20];
      map.addLayer(featureLayer);

      const editor = map.editor;
      editor.start();
      editor.setFeatureLayer(featureLayer);
    };
    req.open('GET', '/public/geojson/pipe.json', true);
    req.send(null);
    // 投影变换要最早设置 editor暂时不能做点位偏移投影
    map.setProjection(new GCJ02(LatLngType.GCJ02));
    // 缩放级别要为整数，不然会出现点位每次重绘 位置都会变化的情况
    map.setView([109.519, 18.271], 17);
    this.setState({
      editor: map.editor,
    });
  }
  componentWillUnmount() {
    map.destroy();
    amap.destroy();
    amap = null;
    map = null;
  }
  handleClick(e) {
    switch (e) {
      case 'start':
        this.state.editor.start();
        break;
      case 'stop':
        this.state.editor.stop();
        break;
      case 'create':
        this.state.editor.create();
        break;
    }
  }
  render() {
    return (
      <div className="map-content">
        <div className="botton-box">
          <Button onClick={() => this.handleClick('start')}>start</Button>
          <Button onClick={() => this.handleClick('stop')}>stop</Button>
          <Button onClick={() => this.handleClick('create')}>create</Button>
        </div>
        <div id="foo" className="foo"></div>
        <div id="amap" className="amap"></div>
      </div>
    );
  }
}
