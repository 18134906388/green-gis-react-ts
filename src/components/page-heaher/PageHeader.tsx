/**
 * 页面头部
 * @author 李志伟
 */

import React from 'react';
import styles from './page-heaher.module.less';

export class PageHeader extends React.Component {
  render() {
    return (
      <div className={styles.header}>
        <span className={styles.title}>green-gis-react-ts</span>
      </div>
    );
  }
}
