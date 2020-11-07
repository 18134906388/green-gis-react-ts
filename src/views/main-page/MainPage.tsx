/**
 * 页面框架
 * @author 李志伟
 */
import React from 'react';
import './main-page.less';
import { PageHeader } from '@components/page-heaher/PageHeader';
import { PageAside } from '@components/page-aside/PageAside';
import { renderAllRoutes } from '@routes/route-loader';
import { Switch, RouteComponentProps } from 'react-router-dom';

/**
 * 路由参数 Props 类型声明
 */
interface RouterProps extends RouteComponentProps<any> {}

/**
 * 组件最终接收的所有 Props 类型声明
 */
type MainPageProps = RouterProps & {
  routes?: any;
};

export default class MainPage extends React.Component<MainPageProps> {
  constructor(props) {
    super(props);
  }
  render() {
    const routes = renderAllRoutes(this.props.routes);
    return (
      <div className="main-page">
        <PageHeader></PageHeader>
        <PageAside></PageAside>
        <div className="content">
          <Switch>{routes}</Switch>
        </div>
      </div>
    );
  }
}
