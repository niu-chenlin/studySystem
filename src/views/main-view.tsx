import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Route, RouteComponentProps, Switch, withRouter} from "react-router";
import {Layout, Menu, Breadcrumb, Button, Spin} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
import { ShowMenuActionCreator } from '../redux/actions/MenuActionCreator';
import MenuContainer from "../containers/menu/menu-container";
import {LoginView} from "./login-view/login-view";
import {ReduxView} from "./react-view/redux-view";
import {AboutView} from "./about-view/about-view";
import {ROUTER} from "../routers";
import {changeViewLoading} from "../redux/actions/ViewActionCreator";
// import {Test} from "../containers/menu/test";
// import {LoginView} from "./login-view/login-view";
const mapStateToProps = (state, ownProps) => {
    // connect的第一个参数，作用是把store复制到组件的props中，组件内部就可以就使用this.props[store]来直接访问redux数据。可用来摘取想要的信息
    // 当 state 变化，或者 ownProps 变化的时候，mapStateToProps 都会被调用，计算出一个新的 stateProps，（在与 ownProps merge 后）更新给组件。
    console.log(state); // store的数据
    console.log(ownProps); // 组件自己的props
    return {state}; // 返回一个对象，否则state将直接赋值在this.props中。此处就是this.props.state
}
const mapDispatchToProps = (dispatch, ownProps) => { // 用来建立UI组件的参数到store.dispatch方法的映射
    // return {
    //     testClick: (...args) => dispatch(ShowMenuActionCreator(...args)) // 通过this.props,testClick({action}) 即可，缺点时只能调用单个action
    // }
    // return {
    //     resetMenuClick: ()=> dispatch(ShowMenuActionCreator()), // 在组件内部就不用通过this.props.dispatch()来调用， 直接使用this.reset...
    // }
    // 用于建立组件跟store.dispatch的映射关系,可以是一个object，也可以传入函数
    // 如果mapDispatchToProps是一个函数，它可以传入dispatch,ownProps, 定义UI组件如何发出action，实际上就是要调用dispatch这个方法
    return bindActionCreators({
        increase: ShowMenuActionCreator,
        decrease: ShowMenuActionCreator,
        changeViewLoading: changeViewLoading
    }, dispatch);
}
// bindActionCreators源码
// function bindActionCreators(actionCreators,dispatch) {
//     let obj = {};
//     for(let i in actionCreators) {
//         obj[i] = function() {
//             dispatch(actionCreators[i]);
//         }
//     }
//     return obj;
// }
// 使用Provider容器组件和connect方法  Provider可以理解为一个容器组件，使store可连接  connect可以理解为一个高阶组件（以组件为参数，生成另外的组件）
// TypeScript 2.6支持在.ts文件中通过在报错一行上方使用// @ts-ignore来忽略错误。
// @ts-ignore
@connect(mapStateToProps, mapDispatchToProps)
class MainView extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            collapsed: false
        }
    }
    componentDidMount() {
        console.log('----------------');
        console.log(this);
        console.log(this.context);
        // this.props.changeViewLoading(true);
        // setTimeout(() => {
        //     // this.props.display(changeViewLoading(false));
        //     this.props.changeViewLoading(false);
        // }, 1000);
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };
    renderRoute(routeArr) {
        return routeArr.map(route => {
            if(route.children) {
                return this.renderRoute(route.children);
            } else { // component={route.component}
                return <Route
                    key={route.key}
                    path={"/main/" + route.key}
                    exact={route.exact}
                    render={(props) => {
                        // console.log(1111111111);
                        // console.log(route.component);
                        // if(route.component) {
                        //     route.component.props = {...props}
                        // }
                        return route.component
                    }}
                />
            }
        });
    }
    render() {
        let {state} = this.props;
        return <div className={'App'}>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo">
                        <MenuContainer menuList={state[0]}/>
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
                            padding: '10px 15px 0 15px',
                            minHeight: 280,
                            position: 'relative'
                        }}>
                        <div className={"g-modal-mask"} style={{display: state[1].loading ? "block" : "none"}}>
                            <Spin className={"g-spin"} size="large" tip="Loading..."/>
                        </div>
                        {this.renderRoute(state[0])}
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
