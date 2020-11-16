import { Map } from '../map';
import { Subject } from '../util/subject';
/**
 * 瓦片地图的管理器
 * 已内置于map，可通过map的接口进行添加删除的维护操作
 */
export class Tile extends Subject {
  protected _container: HTMLDivElement;
  protected _map: Map;
  /**
   * 图层url
   */
  protected _url: string;
  /**
   * 图层url
   */
  get url(): string {
    return this._url;
  }
  /**
   * 图层url
   */
  set url(value: string) {
    this._url = value;
  }
  /**
   * 创建Tile
   * 不应自主创建，map内部创建
   * @param {Map} map - 地图容器
   */
  constructor(map: Map) {
    super(['mouseover', 'mouseout']); //when mouseover feature
    this._map = map;
    const container = map.container;
    //create canvas
    this._container = document.createElement('div');
    this._container.style.cssText = 'position: absolute; height: 100%; width: 100%; z-index: 80';
    container.appendChild(this._container);
    this._extentChange = this._extentChange.bind(this);
    this._map.on('extent', this._extentChange);
  }

  //与主视图同步
  _extentChange(event) {
    this.redraw();
  }

  /**
   * 重绘
   */
  redraw() {}

  /**
   * 销毁
   */
  destroy() {
    this._map.off('extent', this._extentChange);
  }
}
