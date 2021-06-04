import React, { useEffect, useState } from "react";
// 什么是 Hook ? Hook是一种特殊函数，可让你 “接入” React 功能。 例如，useState 是一个 Hook，允许您将 React state(状态) 添加到函数式组件中。
// 我什么时候使用 Hook? 如果你编写一个函数式组件并意识到你需要为它添加一些 state(状态) ，那么之前你必须将它转换为一个 classes(类) 。 但是现在，您可以在现有函数式组件中使用 Hook

// 函数组件的 useState
function ExampleFun() {
    // 在函数式组件中，我们没有 this ，所以我们不能分配或读取 this.state 。我们可以直接在组件内部调用 useState Hook：
    const [count, setCount] = useState(0);
    // 调用 useState 有什么作用？ 它声明了一个 “state(状态)变量”。通常，当函数退出时变量就会“销毁”，但 React 会保留 state(状态) 变量。
    // 我们传递给 useState 的参数是什么？seState() Hook 惟一参数是初始 state(状态) 。与 classes(类) 不同，这里的 state(状态) 不一定是对象。
    // 他可以是任何我们需要的内容，比如数字，字符串等。
    // 如果我们想在状态中存储两个不同的值，我们将调用 seState()两次。
    // useState返回的是什么？它返回一对值：当前 state(状态) 和更新它的函数。
    const [obj, setObj] = useState({test1: "test1", test2: "test2", test3: "test3"});
    function onClick() {
        setCount(count + 1); // 与 class(类) 中的 this.setState 不同，更新状态变量总是替换它，而不是合并它。
        setObj({test1: "test1", test2: "test2", test3: "test3"}); // set时必须传入全部参数，这种情况就需要分组定义，问题：我怎么获取上一次的state
    }
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}

// Hooks 在 classes(类) 内 不 起作用。 但是你可以使用它们来取代编写类。
// 类组件的state
export class ExampleClass extends React.Component<any, any> {
    constructor(props) {
        super(props);
        // let [number, setNumber] = useState(0);
        // 在class组件中调用Hooks编译报错，
        // 错误:无效的钩子调用。钩子只能在函数组件体内部被调用
        this.state = {
            count: 0
        };
    }

    render() {
        console.log(this.state.number);
        return (
            <div>
                <p>You clicked {this.state.count} times</p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                    Click me
                </button>
            </div>
        );
    }
}