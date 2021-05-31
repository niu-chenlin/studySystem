import * as React from "react";
import { Tabs, Spin } from 'antd';
import {ReduxBaseView} from "./redux-base-view";
import {connect} from "react-redux";
import {changeViewLoading} from "../../redux/actions/ViewActionCreator";
import {bindActionCreators} from "redux";
import {ReduxMiddleView} from "./redux-middle-view";
import { ReduxMiddlewareView } from "./redux-middleware-view";
import { ReduxAsyncView } from "./redux-async-view";
const { TabPane } = Tabs;

interface ReduxViewStates {

}
const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
        changeViewLoading: changeViewLoading
    }, dispatch);
}
// @ts-ignore
@connect(state => ({ loading: state[0] }), mapDispatchToProps)
export class ReduxView extends React.Component<any, ReduxViewStates> {
    constructor(props: any) {
        super(props);
    }
    componentDidMount() {
        // 模拟API请求，注意setState在setTimeout为同步操作（即立即更新state），如果同步更新state那么渲染的执行时机是什么样子的
        // this.props.dispatch(changeViewLoading(true));
        this.props.changeViewLoading(true);
        setTimeout(() => {
            // this.props.display(changeViewLoading(false));
            this.props.changeViewLoading(false);
        }, 1000);
    }

    callback(key) {
        console.log(key);
    }
    render() {
        return (
            <div>
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="基本用法及简介" key="1">
                        <ReduxBaseView/>
                    </TabPane>
                    <TabPane tab="Redux自动化及异步简介" key="2">
                        <ReduxMiddleView/>
                    </TabPane>
                    <TabPane tab="Redux applymiddleware 中间件及异步操作" key="3">
                        <ReduxAsyncView/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}