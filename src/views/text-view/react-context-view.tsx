import * as React from "react";
import {SonView} from "./son-view";
import PropTypes from 'prop-types';

export const {Provider,Consumer} = React.createContext("默认名称");
export class ReactContextView extends React.Component<any, any> {
    // static childContextTypes: any;
    constructor(props: any) {
        super(props);
        this.state = { value: '' }
    }
    // 对于父组件来说，也就是生产者，需要声明childContextTypes对象，来提供给子组件需要用到的公共数据；
    // 其次，还需要实例化getChildContext方法，返回一个纯对象，一定要注意的是父组件在getChildContext方法中定义数据的时候，
    // 一定要先在childContextTypes中进行声明，否则会报错；

    // 实例化getChildContext方法，返回一个纯对象 返回context对象， 指定子组件可以使用的信息
    // 注意：如果context的值是动态的采用state管理，更改某个context值时，改变根组件的state
    // getChildContext() {
    //     return {
    //         name: "默认名称"
    //     }
    // };

    // static childContextTypes = {
    //     propA: PropTypes.string
    // };
    // getChildContext () {
    //     return {
    //         propA: this.state.propA
    //     }
    // }
    render() {
        return <>
            <Provider value='我是要传递的值！'>
                <h2>父组件</h2>
                <SonView />
            </Provider>
        </>
    }
}
// 16.3之前的版本需要定义getChildContext childContextTypes等这些东西，16.3之后无需理会
// getChildContext 指定的传递给子组件的属性需要先通过 childContextTypes 来指定，不然会产生错误
// childContextTypes = ...
// 如果某个组件更改了父组件的某个属性值，那么父组件将会重新render组件树，如果期间有一个子组件没有用到context中的这个属性，
// 并定义了shouldComponentUpdate，那和这个子组件的子孙组件就不会重新render，这样就会很危险，而新版本的context api却弥补了这个问题，
// 即使其中的某个组件没有数据更新，也会影响到子孙组件，就是通过一个Provider来支持多个Consumer子组件的数据传递；