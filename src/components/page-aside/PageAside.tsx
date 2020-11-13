/**
 * 页面侧边栏
 * @author 李志伟
 */

import React from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import styles from './page-aside.module.less';
import history from '@store/history';

const { SubMenu } = Menu;
let menuData = {
  currentSelectedKeys: [],
  currentOpenKeys: [],
};
export class PageAside extends React.Component {
  handleClick = e => {
    menuData = {
      currentOpenKeys: e.keyPath,
      currentSelectedKeys: [e.key],
    };
    history.push(e.key);
  };

  render() {
    return (
      <Menu
        theme="dark"
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultOpenKeys={menuData.currentOpenKeys}
        selectedKeys={menuData.currentSelectedKeys}
        mode="inline"
        className={styles.pageAside}
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <AppstoreOutlined />
              <span>图形图层</span>
            </span>
          }
        >
          <Menu.ItemGroup key="g1" title="Graphic">
            <Menu.Item key="/mainPage/Graphic">Graphic</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="Feature">
            <Menu.Item key="3">Feature</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="切换底图">
          <Menu.Item key="/mainPage/Basic">在线高德</Menu.Item>
          <Menu.Item key="/mainPage/BaiduMap">在线百度</Menu.Item>
          <Menu.Item key="/mainPage/Tile">高德切片</Menu.Item>
          <Menu.Item key="/mainPage/TileOfflineZnv">离线ZNV地图</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" icon={<AppstoreOutlined />} title="渲染方式">
          <Menu.Item key="/mainPage/SimpleRenderer">简单渲染</Menu.Item>
          <Menu.Item key="/mainPage/CategoryRenderer">分类渲染</Menu.Item>
          <Menu.Item key="/mainPage/ClassRenderer">分级渲染</Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" icon={<AppstoreOutlined />} title="标注">
          <Menu.Item key="/mainPage/SimpleLabel">简单标注</Menu.Item>
          <Menu.Item key="/mainPage/DistanceCollision">简单碰撞冲突标注</Menu.Item>
          <Menu.Item key="/mainPage/CoverCollision">叠盖碰撞冲突标注</Menu.Item>
        </SubMenu>
        <SubMenu key="sub5" icon={<AppstoreOutlined />} title="点位聚合">
          <Menu.Item key="/mainPage/Cluster">点位聚合</Menu.Item>
        </SubMenu>
        <SubMenu key="sub6" icon={<AppstoreOutlined />} title="特殊符号">
          <Menu.Item key="/mainPage/LetterSymbol">字符符号</Menu.Item>
          <Menu.Item key="/mainPage/ArrowSymbol">箭头符号</Menu.Item>
          <Menu.Item key="/mainPage/CustomSymbol">自定义符号</Menu.Item>
        </SubMenu>
        <SubMenu key="sub7" icon={<AppstoreOutlined />} title="动画">
          <Menu.Item key="/mainPage/PointAnimation">点位扩散</Menu.Item>
          <Menu.Item key="/mainPage/LineAnimation">线条流动</Menu.Item>
          <Menu.Item key="/mainPage/ParticleAnimation">粒子环绕</Menu.Item>
        </SubMenu>
        <SubMenu key="sub8" icon={<AppstoreOutlined />} title="栅格">
          <Menu.Item key="/mainPage/Heat">热力图</Menu.Item>
          <Menu.Item key="/mainPage/Kriging">Kriging插值</Menu.Item>
          <Menu.Item key="/mainPage/Idw">IDW插值</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}
