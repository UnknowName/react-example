import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    PoweroffOutlined,
  } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Button} from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.min.css'

import { Routes, Route, Link} from "react-router-dom";

import EchoTime from '../sub/echoTime';
import UserLogin from '../login/login';
import { isLogin } from '../utils';


const { Header, Content, Footer, Sider } = Layout;
  
function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
}

// label 是显示在页面的内容，可以为React组件
const firstItem = <Link to="time">Test Link</Link>

const items = [
    {"label": firstItem, "key": "test", "icon": <UserOutlined />},
    {"label": <Link to="notfoud">LableName</Link>, "key": "lablkey", "icon": <PieChartOutlined />},
    {"label": "label2", "key": "lablkey2", "icon": <PieChartOutlined />},
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
      getItem('Tom', '3'),
      getItem('Bill', '4'),
      getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];


function handleClick(e) {
    console.log("click ", e, e.keyPath);
}

const HomeIndex = () => {
    const [collapsed, setCollapsed] = useState(false);
    
  /*
    if (! isLogin()) {
        return <UserLogin />
    }
    
  */

    return (
      <Layout style={{minHeight: '100vh',}}>

        <Sider collapsible collapsed={collapsed} defaultCollapsed={true} onCollapse={(value) => setCollapsed(value)}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['label']} mode="inline" items={items} onClick={handleClick} />
        </Sider>

        <Layout className="site-layout">
          <Header className="site-layout-background" style={{padding: 0}}>
            <span style={{float: "right"}}>
                <Button ghost shape="circle">
                    <UserOutlined />
                </Button>
            </span>
          </Header>

          <Content style={{margin: '0 16px'}}>
            <Breadcrumb style={{margin: '16px 0'}}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{padding: 24,minHeight: 360}}>
              <Routes>
                  <Route path='/' element={<NotFound />} />
                  <Route path='time' element={<EchoTime />} />
                  <Route path='test' element={<TestView />} />
                  {/* URL要同items里面的KEY相对应，这样点击不同菜单就加载不同页面，那这里可以使用函数能生成，读取menu的items*/}
                  <Route path='*' element={<NotFound />} />
              </Routes>
            </div>
          </Content>

          <Footer style={{textAlign: 'center'}}>
            2021 - 2022 &copy; UnknowName
          </Footer>
        </Layout>

      </Layout>
    );
};


function NotFound() {
    return (
      <div>
        404 Not Found
      </div>
    )
}


function TestView() {
  return (
    <h1>标题一</h1>
  )
}

export default HomeIndex;