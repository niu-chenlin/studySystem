import React, {
    useEffect,
    useState,
    useContext,
    useReducer,
    useCallback,
    useMemo,
    useRef,
    useImperativeHandle, forwardRef, useLayoutEffect
} from "react";

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
        // 它的执行不会阻塞Css render

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
// useCallback使用场景：
// 子组件接受一个props函数，一般情况当父组件更新时子组件也会更新，但是大多数情况下子组件是不需要更新的
// 类似在子组件中使用shouldComponentUpdate判断true | false

function Child({ ref,callback }) {
    const [count, setCount] = useState(() => callback());
    useEffect(() => { // 有点多余呀，因为useEffect传入的第二个参数改变时才会执行
        setCount(callback());
    }, [callback]);
    function test() {
        console.log("this is child test function");
    }
    let testData = 1;
    return <div>
        {count}
    </div>
}
export const Parent: React.FC<{}> = () => {
    const [count, setCount] = useState(1);
    const [val, setVal] = useState('');
    const childRef = useRef(Child);

    const callback = useCallback(() => {
        return count;
    }, [count]);

    function onClick() {
        setCount(count + 1);
        console.log(childRef.current);
    }

    return <div>
        <h4>{count}</h4>
        <Child ref={childRef} callback={callback}/>
        <div>
            <button onClick={() => onClick()}>+</button>
            <input value={val} onChange={event => setVal(event.target.value)}/>
        </div>
    </div>
};
// 测试useRef
export const UseRefCounter: React.FC<{}> = () => {
    const [count, setCount] = useState(0);
    // 点击3次加 - 2次弹框显示 - 2次加后 alert值为3 why? 常理来说应该是5 but
    // 当我们更新状态的时候, React 会重新渲染组件, 每一次渲染都会拿到独立的 count 状态, 并重新渲染一个 handleCount 函数.
    // 每一个 handleCount 里面都有它自己的 count 。 -- 每一次的渲染都是重新替换，所以setTimeout保留的是之前（活动对象）的引用，就像for中的let
    const handleCount = () => {
        setTimeout(() => {
            alert('current count: ' + count);
        }, 3000)
    };
    // 那如何显示最新的count呢？答案是可以使用ref
    const countRef = useRef<number>(count);
    useEffect(() => {
        countRef.current = count
    });
    const handleCount1 = () => {
        setTimeout(() => { // 使用ref就可以应用到最新的值 - 这应该只是其中之一的用法
            alert('current count: ' + countRef.current);
        }, 3000)
    };
    const inputEl = useRef<HTMLInputElement>(null);

    return (
        <div>
            <p>current count: { count }</p>
            <button onClick={() => setCount(count + 1)}>加</button>
            <button onClick={() => handleCount1()}>弹框显示</button>
            <input type="text" ref={inputEl}/>
        </div>
    )
};
// 变更.current属性不会引发组件重新渲染，根据这个特性可以获取状态的前一个值
// 请记住，当 ref 对象内容发生变化时，useRef 并不会通知你。变更 .current 属性不会引发组件重新渲染。
// 如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用回调 ref 来实现。
let set1 = new Set();
export const UseRefCounter1: React.FC<{}> = () => {
    const [count, setCount] = useState(0);
    const preCountRef = useRef<number>(count); // useRef的变更不会导致组件重新render，useRef不会重新定义  会在每次渲染时返回同一个 ref 对象
    set1.add(preCountRef);
    console.log(count);
    console.log(preCountRef.current);
    useEffect(() => {
        console.log(count);
        console.log(`useRef会重新定义吗 ${set1.size}`); // set1.seize永远是1，由此可见useRef不会被重新定义 - 即它负责引用并缓存
        preCountRef.current = count; // 每次渲染结束后重新赋值
    });
    return (
        <div>
            <p>pre count: { preCountRef.current }</p>
            <p>current count: { count }</p>
            <button onClick={() => setCount(count + 1)}>加</button>
        </div>
    )
};
// 操作DOM节点
export const SetDOMByCallBaskRef: React.FC<{}> = () => {
    const [height, setHeight] = useState(0);
    // 在这个案例中，我们没有选择使用 useRef，因为当 ref 是一个对象时它并不会把当前 ref 的值的 变化 通知到我们。
    // 使用 callback ref 可以确保 即便子组件延迟显示被测量的节点 (比如为了响应一次点击)，我们依然能够在父组件接收到相关的信息，以便更新测量结果。
    const callbackRef = useCallback(node => {
        console.log(node);
        setHeight(node.getBoundingClientRect().height);
    }, []);
    // 注意到我们传递了 [] 作为 useCallback 的依赖列表。这确保了 ref callback 不会在再次渲染时改变，因此 React 不会在非必要的时候调用它。
    // 在此示例中，当且仅当组件挂载和卸载时，callback ref 才会被调用，因为渲染的 <h1> 组件在整个重新渲染期间始终存在。如果你希望在每次组件调整大小时都收到通知，
    // 则可能需要使用 ResizeObserver 或基于其构建的第三方 Hook。
    //
    // const inputRef = useRef();
    // let FancyInput = forwardRef(ImperativeHandleChild);
    // @ts-ignore
    // inputRef.current.focus();
    return (<div>
        <h1 ref={callbackRef}>hello word</h1>
        <h2>The above header is {Math.round(height)}px taill</h2>
        {/*<FancyInput ref={inputRef}/>*/}
    </div>)
};
// useImperativeHandle
// useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。在大多数情况下，
// 应当避免使用 ref 这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用：
function ImperativeHandleChild(ref) {
    const inputRef = useRef();
    // 定义ref暴漏给父组件的值
    // 在本例中，渲染 <ImperativeHandleChild ref={inputRef} /> 的父组件可以调用 inputRef.current.focus()。
    useImperativeHandle(ref,() => ({
        focus: () => {
            // @ts-ignore
            inputRef.current.focus();
        }
    }));
    return <input ref={inputRef}/>
}
// useLayoutEffect
// 其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。
// 在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。
export const TestUseEffectAndUseLayoutEffect: React.FC<{}> = () => {
    const [count, setCount] = useState(0);
    // 在布局和绘制后执行
    useEffect(() => {
       console.log("在render之后执行。确保了页面的布局与绘制执行完成");
    });
    // 先执行useLayoutEffect - 因为它在绘制前执行，他会同步阻塞布局和绘制
    useLayoutEffect(() => { // 如果有DOM的操作（改变样式等），在页面绘制前执行防止页面闪屏
        console.log("所有的DOM变更之后，同步执行 在浏览器进行任何绘制之前运行完成,阻塞了浏览器的绘制");
    });
    // 提示
    //
    // 如果你正在将代码从 class 组件迁移到使用 Hook 的函数组件，则需要注意 useLayoutEffect 与 componentDidMount、
    // componentDidUpdate 的调用阶段是一样的。但是，我们推荐你一开始先用 useEffect，只有当它出问题的时候再尝试使用 useLayoutEffect。
    function testClick() {
        setCount(count + 1);
    }
    return (<div>
        <h3>this is count value is {count}</h3>
        <button onClick={() => testClick()}>点击测试</button>
    </div>)
};