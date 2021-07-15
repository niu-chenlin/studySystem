import React, { useEffect, useState } from "react";
// 首先了解什么是副作用(Side Effect)：副作用(Side Effect)是指函数或者表达式的行为依赖于外部世界。
// 1.函数或者表达式修改了它的 scope 之外的状态  2.函数或者表达式除了返回语句外还与外部世界或者它所调用的函数有明显的交互行为

function Example() {
    const [count, setCount] = useState(0);

    // Similar to componentDidMount and componentDidUpdate:
    // 为什么不是will，因为函数组件总是先return class组件不是
    useEffect(() => {
        // Effect Hook 为你的函数式组件增添了执行 side effects 的能力。
        // 数据获取、设置订阅以及手动更改 React 组件中的 DOM 都是 side effects 的例子。
        // side effects 额外带的一些效果和作用
        document.title = `You clicked ${count} times`; // 函数或者表达式修改了它的 scope 之外的状态
    });
    // React 组件中有两种常见的 side effects ：不需要清理的和需要清理的。让我们更详细地看看这个区别。
    // 不要清理的 side effects(副作用)
    useEffect(() => {
        // 在useEffect中调用set... 不会造成无限调用，除非state值发生改变，否则不执行，这肯定是useState负责处理的，当值不变时不触发render
        // 在React更新DOM后运行一些额外的操作 - 不需要清理什么
        // 网络请求、手工 DOM 修改和日志记录都是不需要清理的 side effects 的常见例子。

        // 痛击灵魂三问
        // 1.useEffect有什么作用？ 通过使用这个 Hook ，您可以告诉 React 在渲染后要做些什么。React 将记住传递的函数(我们将把它称为 “effect” )，然后在执行DOM更新后调用它。
        // 我们也可以执行数据获取或调用其他命令式API... 那岂不是每次渲染结束或者卸载前都得执行不必要的事情吗？
        // 2.为什么在组件内调用 useEffect ？ 在组件中放置 useEffect 可以让我们直接访问 count state(状态)变量(或任何 props 属性)。我们不需要用一个特殊的 API 来读取它，
        // 它已经在函数作用域中了。Hooks 支持 JavaScript 闭包，并在 JavaScript 已经提供解决方案的情况下，避免引入特定于 React 的 API 。
        // 3.每次渲染后 useEffect 都会运行吗？ 是的！默认情况下，它在第一次渲染之后和每次更新之后都运行。
        // 与”mounting” 和 “updating” 不同，您可能会更容易地认为 effects 是在渲染之后发生的。React 确保 DOM 在运行 effects 时已经更新了。

        // 传递给 useEffect 的函数在每次渲染时都是不同的。每次我们重新渲染，我们安排一个不同的 effect 来替换前一个。
        // 与 componentDidMount 或 componentDidUpdate 不同，使用 useEffect 调用的 effects 不会阻止浏览器更新屏幕。难道是异步的（异步渲染）
    });

    // 需要清理的。比如订阅消息、取消axios请求、取消上传文件等
    useEffect(() => { // 第一次和每次渲染之后和卸载之前执行
        // 在React类中，通常会在 componentDidMount 中设置订阅，然后在 componentWillUnmount 中清理订阅。
        // 如果你的 effect 返回一个函数，React 将在清理时运行它：
        return () => { // 每次执行useEffect之前执行（第一次不执行）
            // 叩击灵魂三问曲 大冷大冷 它来了 它来了，它脚踏祥云走来了
            // 1.为什么我们从 effect 中返回一个函数？ 这是 effect 的可选清除机制。每个 effect 都可能返回一个在它之后进行清理的函数。
            // 这让我们可以将添加和删除订阅的逻辑紧密地保持在一起。它们是相同 effect 的一部分。
            // 2.React 什么时候清理 effect ？ React在组件卸载时执行清理工作。然而，
            // 正如我们之前了解到的，effect 适用于每个渲染，而不仅仅是一次。这就是为什么 React 在下次运行 effect 之前会清理之前渲染的effect 。
            console.log("每次执行清理...");
        }
    });

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}

// class组件处理一些副作用需要用到（render DOM后执行的一些操作，componentDidMount、componentDidUpdate、componentWillUnmount）
class ExampleClass extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    componentDidMount() {
        document.title = `You clicked ${this.state.count} times`;
    }

    componentDidUpdate() {
        document.title = `You clicked ${this.state.count} times`;
    }

    componentWillUnmount() {
        document.title = `You clicked ${this.state.count} times`;
    }

    render() {
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

// 使用多个useEffect分离关注点
// 一下示例代码中
// 类组件的生命周期方法通常包含不相关的逻辑

class FriendStatusWithCounter extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = { count: 0, isOnline: null };
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }

    // 注意设置 document.title 的逻辑如何在 componentDidMount 和 componentDidUpdate 之间拆分。
    // 订阅逻辑还分布在 componentDidMount 和 componentWillUnmount 之间。componentDidMount 包含两个任务的代码。

    componentDidMount() {
        document.title = `You clicked ${this.state.count} times`;
        // ChatAPI.subscribeToFriendStatus( 订阅消息
        //     this.props.friend.id,
        //     this.handleStatusChange
        // );
    }

    componentDidUpdate() {
        document.title = `You clicked ${this.state.count} times`;
    }

    componentWillUnmount() {
        // ChatAPI.unsubscribeFromFriendStatus( 删除订阅
        //     this.props.friend.id,
        //     this.handleStatusChange
        // );
    }

    handleStatusChange(status) {
        this.setState({
            isOnline: status.isOnline
        });
    }
    // ...
}
// 关于执行副作用（函数或者表达式依赖于外部世界。1.函数或者表达式修改了作用域之外的状态 2.与外部世界或者它所调用的函数有明显的交互行为）
// 我们可以使用多个useEffect来分离关注点。比如上面class组件中的 document操作和订阅操作，可以使用多个useEffect来分离一下
// Hooks 允许我们根据代码的用途来分割代码，相当于生命周期方法名称。React 将按指定的顺序应用组件使用的 每个 effect 。
function moreUseEffect() { // - Hooks 允许我们根据代码的用途来分割代码
    // useEffect 关注点分离 - 一个用来单独处理document
    const [count, setCount] = useState(0);
    useEffect(() => {
        document.title = `You clicked ${count} times`;
    });

    // useEffect 关注点分离 - 一个用来单独处理发布订阅消息
    const [isOnline, setIsOnline] = useState(null);
    useEffect(() => {
        // ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        return () => {
            // ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
    });

    function handleStatusChange(status) {
        setIsOnline(status.isOnline);
    }
    // ...
}

// 问题 - 为什么Effects在每次更新后都会运行（effect 清理阶段） 而不使用像class组件那样的 componentWillUnmount一次性卸载
class TestFriendStatus extends React.Component<any, any> {
    componentDidMount() {
        // 我们在此处订阅了friend消息
        // ChatAPI.subscribeToFriendStatus(
        //     this.props.friend.id,
        //     this.handleStatusChange
        // );
    }

    componentWillUnmount() {
        // 当组件卸载时取消friend消息的订阅-防止存在内存泄露问题
        // 此方法看似几乎完美，但是如果如果friend在渲染到屏幕时数据发生了改变，那么此处处理的就是改变后的friend - 会存在内存泄露问题

        // ChatAPI.unsubscribeFromFriendStatus(
        //     this.props.friend.id,
        //     this.handleStatusChange
        // );
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        // 基于存在的内存泄露问题，我们需要添加componentDidUpdate钩子函数来防止此问题
        // 订阅 -- 取消发布

        // ChatAPI.subscribeToFriendStatus(
        //     this.props.friend.id,
        //     this.handleStatusChange
        // );
        // ChatAPI.unsubscribeFromFriendStatus(
        //     this.props.friend.id,
        //     this.handleStatusChange
        // );
    }
    // 忘记正确处理 componentDidUpdate 是 React 应用程序中常见的 bug 漏洞。
    // 现在考虑使用 Hooks 的这个组件的版本：
    // 此行为默认确保一致性，并防止由于缺少更新逻辑而导致类组件中常见的错误。
    // 我们已经看到了 effect 清理如何避免在 componentDidUpdate 和 componentWillUnmount 中出现重复,并帮助我们避免 bug
    FriendStatus(props) {
        // ...
        useEffect(() => {
            // ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
            return () => {
                // ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
            };
        });
    }
}

// 跳过执行useEffect来提升新能
// 在类组件中我们使用这种方式实现
function componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
        document.title = `You clicked ${this.state.count} times`;
    }
}
// 在Hooks中，我们使用  将来， 第二个参数可能会通过构建时转换自动添加。
function hooksDidUpdate() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        document.title = `You clicked ${count} times`;
    }, [count]); // 只有在count改变时才重新运行效果 多个项目中，即使只有一个不同，也会重新运行
    // 测试后发现 第二个参数已经不需要了，当count没改变时，不会指向useeffect
}
// OK到这里我们会存在另一个问题，我的数据只想在装载和卸载时执行怎么办？比如请求API，转载时请求，卸载时取消请求（不执行componentDidUpdate）
// 我们可以给第二个参数传入[]空数组实现  这告诉React你的 effect 不依赖于来自 props 或 state 的任何值，所以它永远不需要重新运行。
// 官方一般不推荐，因为还是回到了class组件的问题，不小心会导致内存泄露问题
// 不要忘记 React 推迟运行 useEffect 直到浏览器绘制完成后，所以做额外的工作不是问题。 小伙子们很有信心呀！
function hooksRunApi() {
    useEffect(() => {
        // 请求API
        return () => {
            // 组件卸载时 取消请求API
        }
    }, []);
}
// 我们开始看到 Hooks 是如何解决 动机 中提到的问题。我们已经看到了 effect 清理如何避免在 componentDidUpdate 和 componentWillUnmount 中出现重复，
// 使相关代码更紧密地结合在一起，并帮助我们避免 bug 。我们也看到了如何根据目的分离 effect，这是我们在 classes(类) 上无法做到的。