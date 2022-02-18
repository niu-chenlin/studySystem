import * as React from "react";

export class TestSonComponent1 extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        console.log("组件实例重新创建了111");
    }
    componentWillReceiveProps(nextProps: Readonly<any>, nextContext: any): void {
        console.log("组件的props发生了改变111");
    }
    componentWillUnmount(): void {
        console.log("组件即将销毁掉111");
    }

    render() {
        return <div>This is test son component11111111111</div>
    }
}
