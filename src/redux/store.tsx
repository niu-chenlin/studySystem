import {applyMiddleware, compose, createStore} from 'redux'
import reducers from "./reducers";
import axios from "axios";
import reduxLogger from "redux-logger";
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise";
import reduxSaga from "redux-saga";
import MenuState from "./state/MenuState";
import MenuReducers from "./reducers/menuReducers";

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
    // MenuReducers, // 第一个参数为redux的reducer(store的处理方法)
    reducers,
    // MenuState // 第二个参数为默认State，前提是不使用combineReducers，如果是使用combineReducers，建议在Reducers中写默认值 (state = {}, action)
    // applyMiddleware(reduxPromise, reduxThunk, reduxLogger) // 峰哥的建议是吧logger日志中间件写在最后面，具体原因需要你去了解一下中间件的执行机制
    applyMiddleware(reduxThunk, reduxPromise, reduxLogger)
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

function code_compose() { // compose方法源码
    for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
        funcs[_key] = arguments[_key];
    }
    if (funcs.length === 0) {
        return function (arg) {
            return arg;
        };
    }
    //如果长度为1，返回该函数
    if (funcs.length === 1) {
        return funcs[0];
    }
    //核心语句reduce嵌套执行所有的函数最后返回一个最终函数
    return funcs.reduce(function (a, b) {
        return function () {
            return a(b.apply(undefined, arguments));
        };
    });
}

function f1(next) { // compose的作用类似这样 循环依次调用
    return function() {
        console.log('f1 start')
        next()
        console.log('f1 end')
    }
}
function f2(next) {
    return function() {
        console.log('f2 start')
        next()
        console.log('f2 end')
    }
}
function f() {
    console.log('heart')
}
f1(f2(f))() //所以最后的综合逻辑函数就是类似这种M1(M2(dispatch))(action)

// 正常情况下dispatch的参数只能是一个Action对象，如果我们使用Action对象实现异步的情况下，需要调用三次dispatch。
// UI中：请求开始 dispatch({type: ajax, status: 'start'})
// UI中：请求完成 dispatch({type: ajax, status: 200})
// UI中：请求错误 dispatch({type: ajax, status: 500})
// 下面介绍一下redux-thunk，当我们使用thunk中间件时，它允许dispatch的参数可以是一个异步函数，例如：
// thunk 例子
function test_thunk() {
    let store = null; // 假设此处是真的store数据源
    store.dispatch(test_ajax());
    // 异步请求函数
    function test_ajax() {
        return (dispatch) => {
            dispatch({
                type: 'TEXT',
                payLoad: 'titile starting.........'
            });
            axios('url').then(res => {
                console.log('res',res);
                dispatch({
                    type: 'TEXT',
                    payLoad: res
                })
            }).catch(err => {
                dispatch({
                    type: 'TEXT',
                    payLoad: 'titile errors........'
                })
            })
        }
    }
}
// redux-promise 和 thunk一样用于实现redux的异步操作，唯一的区别是redux-promise允许dispatch的参数是一个promise对象
// .当中间接收到的是一个Promise实例，会dispatch掉resolve的值，对于reject的结果并不做任何处理。
function test_primise() {
    let store = null; // 假设此处是真的store数据源
    store.dispatch(test_ajax());
    // 异步请求函数
    function test_ajax() {
        return (dispatch) => {
            dispatch({
                type: 'TEXT',
                payLoad: 'titile starting.........'
            });
            axios('url').then(res => {
                console.log('res',res);
                dispatch({
                    type: 'TEXT',
                    payLoad: res
                })
            }).catch(err => {
                dispatch({
                    type: 'TEXT',
                    payLoad: 'titile errors........'
                })
            })
        }
    }
    // 发出异步 Action
    // dispatch(createAction(
    //     'FETCH_POSTS',
    //     fetch(`/some/API/${postTitle}.json`)
    //         .then(response => response.json())
    // ));
    // 上面代码中，第二个dispatch方法发出的是异步 Action，只有等到操作结束，这个 Action 才会实际发出。
    // 注意，createAction的第二个参数必须是一个 Promise 对象。
    return new Promise((resolve, reject) => {
        if(1 == 1) {
            resolve({type: 'ajax', status: 200});
        }
        reject({type: 'ajax', status: 500}); // 只有第一个会直接dispatch,第二个不会有任何操作
    })
    // action.payload //源码
    //     .then(result => dispatch({ ...action, payload: result }))
    //     .catch(error => {
    //         dispatch({ ...action, payload: error, error: true });
    //         return Promise.reject(error);
    //     })
    // 当promise的状态变成resolved的时候回进入then里面，并且重新dispatch(action)
    // 当promise的状态变成rejected的时候回进入catch里面，并且重新dispatch(action), 同时会在action里面加一个error
    // 从上面两种情况来看，当action.payload为promise的时候，会被重新分发，并且不会走到下一个中间件。
//     建议
//     从上面的源码我们看出：
// 源码简单易懂，使用promise来解决异步，省去了额外的学习成本。但是同样由于过于简单，无法完成我们项目中一些特定的需求，比如我们想请求一个列表数据，
// 在请求的时候我们想做一些loading的动画，由于这个中间件是直接拦截掉action, 并最终经过判断处理同样只会分发一次，这样在解决上面的应用场景中，不是很适合，同样我们判断请求成功或者失败的时候需要额外的判断error,其实是增增加了额外的约束。
// 从上面代码可以看出，如果 Action 本身是一个 Promise，它 resolve 以后的值应该是一个 Action 对象，会被dispatch方法送出（action.then(dispatch)），但 reject 以后不会有任何动作；
// 如果 Action 对象的payload属性是一个 Promise 对象，那么无论 resolve 和 reject，dispatch方法都会发出 Action。
}