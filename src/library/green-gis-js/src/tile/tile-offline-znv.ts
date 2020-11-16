import { Tile } from './tile';
/**
 * 离线地图
 * 已内置于map，可通过map的接口进行添加删除的维护操作
 */
export class TileOfflineZnv extends Tile {
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
    // 给8位字符串文件名补0
    function zeroFill(num, len, radix) {
      let str = num.toString(radix || 10);
      while (str.length < len) {
        str = '0' + str;
      }
      return str;
    }
    const getUrl = (url, x, y, z) => {
      const x1 = 'C' + zeroFill(x, 8, 16);
      const y1 = 'R' + zeroFill(y, 8, 16);
      const z1 = 'L' + zeroFill(z, 2, 10);
      return url
        .replace('{x}', x1.toUpperCase())
        .replace('{y}', y1.toUpperCase())
        .replace('{z}', z1.toUpperCase());
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
