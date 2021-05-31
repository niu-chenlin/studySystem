import * as React from "react";
import PropTypes from 'prop-types';
import {Consumer} from "./react-context-view";
import {GrandsonView} from "./grandson-view";

export class SonView extends React.Component<any, any> {
    static contextTypes: any;
    constructor(props: any) {
        super(props);
    }

    render() {
        console.log(this.context);
        return <div>
            <Consumer>
                {
                    // 回调函数，第一个参数（自定义）可以取到父组件注入的值。
                    (name) =>
                        <>
                            <hr />
                            <h2>子组件</h2>
                            <p> 获取父组件的值:{name}</p>
                            <GrandsonView />
                        </>
                }
            </Consumer>
        </div>
    }
}

// SonView.contextTypes = {
//     name: PropTypes.string
// };