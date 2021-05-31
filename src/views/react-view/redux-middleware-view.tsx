import * as React from "react";
import { connect } from "react-redux";


// @ts-ignore
@connect(state => ({ loading: state[0] }))
export class ReduxMiddlewareView extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return <>
            <h3>Redux中间件（applymiddleware）及其原理</h3>
            <p>dispatch一个action之后，到达reducer之前，进行一些额外的操作，就需要用到middleware。 你可以利用 Redux middleware 来进行日志记录、
                创建崩溃报告、调用异步接口或者路由等等。 换言之，中间件都是对store.dispatch()的增强。</p>

        </>
    }
}