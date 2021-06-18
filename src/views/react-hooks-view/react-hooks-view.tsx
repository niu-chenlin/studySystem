import * as React from "react";
import { connect } from "react-redux";
import { changeViewLoading } from "../../redux/actions/ViewActionCreator";
import { Example, ExampleEffectHook, ExampleUseState, StaticButton } from "../hooks-test/hooks-test";
import { ExampleClass } from "../hooks-test/hook-state";
import { TestHookRule } from "../hooks-test/hooks-rule";
import {
    LanguageTeacher,
    MathematicsTeacher,
    TestCourseClass,
    TestUpdatePropsOrStateClass
} from "../hooks-test/hook-custom";
import { TestHookReducer } from "../hooks-test/hook-redux";
import {
    Counter, Parent, SetDOMByCallBaskRef,
    TestHookUseEffect,
    TestHookUseState,
    TestUseContext, TestUseEffectAndUseLayoutEffect,
    TestUseReducer, UseRefCounter, UseRefCounter1,
    WithoutMemo
} from "../hooks-test/hook-api";

import { Tabs, Spin } from 'antd';
import { ReactHooksBaseView } from "./react-hooks-base-view";
import { TestAntdFilter } from "./test-antd-filter";
const { TabPane } = Tabs;

// @ts-ignore
@connect(state => ({ loading: state[0] }))
export class ReactHooksView extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(changeViewLoading(true));
        setTimeout(() => {
            this.props.dispatch(changeViewLoading(false));
        }, 500);
    }

    render() {
        return <div id="hooks-view">
            {/*<h3>先不着急加入学习系统，我们先来搞懂代码</h3>*/}
            {/*<ExampleUseState/>*/}
            {/*<ExampleEffectHook/>*/}
            {/*<TestHookRule/>*/}
            {/*<ExampleClass/>*/}
            {/*<User/>*/}
            {/*<Button11/>*/}
            {/*<StaticButton/>*/}
            {/*<MathematicsTeacher/>*/}
            {/*<LanguageTeacher/>*/}
            {/*<TestCourseClass/>*/}
            {/*<TestHookReducer/>*/}
            {/*<TestHookUseState/>*/}
            {/*<TestHookUseEffect/>*/}
            {/*<TestUseContext/>*/}
            {/*<Counter/>*/}
            {/*<TestUseReducer/>*/}
            {/*<WithoutMemo/>*/}
            {/*<Parent/>*/}
            {/*<UseRefCounter/>*/}
            {/*<UseRefCounter1/>*/}
            {/*<TestUpdatePropsOrStateClass/>*/}
            {/*<SetDOMByCallBaskRef/>*/}
            {/*<TestUseEffectAndUseLayoutEffect/>*/}
            <Tabs defaultActiveKey="1">
                <TabPane tab="基本用法及简介" key="1">
                    <ReactHooksBaseView/>
                </TabPane>
                <TabPane tab="实现" key="2">
                    <TestAntdFilter/>
                </TabPane>
            </Tabs>
        </div>
    }
}