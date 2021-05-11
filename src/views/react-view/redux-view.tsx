import * as React from "react";

interface ReduxViewStates {

}
export class ReduxView extends React.Component<any, ReduxViewStates> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return <div>This is redux view</div>
    }
}