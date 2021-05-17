import * as React from "react";
import {Consumer} from "./react-context-view";


export class GrandsonView extends React.Component<any, any> {
    // static contextType = ThemeContext;
    constructor(props: any) {
        super(props);
        console.log(this.context);
        console.log(GrandsonView.contextType);
    }
    render() {
        return <div>
            <Consumer>
                {
                    (name) => {
                        //较于子组件的回调，我这里用了另一种，也可以实现。
                        return (
                            <>
                                <hr />
                                <h3>孙组件</h3>
                                <p>获取爷组件的值:{name}</p>
                            </>
                        )
                    }
                }
            </Consumer>
        </div>
    }
}