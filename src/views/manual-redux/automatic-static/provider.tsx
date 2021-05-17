import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Redux的Provider组件实现，简单的一批
 * 就是使用React的context包装一下
 * 定义context的propTypes（入参），
 * this.props.children就是当前组件包装的任何数据，类似与Vue的“槽”的概念，
 */
export class Provider extends Component<any, any> {
    // 对于消费者来说，也就是消费者，需要声明propTypes对象，也就是入参数据
    static propTypes = {
        store: PropTypes.object,
        children: PropTypes.any
    };

    // 对于父组件来说，也就是生产者，需要声明childContextTypes对象，来提供给子组件需要用到的公共数据；出参数据
    static childContextTypes = {
        store: PropTypes.object
    };

    getChildContext () { // 指定子组件可以使用的信息
        return {
            store: this.props.store
        }
    }

    render () {
        return (
            <div>{this.props.children}</div>
        )
    }
}