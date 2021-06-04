// import * as React from 'react';  // 函数组件必须这么写，也可以添加esModuleInterop解决
import React, { useEffect, useState } from "react";
import events from "events";
import { emit } from "cluster";
const emitter = new events.EventEmitter();

// 在组件之间复用状态逻辑很难 - React 需要为共享状态逻辑提供更好的原生途径。
// 你可以使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。Hook 使你在无需修改组件结构的情况下复用状态逻辑。 这使得在组件间或社区内共享 Hook 变得更便捷。

// 复杂组件变得难以理解 在多数情况下，不可能将组件拆分为更小的粒度，因为状态逻辑无处不在。这也给测试带来了一定挑战。
// Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）,而并非强制按照生命周期划分。你还可以使用 reducer 来管理组件的内部状态，使其更加可预测。

// class 不能很好的压缩，并且会使热重载出现不稳定的情况。
// Hook 使你在非 class 的情况下可以使用更多的 React 特性。React 组件一直更像是函数。而 Hook 则拥抱了函数，同时也没有牺牲 React 的精神原则。Hook 提供了问题的解决方案

// 我们准备让 Hook 覆盖所有 class 组件的使用场景，但是我们将继续为 class 组件提供支持。

// 概念 Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

// State Hook：
// userState：useState 就是一个 Hook。通过在函数组件里调用它来给组件添加一些内部 state。React 会在重复渲染时保留这个 state。useState 会返回一对值：
// 当前状态和一个让你更新它的函数你可以在事件处理函数中或其他一些地方调用这个函数。
// 它类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并。 （state和userState的区别：userState不会把新state和旧state合并）

// 什么是 Hook?
// Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React。
// 动机（为什么使用hooks）：解决上述问题。1.组件之间复用状态逻辑很难 2.不能拆分class组件状态逻辑带来的复杂组件问题 3.class不能很好的压缩，并且会使热重载出现不稳定的情况

// Hook的规则
// 1.只能在顶层调用 Hook，不要在循环、条件或嵌套函数中调用 Hook。
// 2.仅从 React 函数式组件中调用 Hook。不要从常规 JavaScript 函数调用 Hook。（还有另一个有效的地方来调用 Hook，即你的自定义 Hook。）

// userData 定义函数组件state，类似this.state，但是不同于state的是useState不会对state进行合并，而是直接覆盖
export function Example() { // 开始测试React hooks
    // 声明一个新的叫做 “count” 的 state 变量
    // useState 作用：返回一个状态以及能修改这个状态的setter，在其他语言称为元组（tuple），一旦添加mount之后只能通过这个setter修改这个状态。
    let [count, setCount] = useState(0);
    return (<div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
            Click me
        </button>
    </div>)
}

// 使用函数式组件时需要将组件申明为React.FC类型，也就是 Functional Component 的意思，另外props需要申明各个参数的类型，然后通过泛型传递给React.FC。
// 它还支持 children 的传入，即使在我们的类型中并没有定义它：
// export const User:React.FC<UserInfo> = ({ name, age, children }) => {
export const ExampleUseState: React.FC<{}> = () => {
    const [testData, setTestData] = useState("我是初始值");
    const [count, setCount] = useState(0);
    const [obj, setObj] = useState({test1: "test1", test2: "test2", test3: "test3"});
    function onClick() {
        setCount(count + 1);
        // setObj({test1: "test1", test2: "test2", test3: "test3"}); // set时必须传入全部参数，这种情况就需要分组定义，问题：我怎么获取上一次的state
    }
    useEffect(() => {
        console.log("多个useEffect的情况下，会逐一执行！");
    });

    useEffect(() => {
        console.log(111111);
        console.log("组件卸载时执行useEffect了吗？");
        // setTestData("我变了" + count);
        return () => {
            // 燃鹅并没有，也就是说第一次执行useEffect它先对回调进行了注册，
            // 其内部机制肯定是先检查有无这个回调，第一次执行肯定没有注册回调，执行个毛毛啊
            console.log("第一次执行useEffect之前调用了吗？");
            console.log("组件卸载时执行清理了吗？");
        }
    });
    return (<div>
        <p>You clicked {testData} times</p>
        <p>You clicked {count} times</p>
        <button onClick={() => onClick()}>
            Click me
        </button>
        <p>test1 {obj.test1} </p>
        <p>test2 {obj.test2} </p>
        <p>test3 {obj.test3} </p>
    </div>)
};
// 以前用的SFC已废弃
export const StaticButton: React.SFC = () => {
    return (
        <button>Static</button>
    );
};

// Effect Hook - 增加了从函数式组件执行副作用的功能。它与 React 类中的 componentDidMount，componentDidUpdate，和 componentWillUnmount 有相同的功能，但是统一为单个 API。
export const ExampleEffectHook: React.FC<{}> = () => { // 此组件在 React 更新 DOM 后设置文档标题
    const [count, setCount] = useState(0);

    useEffect(() => {
        // 当你调用 useEffect 时，你通知 React 在刷新对 DOM 的更改后运行你的 “effect” 函数。Effect 在组件内声明，
        // 因此可以访问其 props 和 state。默认情况下，React 在每次渲染后运行 effect，包括 第一次渲染。
        document.title = `You clicked ${count} times`;
        // 当你调用 useEffect 时，你通知 React 在刷新对 DOM 的更改后运行你的 “effect” 函数。Effect 在组件内声明，因此可以访问其 props 和 state。默认情况下，React 在每次渲染后运行 effect，包括 第一次渲染。（
        // 此处可订阅或者处理某些业务 --
        console.log("useEffect befor");
        // componentDidMount，componentDidUpdate，和 componentWillUnmount
        return () => {
            // useEffect中返回一个函数，表示当前usEffect执行之后的后续操作是什么
            // 当组件卸载时，以及在由于后续渲染而重新运行 effect 之前会执行此回调
            console.log("useEffect return");
        }
    });
    return (<div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
            Click me
        </button>
    </div>)
};

// 订阅朋友在线状态和多个useEffect示例
export const FriendMoreStatus = () => {
    const [isOnline, setIsOnline] = useState(null);
    function handleStatusChange(status) {
        setIsOnline(status.isOnline);
    }
    useEffect(() => {
        console.log("多个useEffect逐一调用，第一次调用");
        return () => {
            console.log("第一次返回");
        };
    });
    useEffect(() => {
        console.log("多个useEffect逐一调用，第二次调用");
        return () => {
            console.log("第二次返回");
        };
    });
    useEffect(() => {
        emitter.on('friendStatus', handleStatusChange); // 订阅
        return () => {
            emitter.removeListener('friendStatus', () => {
                console.log("移除监听-friendStatus");
            })
        };
    });
    if (isOnline === null) {
        return 'Loading...';
    }
    return isOnline ? 'Online' : 'Offline';
};
// Hooks 是重用 有状态逻辑 的一种方式，而不是 state(状态) 本身。 事实上，
// 每次调用 Hook 都有一个完全隔离的 state(状态) - 所以你甚至可以在一个组件中多次使用相同自定义的 Hook 。
// 如果函数的名称以 “use” 开头并且它调用其他 Hook ，我们就可以说它是一个自定义 Hook 。
// 自定义Hook - 用于重用组件的状态逻辑
function useFriendStatus(friendID) {
    const [isOnline, setIsOnline] = useState(null);

    function handleStatusChange(status) {
        setIsOnline(status.isOnline);
    }

    useEffect(() => {
        emitter.on('friend', handleStatusChange);
        return () => {
            // emitter.emit('friend', 'I am friendId'); // 发布
            // emitter.removeAllListeners(); // 删除所有监听
            emitter.removeListener('friend',  () => {
                console.log("移除了friend监听");  // 每次调用useEffect之前（不包括第一次调用），先移除friend监听
            });
        }
    });
    return isOnline;
}
function FriendStatus(props) {
    const isOnline = useFriendStatus(props.friend.id); // 状态逻辑的共享 是class组件无法做到的 除非使用高阶组件或者渲染props
    if(isOnline === null) {
        return "Loading...";
    }
    return isOnline ? 'Online' : 'Offline';
}
export const FriendListItem: React.FC<any> = (props) => {
    const isOnline = useFriendStatus(props.friend.id); // 状态逻辑的共享 是class组件无法做到的 除非使用高阶组件或者渲染props
    return (<li style={{ color: isOnline ? 'green' : 'black' }}>
        {props.friend.name}
    </li>)
};