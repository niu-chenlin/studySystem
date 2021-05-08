import {applyMiddleware, compose, createStore} from 'redux'
import reducers from "./reducers";
import reduxLogger from "redux-logger";
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise";

/**
 * store 通过reducers创建redux单一数据源
 * 创建的过程可以通过设置applyMiddleware1参数实现redux的中间件加载
 * 通过中间件我们就可以在这途中对 action 进行截获，并进行改变。
 * redux中间件：
 * Redux store 仅支持同步数据流。使用 redux-thunk、redux-saga、redux-promise 等中间件可以帮助在 Redux 应用中实现异步性。
 * redux-thunk：可以让我们dispatch一个函数，而不只是普通的 Object
 * redux-promise：允许action是一个promise 原理：如果action是一个promise，则会等待promise完成，将完成的结果作为action触发，如果action不是一个promise，则判断其payload是否是一个promise，如果是，等待promise完成，然后将得到的结果作为payload的值触发。
 * redux-saga：用于解决redux实现异步操作的同时解决异步回调问题（使用 es6 Generator），不建议使用，我们为什么不能在thunk或者promise的前提下使用异步终极解决方案（es7 的async和await）呢？尝试一下吧！去吧追码少年！
 * 中间件一般都有”熔断“行为，会判断是否执行下一个中间件
 */
const store = createStore(
    reducers, // 第一个参数为redux的reducer(store的处理方法)
    // applyMiddleware(reduxPromise, reduxThunk, reduxLogger) // 峰哥的建议是吧logger日志中间件写在最后面，具体原因需要你去了解一下中间件的执行机制
); // 使用reducer创建store //内部会第一次调用reducer函数，得到初始state
export default store;



// createStore默认同步更新state 可使用给createStore增加参数实现redux异步更新state操作：过一段时间再执行 Reducer，这就是异步。
// 怎么才能 Reducer 在异步操作结束后自动执行呢？这就要用到新的工具：中间件（middleware）。
// applyMiddlewares Redux 的原生方法，作用是将所有中间件组成一个数组，依次执行。下面是它的源码。

function applyMiddleware1(...middlewares) { // redux applyMiddleware源码实现
    return (createStore) => (reducer, preloadedState, enhancer) => {
        var store = createStore(reducer, preloadedState, enhancer);
        var dispatch = store.dispatch;
        var chain = [];
        var middlewareAPI = {
            getState: store.getState,
            dispatch: (action) => dispatch(action)
        }
        chain = middlewares.map(middleware => middleware(middlewareAPI));
        dispatch = compose(...chain)(store.dispatch);
        return {...store, dispatch}
    }
}
