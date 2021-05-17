import * as React from "react";
import { Tag, Divider, Card, Table, Collapse, Select, Steps } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import {connect} from "react-redux";
import {GlobalTool} from "../../tools/global-tool";
import {bindActionCreators} from "redux";
const { Panel } = Collapse;
const { Option } = Select;
const { Step } = Steps;

// @ts-ignore
@connect(state => ({ loading: state[0] }))
export class ReduxMiddleView extends React.Component<any, any> {
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
            <h3>什么是Redux自动化</h3>
            <p>了解自动化前先来看看Redux的基本使用流程，并看一下自动化操作后的对比视图</p>
            <div className={"g-flex-row"} style={{}}>
                <Steps current={3} direction="vertical" style={{flexBasis: '70%'}}>
                    <Step title="根据reducers创建唯一数据源" description="createStore(reducers...)" />
                    <Step title="UI更新state时调用dispatch传入actions" description="store.dispatch(action)" />
                    <Step title="UI订阅state调用并更新UI" description="store.subscribe(() => this.setState())" />
                </Steps>
                <Steps current={3} direction="vertical" style={{flexBasis: '70%'}}>
                    <Step title="根据reducers创建唯一数据源" description="createStore(reducers...)" />
                    <Step title="UI更新state时调用dispatch传入actions" description="store.dispatch(action)" />
                    <Step title="UI自动计算state并渲染" description="this.props.state" />
                </Steps>
                <Card title="自动化具体实现" style={{flexBasis: '100%'}}>
                    Redux的使用离不开Provider（容器组件）和connect（高阶组件）这两个组件。<br/>
                    其中Provider的主要作用是使数据全局化（即所有的子组件都可以访问Provider定义的数据），其原理采用React的context上下文实现。<br/>
                    connect作为一个高阶组件接受当前组件，返回一个被connect处理过的组件，其处理过程如下
                </Card>
            </div>

            <h3>具体实现</h3>
            <div className={"g-flex-row"} style={{marginBottom: 10}}>
                <Card title="Provider" style={{ width: "33%" }}>
                    Provider作为一个容器组件，其内部主要采用React.context实现。其实就是基于React.context Provider实现的<br/>
                    关于手动实现一个Provider可以定位到 src/views/manual-redux/automatic-static 目录。后续我会把这些测试代码放到git中进行管理。
                </Card>
                <Card title="connect" style={{ width: "33%" }}>
                    connect作为一个高阶组件，主要接受2个参数，第三个参数有啥用？参数定义如下：
                    <Collapse expandIconPosition={"left"}>
                        <Panel header="[mapStateToProps(state, [ownProps]): stateProps] (Function)" key="1" extra={this.getExtra()}>
                            作用是把store复制到组件的props中，组件内部就可以就使用this.props[store]来直接访问redux数据。
                            当 state | ownProps变化时，mapStateToProps 都会被调用，计算出一个新的 stateProps。<br/>
                            这点体现在connect源码中的componentWillMount，源码中会通过store.subscribe注册一个监听，监听函数为_updateProps，
                            _updateProps函数会重新执行mapStateToProps和mapDispatchToProps。参考代码好理解。网页中暂时就不贴代码了。<br/>
                            <div className={"g-text-mark"}>
                                返回的结果必须是一个纯对象，这个对象会与组件的 props 合并。
                            </div>
                        </Panel>
                        <Panel header="[mapDispatchToProps(dispatch, [ownProps]): dispatchProps] (Object or Function)" key="2" extra={this.getExtra()}>
                            用来建立UI组件的参数到store.dispatch方法的映射。,可以是一个object，也可以传入函数。<br/>
                            如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，对象所定义的方法名将作为属性名；
                            每个方法将返回一个新的函数，函数中 dispatch 方法会将 action creator 的返回值作为参数执行。这些属性会被合并到组件的
                            props 中。<br/>
                            函数主要通过bindActionCreators(actionCreators,dispatch)实现。bindActionCreators的实现原理也非常简单，
                            循环每个actionCreators的同时，使用一个函数包装dispatch(actionCreators[i])并返回。
                        </Panel>
                        <Panel header="[mergeProps(stateProps, dispatchProps, ownProps): props] (Function)" key="3" extra={this.getExtra()}>
                            如果指定了这个参数，mapStateToProps() 与 mapDispatchToProps() 的执行结果和组件自身的 props 将传入到这个回调函数中。
                            该回调函数返回的对象将作为 props 传递到被包装的组件中。你也许可以用这个回调函数，根据组件的 props 来筛选部分的 state 数据，
                            或者把 props 中的某个特定变量与 action creator 绑定在一起。如果你省略这个参数，默认情况下返回
                            Object.assign({}, ownProps, stateProps, dispatchProps) 的结果。
                        </Panel>
                        <Panel header="[options] (Object)" key="4" extra={this.getExtra()}>
                            如果指定这个参数，可以定制 connector 的行为。
                        </Panel>
                    </Collapse>
                </Card>
                <Card title="纯函数Reducers" style={{ width: "33%" }}>
                    Redux的Action处理方法，一个纯函数，只负责判断后返回state。当调用store.dispatch(action)时，源码中的实现方法很简单，
                    就是调用createStore传入的第一个参数（reducer）<br/>
                    <b style={{color: "red"}}>*</b>纯函数是指执行没有副作用的js函数，即参数相同得到的结果永远相同
                </Card>
            </div>
            <Tag color="#87d068">Action</Tag>
            <Tag color="#108ee9">Reducers</Tag>
            <Tag color="#2db7f5">Store</Tag>
        </>
    }
}