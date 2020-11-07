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
              <MailOutlined />
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
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="基本应用">
          <Menu.Item key="/mainPage/Basic">Basic</Menu.Item>
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
      </Menu>
    );
  }
}
