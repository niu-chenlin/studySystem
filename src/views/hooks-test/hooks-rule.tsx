import React, { useEffect, useState } from "react";

// hooks规则
// 1.**不要在循环，条件或嵌套函数中调用 Hook **。 相反，总是在 React 函数的顶层使用 Hooks。通过遵循此规则，您可以确保每次组件渲染时都以相同的顺序调用 Hook 。
// 这就是允许 React 在多个 useState 和 useEffect 调用之间能正确保留 Hook 状态的原因。
// 2.只在 React Functions 调用 Hooks || 从自定义 Hooks 调用 Hooks 在class组件中调用Hooks编译报错
// 原因：通过遵循此规则，您可以确保组件中的所有 stateful （有状态）逻辑在其源代码中清晰可见。
function Form() {
    // 1. Use the name state variable
    const [name, setName] = useState('Mary');

    // 2. Use an effect for persisting the form
    useEffect(function persistForm() {
        localStorage.setItem('formData', name);
    });

    // 3. Use the surname state variable
    const [surname, setSurname] = useState('Poppins');

    // 4. Use an effect for updating the title
    useEffect(function updateTitle() {
        document.title = name + ' ' + surname;
    });

    // ...
}
// 那么 React 如何知道哪个 state(状态) 对应于哪个 useState 调用呢？
// 答案是 React 依赖于调用 Hooks 的顺序。我们的示例之所以有效，是因为每次渲染时 Hook 调用的顺序都是相同的：
// ------------
// 第一次渲染
// ------------
// useState('Mary')           // 1. 用'Mary'初始化名称状态变量
// useEffect(persistForm)     // 2. 添加一个 effect 用于持久化form
// useState('Poppins')        // 3. 使用 'Poppins' 初始化 surname 状态变量
// useEffect(updateTitle)     // 4. 添加一个 effect 用于更新 title
//
// // -------------
// // 第二次渲染
// // -------------
// useState('Mary')           // 1. 读取 name  状态变量（忽略参数）
// useEffect(persistForm)     // 2. 替换 effect 以持久化 form
// useState('Poppins')        // 3. 读取 surname 状态变量（忽略参数）
// useEffect(updateTitle)     // 4. 替换 effect 用于更新 title
//
// // ...
export const TestHookRule: React.FC<{}> = () => {
    // const [count, setNumber] = useState(0); // 即使set名称不同也会照常执行，但是有违代码编写规范
    const [name, setName] = useState('Mary');
    if(name !== "Mary") { // 当顺序发生改变后，运行报错
        useEffect(function persistForm() {
            console.log("name");
        });
    }
    // useEffect(function persistForm() {
    //     console.log("name");
    // });
    const [surname, setSurname] = useState('Poppins');
    useEffect(function updateTitle() {
        document.title = name + ' ' + surname;
    });
    // 只要 Hook 调用的顺序在每次渲染之间是相同的，React 就可以将一些本地 state(状态) 与每次渲染相关联。
    // 但是如果我们在条件中放置 Hook 调用（例如，persistForm effect）会发生什么呢？


    return (<div>
        <p>count的值是：{name}</p>
        <button onClick={() => {setName(name + 1)}}>check me</button>
    </div>)
};

// hook的顺序为什么不能变
// 一个Function Component的state状态整体是作为memoizedState存在FIber中的。
// function执行时，首先取memoizedState第一个base state，作为hook数据源，更新state。
// 一次执行完后，hook被更新：
// 然后hook变为下一个数据源，并继续执行更新。
// 假如某个useState没有执行，会导致指针移动出错，数据存取出错
// 我们动手实现一个useState
// 初始useState
let state1; // 此处有一个问题，我们有多个state怎么办？变量state不就被重置了！
function useState1(initialState) {
    state = state || initialState;
    function setState(newState) {
        state = newState;
        render();
    }
    return [state, setState];
}
function render() {
    // 重新渲染
    // ReactDom.render(<Counter />, document.getElementById("root"));
}
function testUseState1() {
    const [cState, setCState] = useState1(0);
    const [cState1, setCState1] = useState1(1);
}
// 解决state重置问题，只能使用一个数组来声明state
let state = []; // state数组用来保存数据
let index = 0; // index用来对应每一个数组项
function useState2(initialState) {
    let currentIndex = index; // currentIndex用来保存当前index
    state[currentIndex] = state[currentIndex] || initialState;
    function setState(newState) {
        state[currentIndex] = newState;
        render();
    }
    index += 1; // 每次修改完成之后index加1
    return [state[currentIndex], setState];
}
// 以上就是useState的大致实现方法，现在知道为什么要保持hook的执行顺序一致了吧，如果执行不一致，指针指向会出问题，特别是如果存在null的情况下，指针指向null不就报错了