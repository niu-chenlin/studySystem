import React, { useEffect, useState } from "react";

// 两个组件使用相同的 Hook 共享 state(状态) 吗？ 不会。自定义 Hooks 是一种重用 stateful(有状态) 逻辑
// 的机制(例如设置订阅和记住当前值)，但是每次使用自定义 Hook 时，它内部的所有状态和效果都是完全隔离的。

// 自定义 Hook 如何获得隔离 state(状态) ？ 每次对 Hook 的调用都会被隔离。因为我们直接调用 useFriendStatus ，从 React 的角度来看，
// 我们的组件只调用 useState 和 useEffect 。正如我们 之前 所学到的 的，我们可以在一个组件中多次调用 useState 和 useEffect ，它们将完全独立的

// 数学老师和语文老师获取某个学生的成绩
function useStudentGrade(anyGrade) { // 可以添加一个默认值
    const [grade, setGrade] = useState(anyGrade);
    // setGrade(anyGrade); // 在这里调用就是死循环 - 永远在重置state导致一直在render
    if(grade !== anyGrade) { // 这种操作也是在render之后执行的，初始化竟然不执行（hook难道执行use...后不管三七二十一首先给你render）
        setGrade(anyGrade); // 最优解决方案 - 当值不同时更新state - 更新state将立即执行父组件的初始化
    }
    useEffect(() => {
        // 第一次渲染时，从后端Get 现在假设这里进行了API请求,并修改grade
        // setGrade(anyGrade);
        // return () => {
        //     // 除了第一次渲染外，之后的每次渲染之前都重置成绩
        //     // 这样问题就来了-卸载前重置个毛毛 这不就多余了
        //     setGrade(0);
        // }
    }); // , [grade] 加上这个参数，grade将不能自动更新（这里的自动更新是指：在其父组件中定义的useState不能和grade级联操作，
    // 原因是：加上这个参数后，当grade没改变时将不执行useEffect）
    // function setData(value) {
    //     setGrade(value);
    // }
    // return [grade, setData];
    return grade; // 这里的执行顺序是先执行了return 才执行的useEffect
    // 当父组件的state变更时，导致了整个父组件重新执行，执行到子组件时，虽然anyGrade参数发生了改变（最新值），
    // 但由于是先执行的return，而导致useEffect的执行在后，所以setGrade没执行，因此返回的值还是之前的值
    // 先执行return的原因，应该是React认为return是一个render，React确保得到相关值后第二部直接执行render

    //重要提示：当执行hook时React优先render（也就是不管现在的值是什么，先把它们render出来）
    // hook的执行顺序使：1.父组件执行外层代码 - 2.调用子组件后执行外层代码 - 3.子组件外层代码结束后会先执行renter(render)
    // 4.回到父组件执行renter(render) - 5.回到子组件执行useEffect - 6.回到父组件执行useEffect

}
export const MathematicsTeacher: React.FC<{}> = () => {
    console.log("useState的改变将会导致整个函数组件从新执行吗？答案是会");
    const [selfGrade, setSelfGrade] = useState(89);
    const grade = useStudentGrade(selfGrade);
    useEffect(() => {
        console.log(grade);
        console.log(selfGrade);
    });
    // setSelfGrade 这种方式能导致在hook之间传值的原理就是 set... 能导致组件重新初始化（初始化时还能保存最新的state）
    return (<div>
        <p>从数学老师这里得知，学生张三的数学成绩是：{grade}</p>
        <button onClick={() => setSelfGrade(grade + 1)}>
            数学成绩加1分
        </button>
    </div>)
};
export const LanguageTeacher: React.FC<{}> = () => {
    const [selfGrade, setSelfGrade] = useState(116);
    useEffect(() => {
        // Hook只能在函数组件中被调用 -- 自定义Hook也不行
    });
    const grade = useStudentGrade(selfGrade);
    return (<div>
        <p>从语文老师这里得知，学生张三的语文成绩是：{grade}</p>
        <button onClick={() => setSelfGrade(grade + 1)}>
            语文成绩加1分
        </button>
    </div>)
};

export class TestCourseClass extends React.Component<any, any> {
    constructor(props) {
        super(props);
        console.log("constructor");
        this.state = {
            value: 1
        }
    }
    componentWillMount(): void { // -- 已废弃
        // 这个方法正确调用的时候是在component第一次render之前, 在异步请求数据中这一次返回的是空数据, 因为是在’render’之前不会返回数据
        // 与其返回没意义的空数据（如果等待的话，首屏时间会延长），不如之作一些初始化任务-constructor完全可以替代它
        // 还有一个原因，这边的一些初始化任务还未做完，这时去请求，可能会出错
        console.log("componentDidMount 准备装载 -- 装载阶段");
        console.log(this);
    }
    // static getDerivedStateFromProps() {
    //     console.log("getDerivedStateFromProps 装载完成 -- 装载更新阶段");
    // }
    componentDidMount(): void {
        // 这个方法正确调用的时候是在component第一次render之后,最适合做API请求等任务
        // 第一个好处就是这个一定是在组件初始化完成之后,再会请求数据,因此不会报什么警告或者错误,我们正常请教数据完成之后一般都会setState.
        console.log("componentDidMount 装载完成 -- 装载阶段");
        console.log(this);
    }

    componentWillReceiveProps(nextProps: Readonly<any>, nextContext: any): void { // -- 已废弃（只有接受props时才执行）
        console.log("componentWillReceiveProps 在组件接收到一个新的 prop (更新后)时被调用。 -- 更新阶段");
        console.log(this);
    }
    shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean {
        console.log("shouldComponentUpdate 返回一个布尔值。在组件接收到新的props或者state时被调用。 -- 更新阶段");
        console.log(this);
        return true
    }
    componentWillUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void { // -- 已废弃
        console.log("componentWillUpdate 在组件接收到新的props或者state但还没有render时被调用。 -- 更新阶段");
        console.log(this);
    }
    // getSnapshotBeforeUpdate(prevProps: Readonly<any>, prevState: Readonly<any>): any | null {
    //     console.log("getSnapshotBeforeUpdate 在组件完成更新后componentDidUpdate之前调用 -- 更新阶段");
    //     console.log(this);
    // }
    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        console.log("componentDidUpdate 在组件完成更新后立即调用 -- 更新阶段");
        console.log(this);
        // react中的state是Immutability有什么好处呢？
        //
        // 这里涉及到react的性能优化，react内部会维护一份UI（虚拟DOM），当组件属性或状态发生改变，react对应的虚拟DOM数据也会更新，
        // 不用更新真正的DOM，更加方便快捷，然后react会对现在和更新前的虚拟DOM进行比较，找出变化的元素，只有变化的元素会在真实DOM中更新，
        // 但是有时候一些DOM元素自身没有变化，但会被其他元素影响造成重新渲染，这个时候可以用shouldComponentUpdate方法来判断props或state是不是真的改变了（改变了返回true，否则返回false）。
        // 如果组件的属性和状态是Immutability的对象或值，就可以通过相等来比较了
    }

    componentWillUnmount(): void {
        console.log("componentWillUnmount 装载完成 -- 卸载阶段");
        console.log(this);
    }

    render(){
        console.log("render");
        return <div>
            <p>This is test course class {this.state.value}</p>
            <button onClick={() => this.setState({value: this.state.value})}>
                测试加一
            </button>
            <TestUpdatePropsOrStateClass/>
        </div>;
    }
}

export class TestUpdatePropsOrStateClass extends React.Component<any, any> {
    // 一但组件的state或者props修改，将导致其下所有的子组件和子孙组件的重新render
    testProps: String = "test";
    constructor(props) {
        super(props);
        console.log("TestUpdatePropsOrStateClass");
        this.state = {
            value: 1
        }
    }
    componentDidMount() {
        console.log("正常情况下父组件的setState不可能导致子组件的重载（重新装载）");
    }
    componentWillReceiveProps(nextProps: Readonly<any>, nextContext: any): void {
        console.log("父组件的setState只会导致子组件的更新阶段");
    }

    onChangeTest() {
        this.setState({value: this.state.value + 1});
        // this.testProps = "value is change";
    }
    render(){
        console.log("这是父组件 - render");
        return <div>
            <p>这是父组件 {this.state.value}</p>
            <button onClick={() => this.onChangeTest()}>
                修改父组件的state value
            </button>
            <TestUpdatePropsOrStateSonClass value={this.state.value}/>
            <TestUpdatePropsOrStateSon1Class/>
        </div>;
    }
}

class TestUpdatePropsOrStateSonClass extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(nextProps, nextState) {
        console.log(this.props);
        console.log(nextProps);
        console.log(this.props == nextProps);
    }
    componentWillUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void { // -- 已废弃
        console.log(this.props);
        console.log(nextProps);
        console.log(this.props == nextProps);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.props);
        console.log(prevProps);
        console.log(this.props == prevProps);
    }
    shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean {
        // this.props
        console.log(this.props);
        console.log(nextProps);
        let obj1 = {value: "test"};
        let obj2  = {value: "test"};
        console.log(obj1 != obj2); // this.props != nextProps
        console.log(obj1 == obj2); // false
        let str1 = JSON.stringify(obj1);
        let str2 = JSON.stringify(obj2);
        console.log(str1 == str2); // true
        if(this.props != nextProps) { // 引用类型的判断不能使用 === 底层不触发类型转换 == 在类型不同时会触发一次类型转换
            console.log("nextProps 不相等");
            return true;
        }
        return false;
    }

    render(){
        console.log("这是第一个子组件 - render");
        return <div>
            <p>这是第一个子组件 </p>
            <TestUpdatePropsOrStateGradeSonClass/>
        </div>;
    }
}

class TestUpdatePropsOrStateSon1Class extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(){
        console.log("这是第二个子组件 - render");
        return <div>
            <p>这是第二个子组件</p>
            <TestUpdatePropsOrStateGradeSon1Class/>
        </div>;
    }
}

class TestUpdatePropsOrStateGradeSonClass extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(){
        console.log("这是第一个子组件的子组件 - render");
        return <div>
            <p>这是第一个子组件的子组件 </p>
        </div>;
    }
}

class TestUpdatePropsOrStateGradeSon1Class extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render(){
        console.log("这是第二个子组件的子组件 - render");
        return <div>
            <p>这是第二个子组件的子组件 </p>
        </div>;
    }
}