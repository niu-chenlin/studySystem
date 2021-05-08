import * as React from "react";
import { connect } from 'react-redux';
import {Route, RouteComponentProps, withRouter} from "react-router";
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
import { ShowMenuActionCreator } from '../redux/actions/MenuActionCreator';
import {MenuContainer} from "../containers/menu/menu-container";
// import {Test} from "../containers/menu/test";
// import {LoginView} from "./login-view/login-view";

// 使用Provider容器组件和connect方法  Provider可以理解为一个容器组件，使store可连接  connect可以理解为一个高阶组件（以组件为参数，生成另外的组件）
// @ts-ignore
@connect(state => ({ state }), {  })
class MainView extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            collapsed: false
        }
        console.log('-----------111');
        console.log(this.props);
        console.log(this.context);
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };
    render() {
        return <div className={'App'}>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo">
                        <MenuContainer menuList={this.props.state[0]}></MenuContainer>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1" icon={<PieChartOutlined />}>
                                Option 1
                            </Menu.Item>
                            <Menu.Item key="2" icon={<DesktopOutlined />}>
                                Option 2
                            </Menu.Item>
                            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                                <Menu.Item key="3">Tom</Menu.Item>
                                <Menu.Item key="4">Bill</Menu.Item>
                                <Menu.Item key="5">Alex</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                                <Menu.Item key="6">Team 1</Menu.Item>
                                <Menu.Item key="8">Team 2</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="9" icon={<FileOutlined />}>
                                Files
                            </Menu.Item>
                        </Menu>
                    </div>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background">
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                            style: {
                                fontSize: '25px',
                                verticalAlign: 'middle'
                            }
                        }
                        )}
                    </Header>
                    <Content className="site-layout-background"
                        style={{
                            margin: '15px 15px 0 15px',
                            padding: 20,
                            minHeight: 280
                        }}>
                        <Button type="link">Link Button</Button>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                            padding: '10px 50px',
                            // background: '#f0f2f5',
                            fontSize: 16
                        }}>sean知识体系 ©2021 Created by Sean</Footer>
                </Layout>
            </Layout>
        </div>
    }
}

export default withRouter(MainView);

// withRouter是一个高阶组件 作用是使用<Router>包装一个普通组件，
// 然后react-router的三个对象history, location, match就会被放进这个组件的props属性中 实现方法：
// <Router conponent=MainView>
// 这里我们主要做Router的一种传递
