import * as React from "react";

export class TestSonComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        console.log("组件实例重新创建了");
    }
    componentWillReceiveProps(nextProps: Readonly<any>, nextContext: any): void {
        console.log("组件的props发生了改变");
    }
    componentWillUnmount(): void {
        console.log("组件即将销毁掉");
    }

    render() {
        return <div>This is test son component</div>
    }
}
