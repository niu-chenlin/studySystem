import * as React from "react";
import { Tag, Divider, Card, Table, Collapse, Select } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import {connect} from "react-redux";
import {GlobalTool} from "../../tools/global-tool";
const { Panel } = Collapse;
const { Option } = Select;

// @ts-ignore
@connect(state => ({ loading: state[0] }))
export class ReduxBaseView extends React.Component<any, any> {
    columns1: any[] = [
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '说明',
            dataIndex: 'desc',
        }
    ];
    dataSource1: any[] = [
        {
            name: 'reducer',
            desc: '处理Store的纯函数'
        },
        {
            name: 'defaultState',
            desc: '默认Store'
        },
        {
            name: 'applyMiddleware(thunk)',
            desc: 'Redux中间件，用于扩展Redux自身功能'
        },
    ];
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
            <h3>What is Redux</h3>
            {/*<Divider orientation="left">What is Redux</Divider>*/}
            <p>Redux 是 JavaScript 状态容器，提供可预测化的状态管理。可预测化可以理解为：例如根据权限定义系统的菜单结构</p>
            <h3>要点</h3>
            <div className={"g-flex-row"} style={{marginBottom: 10}}>
                <Card title="数据源Store" style={{ width: "33%" }}>
                    <Collapse expandIconPosition={"left"}>
                        <Panel header="createStore" key="1" extra={this.getExtra()}>
                            createStore一般使用方法：createStore(reducer, applyMiddleware(thunk));<br/>
                            传递默认state值：createStore(reducer, defaultState, applyMiddleware(thunk))<br/>
                            <Table rowKey={(record,index) => (GlobalTool.getRowKey(record,index))} columns={this.columns1} dataSource={this.dataSource1} size="small" pagination={false}/>
                        </Panel>
                        <Panel header="getState" key="2" extra={this.getExtra()}>
                            state.getState()：获取state对象
                        </Panel>
                        <Panel header="dispatch(action)" key="3" extra={this.getExtra()}>
                            sate.dispatch(action)：更新state，在ui层调用，传入描述对象action。内部调用reducers实现state的更新
                        </Panel>
                        <Panel header="subscribe(listener)" key="4" extra={this.getExtra()}>
                            sate.subscribe(listener)：订阅者模式（订阅者-发布机制）通知UI，做出对应的改变，感觉和NodeJs的EventEmitter类似，用于监听state的修改<br/>
                            项目中如果使用了Redux的Provider和connect可省略此方法，因为connect源码中componentDidMount添加了事件this.store.subscribe(this.handleChange)，实现页面交互<br/>
                            其底层实现为subscribe主要维护listeners数组（负责listeners的添加和销毁操作），当页面调用dispatch时，执行所有的listeners。查看源码得知，dispatch就是一顿循环加执行。
                        </Panel>
                        <Panel header="replaceReucer(action)" key="5" extra={this.getExtra()}>
                            替换reducer，改变state更新逻辑
                        </Panel>
                        <Panel header="代码示例" key="5" extra={this.getExtra()}>
                            <pre>
                                <code>
                                    <span>pre和code标签，看看啥效果。Markdown编辑器是如何生成html标签的？ <br/>
                                    Markdown编辑器实现：<a href='https://www.jianshu.com/p/20f137e2b8c9'>https://www.jianshu.com/p/20f137e2b8c9</a></span>
                                    <br/>
                                </code>
                                {`
let reducers = (state = MenuState, action) = &#62; {
    switch (action.type) {
       case SHOW_MENU:
            return state;
       default:
            return state;
    }
}
let action = {
    type: SHOW_MENU,
    payload: value
};
let store = createStore(reducers);
store.getState();
store.dispatch(action);
store.subscribe((value) = &#62; {
   this.setState({state: value});
});
                                `}
                            </pre>
                        </Panel>
                    </Collapse>
                </Card>
                <Card title="描述对象Action" style={{ width: "33%" }}>
                    因为Redux并不知道你的应用程序里会作什么动作，需要有一个明确说明有哪些动作的地方，在运作时以这个对照表为基准。
                    描述对象格式：{'\u007b'} type,payload{'\u007d'}
                    <br/>
                    <div className={"g-text-mark"}>
                        payload：它是负载或有效数据的意思，Payload用在计算机科学的意思，是指在数据传输时的"有效数据"部份。
                        actionCreator：一种实现视图Action的简洁方法。最好的使用方法：bindActionCreators，它是一个柯里化函数（高阶函数）。<br/>
                        bindActionCreators：实现原理（主要就一行代码） return dispatch(actionCreator.apply(this, arguments))
                    </div>
                    <Collapse expandIconPosition={"left"}>
                        <Panel header="actionCreator" key="1" extra={this.getExtra()}>
                            在大型项目中，直接把action写在组件中，会很散乱，改和找都不好，所以如果action多了的话，建议在 /src/store/actionCreator.js 中统一管理
                        </Panel>
                        <Panel header="代码示例" key="2" extra={this.getExtra()}>
                            <pre>
                                {`
export const changeViewLoading = (value?: any) => ({
    type: LOADING_VIEW,
    payload: {
        loading: value
    }
})
                                `}
                            </pre>
                        </Panel>
                    </Collapse>
                </Card>
                <Card title="纯函数Reducers" style={{ width: "33%" }}>
                    Redux的Action处理方法，一个纯函数，只负责判断后返回state。当调用store.dispatch(action)时，源码中的实现方法很简单，
                    就是调用createStore传入的第一个参数（reducer）<br/>
                    <div className={"g-text-mark"}>
                        纯函数是指执行没有副作用的js函数，即参数相同得到的结果永远相同
                    </div>
                    <Collapse expandIconPosition={"left"}>
                        <Panel header="代码示例" key="2" extra={this.getExtra()}>
                            <pre>
                                {`
const MenuReducers = (state = MenuState, action) => {
    switch (action.type) {
        case SHOW_MENU:
            return state;
        default:
            return state;
    }
};
                                `}
                            </pre>
                        </Panel>
                    </Collapse>
                </Card>
            </div>
            <h3>Redux三大原则</h3>
            <div className={"g-flex-row"} style={{marginBottom: 10}}>
                <Card title="单一数据源" style={{ width: "33%" }}>
                    整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。
                    创建唯一Store使用createStore()方法，createStore一般使用方法：createStore(reducer, applyMiddleware(thunk));，传递默认state值：createStore(reducer, defaultState, applyMiddleware(thunk))
                </Card>
                <Card title="State 是只读的" style={{ width: "33%" }}>
                    唯一改变 state 的方法就是触发 action（Store.dispatch(Action描述对象)），action 是一个用于描述已发生事件的普通对象。<br/>
                    这样确保了视图和网络请求都不能直接修改 state，它们只能表达想要修改的意图。所有的修改都被集中化处理，且严格按照一个接一个的顺序执行。
                </Card>
                <Card title="Reducers使用纯函数来执行" style={{ width: "33%" }}>
                    为了描述 action 如何改变 state tree ，你需要编写 reducers。Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state。<br/>
                    刚开始你可以只有一个 reducer，随着应用变大，你可以把它拆成多个小的 reducers，分别独立地操作 state tree 的不同部分。
                </Card>
            </div>
            <Tag color="#87d068">Action</Tag>
            <Tag color="#108ee9">Reducers</Tag>
            <Tag color="#2db7f5">Store</Tag>
        </>
    }
}