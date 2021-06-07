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
    Counter, Parent,
    TestHookUseEffect,
    TestHookUseState,
    TestUseContext,
    TestUseReducer, UseRefCounter, UseRefCounter1,
    WithoutMemo
} from "../hooks-test/hook-api";

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
            <h3>先不着急加入学习系统，我们先来搞懂代码</h3>
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
            <TestUpdatePropsOrStateClass/>
        </div>
    }
}