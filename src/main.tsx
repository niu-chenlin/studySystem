import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import {Redirect, Route, Switch} from "react-router";
import {HashRouter, BrowserRouter} from "react-router-dom";
import MainView from "./views/main-view";
import {LoginView} from "./views/login-view/login-view";
import "./static/style.less";
import store from "./redux/store";
import {AuthorTool} from "./tools/author-tool";


export class AntdMain extends React.Component<any> {
    constructor(props: any) {
        super(props);
        AuthorTool.initAuthor();
    }
    componentDidMount(): void {

    }

    render() {
        return <Switch>
            {/*<Route path={'/auto'} exact render={() => {return <Redirect to={'/auto/login'}/>}}/>*/}
            <Route path={'/login'} exact render={() => {
                return <LoginView/>
            }}>
            </Route>
            <Route path={"/main"} render={()=>{ // replace 定位到一个页面后不能点击返回 goBack 不会往页面历史中增加
                if(!AuthorTool.getAuthor()) {
                    return <Redirect to={'/login'}/>
                }
                return (
                    // store 作为一个 prop 传给 Provider 组件，让其所有子组件都可以访问到store
                    // 原理是通过react context（上下文）实现的 本质上 Provider 就是给 connect 提供 store 用的
                    <Provider store={store}>
                        <MainView/>
                    </Provider>
                )
            }}/>
            <Route render={()=>{return <Redirect to={'/main'}/>}}/>
        </Switch>
    }
}

ReactDOM.render((
    <HashRouter>
        <AntdMain/>
    </HashRouter>
), document.getElementById('app-root'));


// BrowserRouter与HashRouter的区别
//    1.底层原理不一样：
//         BrowserRouter使用的是H5的history API，不兼容IE9及以下版本。
//         HashRouter使用的是URL的哈希值。
//     2.path表现形式不一样
//         BrowserRouter的路径中没有#,例如：localhost:3000/demo/test
//         HashRouter的路径包含#,例如：localhost:3000/#/demo/test
//     3.刷新后对路由state参数的影响
//         (1).BrowserRouter没有任何影响，因为state保存在history对象中。
//         (2).HashRouter刷新后会导致路由state参数的丢失！！！
//     4.备注：HashRouter可以用于解决一些路径错误相关的问题。