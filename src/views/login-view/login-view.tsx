import * as React from "react";

export class LoginView extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        console.log(this.props);
    }
    render() {
        return <div>This is login view</div>
    }
}
