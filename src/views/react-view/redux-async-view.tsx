import * as React from "react";
import { connect } from "react-redux";
import { Card, Button } from "antd";

// @ts-ignore
@connect(state => ({ state: state[1] }))
export class ReduxAsyncView extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    startThunk() {
        this.props.dispatch(this.fakeThunkAjax());
    }
    fakeThunkAjax() {
        return async (dispatch) => {
            await console.log(111111);
            dispatch({
                type: 'REDUX_THUNK',
                thunkLoading: true,
                fakeThunkValue: 'Thunk请求中，请稍等...'
            });
            if(1 === 1) {
                setTimeout(() => {
                    dispatch({
                        type: 'REDUX_THUNK',
                        thunkLoading: false,
                        fakeThunkValue: 'Thunk请求成功了！'
                    });
                }, 1000);
            } else {
                dispatch({
                    type: 'REDUX_THUNK',
                    thunkLoading: false,
                    fakeThunkValue: 'Thunk发生未知错误...'
                });
            }
        }
    }

    startPromise() {
        this.props.dispatch(this.fakePromiseAjax("res"));
        // this.props.dispatch(this.fakePromiseAjax("rej"));
    }
    fakePromiseAjax(type: string) {
        if(type === "res") {
            return new Promise((resolve, reject) => {
                resolve({
                    type: 'REDUX_PROMISE',
                    promiseLoading: false,
                    fakePromiseValue: 'Promise请求成功'
                });
            })
        }
        return new Promise((resolve, reject) => {
            reject({
                type: 'REDUX_PROMISE',
                promiseLoading: false,
                fakePromiseValue: 'Promise请求失败，Redux-promise不会执行reject'
            });
        })
    }
    // 官方自定义的中间件示例
    logger = store => next => action =>{
        console.log('prev state',store.getState());
        console.log('dispatch',action);

        let result = next(action);

        console.log('next state',store.getState());

        return result;
    };
    render() {
        let {state} = this.props;
        return <>
            <h3>Redux异步实现及其原理</h3>
            <p>Redux store 仅支持同步数据流。使用 redux-thunk、redux-saga、redux-promise 等中间件可以帮助在 Redux 应用中实现异步性。</p>
            <p className={"g-text-mark"}>
                异步性：Redux state的更新机制，例如请求一个API，根据API的状态更新Redux。state值可为-请求中...-成功-失败。
                其实不使用这些中间件，也可以实现我们想要的结果。使用这些中间件，就是要遵守Redux的store规则。<br/>
                使用中间件的优点在于，dispatch不至于哪里都要去调用，dispatch只在其相关的store中调用，方便维护。防止程序员乱调用dispatch。
            </p>
            <h3>实现方法</h3>
            <div className={"g-flex-row"} style={{marginBottom: 10}}>
                <Card title="redux-thunk" style={{ width: "33%" }}>
                    Redux store.dispatch()方法的参数必须是一个Action描述对象，
                    react-thunk：中间件允许dispatch可以接受一个异步函数作为参数。
                    <p>Thunk异步请求值：{state.fakeThunkValue}</p>
                    <Button type="primary" onClick={() => this.startThunk()} loading={state.thunkLoading}>异步请求测试Thunk</Button>
                </Card>
                <Card title="redux-promise" style={{ width: "33%" }}>
                    react-promise：中间件允许dispatch可以接受一个promise对象作为参数。
                    <p>Promise异步请求值：{state.fakePromiseValue}</p>
                    <Button type="primary" onClick={() => this.startPromise()} loading={state.promiseLoading}>异步请求测试Promise</Button>
                </Card>
                <Card title="redux-sage" style={{ width: "33%" }}>
                    react-sage：中间件用于解决dispatch的异步回调问题，使dispatch的异步函数中可以使用ES6的Generator，
                    推荐使用ES7的async和await(它是Generator的语法糖，也是异步回调的最终方案)。
                </Card>
            </div>
            <h3>其它的一些中间件</h3>
            <div className={"g-flex-row"} style={{marginBottom: 10}}>
                <Card title="redux-logger" style={{ width: "33%" }}>
                    redux-logger：Redux state的每次更新会打印日志到console。
                    打开开发者工具可进行查看。
                </Card>
                <Card title="自定义中间件" style={{ width: "64%" }}>
                    自定义中间件需要遵循中间件规则，官方有一个示例代码，可作为参考。
                    `logger = store =&gt; next =&gt; action =&gt;`
                    &nbsp;&nbsp;这中间可以写自定义的处理代码...&nbsp;&nbsp;
                    let result = next(action);&nbsp;&nbsp;
                    return result;
                </Card>
            </div>
        </>
    }
}