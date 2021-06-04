import React, { useEffect, useState, useContext, useReducer, useCallback, useMemo } from "react";

export const TestHookUseState: React.FC<{}> = () => {
    // 注意
    // 与类组件中的 setState 方法不同，useState 不会自动合并更新对象。你可以通过将函数更新器表单与对象扩展语法结合来复制此行为：
    // setState(prevState => {
    //     // Object.assign 也是可行的
    //     return {...prevState, ...updatedValues};
    // });
    // 另一个选项是 useReducer ，它更适合管理包含多个子值的 state(状态) 对象。
    const [state, setState] = useState({name: "testUseState", age: 27});
    // 延迟初始值
    // initialState 参数是初始渲染期间使用的状态。 在随后的渲染中，它会被忽略了。
    // 如果初始状态是高开销的计算结果，则可以改为提供函数，该函数仅在初始渲染时执行：
    const [count, setCount] = useState(() => {
        // const initState = someExpensiveComputation(props);
        // return initState;
    });
    function changeState() {
        // @ts-ignore
        setState(prevState => {
            console.log(prevState); // 上一次的state useState默认每次的修改会覆盖掉上一次保存的State
            // 如果不想被覆盖可以在这里处理
            let updateValues = {name: "覆盖PrevState"};
            // return {...prevState, ...updateValues};
            // 或者assign 注意使用assign必须Object.assign({}, prevState, updateValues);写
            // Object.assign(prevState, updateValues); 不生效
            let retData = Object.assign({}, prevState, updateValues);
            console.log(retData);
            return Object.assign({}, prevState, updateValues);
            // return {name: "覆盖PrevState"};
            // 另一个选项是 useReducer ，它更适合管理包含多个子值的 state(状态) 对象。 useReducer本质上也是使用return {...}
        })
    }
    return (<div>
        <p>测试useState函数式更新，值：{state.name}</p>
        <button onClick={() => changeState()}>
            测试reducer调用dispatch
        </button>
    </div>)
};

// useEffect
export const TestHookUseEffect: React.FC<{}> = () => {
    const [state, setState] = useState({name: "testUseState", age: 27});
    useEffect(() => {
        // 这里的代码只有在第一次装载或者每次渲染结束后执行（componentDidMount | componentDidUpdate）
        // 函数式组件的主体内部不允许发生改变，订阅，计时器，日志记录和其他 side effects (称为React的 渲染阶段 ）。
        // 这样做会导致UI中的错误和不一致性的混乱。 -- 不要指望像class组件更新this.state那样使用它
        // 相反，使用 useEffect 。传递给 useEffect 的函数将在渲染结束后运行。可以将 effects 视为是从 React 的纯函数世界到命令式的一个逃生出口。
        // 默认情况下，效果在每次完成渲染后运行，但是你可以选择 仅在某些值发生更改时 触发它。
        // 总结以上话就是不要在useEffect中做会导致组件重新渲染的事情 - 因为它只是负责渲染之后的事情

        // useEffect的执行时机 - 延迟到浏览器绘制完成之后
        // 与 componentDidMount 和 componentDidUpdate 不同，传递给 useEffect 的函数在延迟事件期间在 layout(布局) 和 paint(绘制) 后触发
        // 但是，并非所有 effects 都可以推迟。 例如，用户可见的 DOM 改变必须在下一次绘制之前同步触发，以便用户不会感觉到视觉上的不一致。
        // 对于这些类型的效果，React提供了一个名为 useLayoutEffect 的附加Hook。 它与 useEffect 具有相同的签名，仅在触发时有所不同。

        // 虽然 useEffect 延迟到浏览器绘制完成之后，但它保证在任何新渲染之前触发。 在开始新的更新之前，React 将始终刷新先前渲染的effects 。
        // 上面这句话就像微任务和宏任务的执行时机。宏任务-render 微任务-useEffect 每次render前都会保证useEffect的执行完成

        // 更新时的条件依赖于useEffect的第二个参数，一个数组，只有当数组中的state变更时，才会执行
        // 传如一个空数组表示useEffect的执行不依赖任何state，只有在componentDidMount时执行 componentWillUnmount时执行清理
        // 因此该 effect 仅在 mount 时运行，并且在 unmount 时执行清理，从不在更新时运行。
        console.log("默认组件渲染后执行，传入空数组只有在第一次装载结束后执行！");
        // 这里在组件卸载时不会执行 - 卸载时执行return
        return () => {
            // 这里的代码只有在卸载时才执行（componentWilUnmount）
            console.log("先看看没有第二个参数的情况下，这里会不会执行"); // 没有参数的情况下，这里执行useEffect或者卸载前会执行
            console.log("传入空数组的情况下，这里只有在卸载时执行");
        }
    });
    function changeState() {

    }
    return (<div>
        <p>测试useEffect，值：{state.name}</p>
        <button onClick={() => changeState()}>
            测试useEffect调用
        </button>
    </div>)
};

// useContext -- 使函数组件可以使用context
// const context = useContext(React.createContext("默认名称")); -- 不能在此处使用hook
const ColorContext = React.createContext("默认名称");
const GrandSonContext: React.FC<{}> = () => {
    const value = useContext(ColorContext);
    return (<div>
        <p>我是孙组件，我的值是：{value}</p>

    </div>)
};
const SonContext: React.FC<{}> = () => {
    const value = useContext(ColorContext);
    return (<div>
        <p>我是子组件，我的值是：{value}</p>
        <GrandSonContext/>
    </div>)
};
export const TestUseContext: React.FC<{}> = () => { // React.FC<>的在typescript使用的一个泛型，FC就是FunctionComponent的缩写，是函数组件
    return (<ColorContext.Provider value='TestUseContext'>
        <p>我是当前组件，我的值是：TestUseContext</p>
        <SonContext/>
    </ColorContext.Provider>)
};

// useReducer -- 使函数组件可以使用 redux reducer
function useReducer1(reducer, initialState) { // useReducer内部实现
    const [state, setState] = useState(initialState);
    function dispatch(action) {
        console.log(state, action);
        let nextState = reducer(state, action);
        setState(nextState);
    }
    return [state, dispatch];
}
const initState = {count: 0};
function reducer(state, action) {
    switch (action.type) {
        case "reset":
            return {...state, count: 0};
        case "increment":
            // 问题在于 n++ 和 ++n的区别 n++返回后才执行+1 ++n先执行+1再返回
            return {...state, count: ++state.count};
        case "decrement":
            return {...state, count: --state.count};
        default:
            return state;
    }
}
const TodosDispatch = React.createContext(null);
export const Counter: React.FC<{}> = () => {
    let initAction = {type: "reset", count: 0};
    // useReducer(reducer, initState, initAction);
    // 官网上说可以使用useReducer的第三个参数来实现延迟初始值
    // 但是此处使用时报语法错误，而且源码中initAction的定义使undefined类型 - 可能和版本有关
    // 当你涉及多个子值的复杂 state(状态) 逻辑时，useReducer 通常优于 useState 。它还允许你优化触发深度更新的组件的性能.因为 你可以传递调度而不是回调。
    const [state, dispatch] = useReducer(reducer, initState);
    // 使用useContext和useReducer 可避免传递回调问题 这里的回调问题指的是 - 为解决某些问题 在子组件中调用props.function实现的子组件调用上级组件的方法
    // 其原理就是把Provider的value值赋为dispatch。这样在其后面的所有的子组件都可以通过调用dispatch来实现state的更改

    // const [todos, dispatch] = useReducer(todosReducer);
    // return (
    //     <TodosDispatch.Provider value={dispatch}>
    //         <DeepTree todos={todos} />
    //     </TodosDispatch.Provider>
    // );
    function DeepChild(props) {
        // If we want to perform an action, we can get dispatch from context.
        const dispatch = useContext(TodosDispatch);
        // 从维护的角度来看，这更方便(不需要一直转发回调)，而且完全避免了回调问题。像这样向下传递 dispatch 是深度更新的推荐模式。
        function handleClick() {
            dispatch({ type: 'add', text: 'hello' });
        }
        return (
            <button onClick={handleClick}>Add todo</button>
        );
    }

    return (<div>
        Count: {state.count}
        <button onClick={() => dispatch({type: 'reset'})}>
            Reset
        </button>
        <button onClick={() => dispatch({type: 'increment'})}>+</button>
        <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </div>)
};
// 测试useReducer和useContext - 避免props回调
function testReducer(state, action) {
    switch (action.type) {
        case "UPDATE":
            return {...state, value: "你修改了Value的值"};
        default:
            return state;
    }
}
const TestDispatch = React.createContext(null);
const SonTestUseReducer: React.FC<{value: string}> = (props) => {
    const dispatch = useContext(TestDispatch);
    function change() {
        dispatch({type: 'UPDATE'});
    }
    return (<div>
        <p>子组件中state的值是：{props.value}</p>
        <button onClick={() => change()}>
            通过父组件的context传过来的dispatch更新state的值
        </button>
    </div>)
};
export const TestUseReducer: React.FC<{}> = () => {
    const [state, dispatch] = useReducer(testReducer, {value: "共享context dispatch"});
    return (<TestDispatch.Provider value={dispatch}>
        <p>父组件中state的值是：{state.value}</p>
        <SonTestUseReducer value={state.value}/>
    </TestDispatch.Provider>)
};

// useCallback
// 使用function的形式，失去了class组件的shouldComponentUpdate，我们无法通过判断前后状态来决定是否更新
// （useEffect中可以判断prevState,但也只能解决是否执行useEffect,而不能判断是否执行render）。
// 而且，在函数组件中，react不再区分mount和update两个状态，这意味着函数组件的每一次调用都会执行其内部的所有逻辑，那么会带来较大的性能损耗。
// 因此useMemo 和useCallback就是解决性能问题的杀手锏。
const set = new Set();
export const WithoutMemo: React.FC<{}> = () => {
    // 其它变量的修改还是会导致重新渲染，这个hook只能保证其它变量的修改不影响到我所监听的变量
    // -- 即我所监听的变量发生改变后，我再执行和该变量有关的函数
    // 无论什么情况下调用useState都会导致重新执行该组件
    console.log("使用useMemo|useCallback后还会不会导致组件重新渲染呢？");
    const [count, setCount] = useState(1);
    const [val, setValue] = useState('');
    // function expensive() {
    //     // 每次state的修改都会导致expensive的执行，即使修改的state和expensive函数无关，
    //     // 这是因为useState的修改和setState更新阶段是一样的，即不管值是否相等都重新render，class有shouldComponentUpdate做判断
    //     // 函数组件有useCallback和useMemo
    //     console.log('compute');
    //     let sum = 0;
    //     for (let i = 0; i < count * 100; i++) {
    //         sum += i;
    //     }
    //     return sum;
    // }
    const expensive = useMemo(() => { // useMemo返回缓存（memoized）的变量，useCallback返回缓存（memoized）的函数。
        // 使用useMemo关联count值，只有在count发生改变的时候才执行useMemo的函数
        console.log('compute');
        let sum = 0;
        for (let i = 0; i < count * 100; i++) {
            sum += i;
        }
        return sum;
    }, [count]);
    const expensive1 = useCallback(() => { // useMemo返回缓存（memoized）的变量，useCallback返回缓存（memoized）的函数。
        console.log("只有val发生变化时才执行此函数");
    }, [val]);

    const callback = useCallback(() => {
        console.log(count);
    }, [count]);
    // 返回的是函数，我们无法很好的判断返回的函数是否变更，所以我们可以借助ES6新增的数据类型Set来判断
    set.add(callback);
    console.log(set.size);
    // 每次修改count，set.size就会+1，这说明useCallback依赖变量count，count变更时会返回新的函数；而val变更时，
    // set.size不会变，说明返回的是缓存的旧版本函数。
    return <div>
        <h4>{count}-{val}-{expensive}</h4>
        <div>
            <button onClick={() => setCount(count + 1)}>+c1</button>
            <input value={val} onChange={event => setValue(event.target.value)}/>
        </div>
    </div>;
};
export const TestUseCallback: React.FC<{}> = () => {
    // useCallback(fn, inputs) 等价于 useMemo(() => fn, inputs)。
    // useMemo和useCallback都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；
    // 并且这两个hooks都返回缓存的值，useMemo返回缓存的变量，useCallback返回缓存的函数。
    const [value, setValue] = useState(1);
    const memoizedCallback = useCallback(
        () => {
            console.log("2222222222222222");
        },
        [value],
    );
    return(<div>
        {/*<input type="text" value={value} onChange={memoizedCallback()}/>*/}
    </div>)
};