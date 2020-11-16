import { Tile } from './tile';
/**
 * 瓦片地图的管理器
 * 已内置于map，可通过map的接口进行添加删除的维护操作
 */
export class TileGaode extends Tile {
  /**
   * 重绘
   */
  redraw() {
    if (!this._url) return;
    const lngLat2Tile = (lng, lat, z) => {
      const tileX = Math.floor(((lng + 180) / 360) * Math.pow(2, z));
      const tileY = Math.floor(
        (1 / 2 -
          Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) /
            (2 * Math.PI)) *
          Math.pow(2, z),
      );
      return [tileX, tileY];
    };
    const lngLat2Pixel = (lng, lat, z) => {
      const pixelX = Math.floor((((lng + 180) / 360) * Math.pow(2, z) * 256) % 256);
      const pixelY = Math.floor(
        ((1 -
          Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) /
            (2 * Math.PI)) *
          Math.pow(2, z) *
          256) %
          256,
      );
      return [pixelX, pixelY];
    };
    const getUrl = (url, x, y, z) => {
      return url
        .replace('{x}', x)
        .replace('{y}', y)
        .replace('{z}', z);
    };
    const projection = this._map.projection;
    const extent = this._map.extent;
    const zoom = this._map.zoom;
    const [lng1, lat1] = projection.unproject([extent.xmin, extent.ymax]);
    const [lng2, lat2] = projection.unproject([extent.xmax, extent.ymin]);
    const [tileMinX, tileMinY] = lngLat2Tile(lng1, lat1, zoom);
    const [tileMaxX, tileMaxY] = lngLat2Tile(lng2, lat2, zoom);
    const [pixelX, pixelY] = lngLat2Pixel(lng1, lat1, zoom);

    this._container.innerHTML = '';

    for (let x = tileMinX; x <= tileMaxX; x++) {
      for (let y = tileMinY; y <= tileMaxY; y++) {
        const url = getUrl(this._url, x, y, zoom);
        const tile: any = document.createElement('img');
        tile.alt = '';
        tile.setAttribute('role', 'presentation');
        tile.style.width = '256px';
        tile.style.height = '256px';
        tile.style.position = 'absolute';
        tile.src = url;
        tile.style.left = -pixelX + (x - tileMinX) * 256 + 'px';
        tile.style.top = -pixelY + (y - tileMinY) * 256 + 'px';
        this._container.appendChild(tile);
      }
    }
  }
}
