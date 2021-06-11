import * as React from "react";
import { Card, Collapse } from "antd";
import { SettingOutlined } from '@ant-design/icons';
const { Panel } = Collapse;

export class ReactHooksBaseView extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    getExtra() {
        return <SettingOutlined
            onClick={event => {event.stopPropagation()}}
        />
    }
    render() {
        return <>
            <div className="g-flex-row" style={{alignItems: "baseline"}}>
                <h3>React Hooks简介</h3>
                <p> -- React Hooks简介及其用法（原生Hooks和自定义Hooks，想要使用更多Hooks请到：<a href="https://github.com/zenghongtu/react-use-chinese/blob/master/README.md" target="_blank">react-use</a></p>
            </div>
            <div className="g-synopsis">
                <p>叩击灵魂三问曲：1.Hooks是什么？ 2.React团队为什么要设计它，它的出现解决了什么问题？ 3.我该不该使用Hooks，在什么情况下使用Hooks?</p>
                <Collapse accordion={true} expandIconPosition={"left"}>
                    <Panel header="Hooks是什么？" key="1" extra={this.getExtra()}>
                        Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。<br/>
                        Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。-- 这只是其中一个作用
                    </Panel>
                    <Panel header="React团队为什么要设计它，它的出现解决了什么问题？" key="2" extra={this.getExtra()}>
                        基于三点原因：<br/>
                        1.复杂组件变得难以理解 在多数情况下，不可能将组件拆分为更小的粒度，因为状态逻辑无处不在。这也给测试带来了一定挑战。<br/>
                        &nbsp;&nbsp;Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）,而并非强制按照生命周期划分。你还可以使用 reducer 来管理组件的内部状态，使其更加可预测。<br/>
                        2.在组件之间复用状态逻辑很难 - React 需要为共享状态逻辑提供更好的原生途径。<br/>
                        &nbsp;&nbsp;你可以使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。Hook 使你在无需修改组件结构的情况下复用状态逻辑。 这使得在组件间或社区内共享 Hook 变得更便捷。<br/>
                        3.class 不能很好的压缩，并且会使热重载出现不稳定的情况。<br/>
                        &nbsp;&nbsp;Hook 使你在非 class 的情况下可以使用更多的 React 特性。React 组件一直更像是函数。而 Hook 则拥抱了函数，同时也没有牺牲 React 的精神原则。Hook 提供了问题的解决方案。<br/>
                    </Panel>
                    <Panel header="我该不该使用Hooks，在什么情况下使用Hooks?" key="3" extra={this.getExtra()}>
                        官网已经解释了，未来class组件不会淘汰，所以它肯定不是用来替代class组件的。<br/>
                        现在推荐混合使用，虽然hooks在代码复用、灵活性等方面有优势，但没有像class组件那样清晰的生命周期函数供我们使用，useEffect使用相比class组件还是复杂了点。<br/>
                        目前，我通常更偏向于用hooks来写组件，但在复杂业务中，我会更倾向于用class Component或者两者结合的方式。hooks会是未来的主流组件编写方式，但目前来说似乎它还不太成熟。<br/>
                        截至目前本人未在项目中使用hooks，等我写个demo看看。观点等待后续补充。
                    </Panel>
                    <Panel header="Hooks优缺点?" key="4" extra={this.getExtra()}>
                        <h3>优点：</h3>
                        1.使用Hooks编码会更加灵活，因为使用Hooks编码时，代码粒度更小（基于Function Component），可以使用多个函数组件去组合页面，
                        不像类组件那样，体积大，要写很多多余的状态逻辑代码。代码复用更为简单。Hooks像是用于分解Class组件的一种方案，我们可以使用Hooks分解class组件，
                        然后灵活配置我们想要的页面。这点应该是react hooks最大的优点，它通过自定义hooks来复用状态。<br/>
                        2.组件树层级变浅。避免了使用类组件中的HOC/render props 等方式增加组件树层数及渲染。<br/>
                        3.不用再去考虑 this 的指向问题。在类组件中，你必须去理解 JavaScript 中 this 的工作方式。<br/>
                        4.清爽的代码风格+代码量更少<br/>
                        <h3>缺点：</h3>
                        1.响应式的useEffect，写函数组件时，你不得不改变一些写法习惯。你必须清楚代码中useEffect和useCallback的“依赖项数组”的改变时机。
                        防止你不清楚useEffect依赖链或意外触发了依赖链中的某一项带来的未知问题。<br/>
                        2.状态不同步，每个hook都是一个单独的函数，当有异步操作时（比如在setTimeout中alert当前state），你会发现alert的值不是最新的。因为每次setState都是一个新的函数被创建，
                        新的函数意味着新的作用域。
                        <h3>怎么避免react hooks的常见问题：</h3>
                        1.不要在useEffect里面写太多的依赖项，划分这些依赖项成多个单一功能的useEffect。其实这点是遵循了软件设计的“单一职责模式”。<br/>
                        2.如果你碰到状态不同步的问题，可以考虑下手动传递参数到函数。但最优解决方案还是使用useRef（它的实例不会发生变化）。<br/>
                        3.重视eslint-plugin-react-hooks插件的警告。<br/>
                        4.复杂业务的时候，使用Component代替hooks。<br/>
                        <p>引自 <a href="https://www.jianshu.com/p/d5e4aa1a568d" target="_blank">https://www.jianshu.com/p/d5e4aa1a568d</a></p>
                    </Panel>
                </Collapse>
            </div>
            <h3>基本用法：</h3>
            <div className={"g-flex-row"} style={{marginBottom: 10}}>
                <Card title="useState" style={{ width: "33%" }}>
                    允许你将 React state(状态) 添加到函数式组件中。
                </Card>
            </div>
        </>
    }
}