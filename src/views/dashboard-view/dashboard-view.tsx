import * as React from "react";
import { TestSonComponent } from "./test-son-component";
import { TestSonComponent1 } from "./test-son-component1";

export class DashboardView extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            btnValue: "change it.",
            testSonComponent: [ // 使用固定的key来表示那些节点是贯穿整个生命周期保持不变的，包括子节点
                <TestSonComponent key='1'/>,
                <TestSonComponent1 key='2'/>
            ]
        }
    }
    changeSonComponent() {
        // let testSonComponent = this.state.testSonComponent.reverse();
        // console.log(testSonComponent);
        let testSonComponent = [ // 类似于这种，只要加上key，哪怕重新赋值也不会导致组件实例被销毁
            <TestSonComponent1 key='2'/>,
            <TestSonComponent key='1'/>
        ];
        this.setState({testSonComponent: testSonComponent, btnValue: "aaaaa"});
    }
    render() {
        return <div>
            {this.state.btnValue}
            <button onClick={() => this.changeSonComponent()}>change this state</button>
            {this.state.testSonComponent}
        </div>
    }
}
