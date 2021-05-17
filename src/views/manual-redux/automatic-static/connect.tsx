import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * 手动实现Redux自动Store方法，其核心实现是采用React的Context
 * connect的作用是采用ReactContext把state自动关联到组件的props，并在Store更新是自动执行Redux的subscribe
 * （subscribe是一种订阅者模式，其内部实现没什么高级，就是先对监听函数进行存储listens.push(...)，当store调用dispatch是粗暴的遍历listens挨个执行注册的监听器）
 * @param mapStateToProps
 * @param mapDispatchToProps
 * @param WrappedComponent -- 这个是你要包装的组件
 */
export const connect = (mapStateToProps: Function, mapDispatchToProps: Function) => (WrappedComponent) => {
    class Connect extends Component<any, any> {
        static contextTypes = {
            store: PropTypes.object
        };
        constructor (props: any) {
            super(props);
            this.state = {
                allProps: {}
            }
        }
        componentWillMount () {
            const { store } = this.context;
            this._updateProps();
            store.subscribe(() => this._updateProps()); // 注册监听。当UI调用store.dispatch(action) 后会自动把store数据源更新到包装组件的props
        }
        _updateProps() {
            const { store } = this.context;
            // 这个方法主要作用是：绑定context中的store到props中，这样在组件中使用this.props就可以调用store的数据源
            let stateProps = mapStateToProps
                ? mapStateToProps(store.getState(), this.props) : {};
            // 这个操作的意思是 如果定义了mapDispatchToProps方法，那就执行它，其主要作用是为Actions绑定dispatch，让程序员不用每次都显示的调用dispatch
            let dispatchProps = mapDispatchToProps ?
                mapDispatchToProps(store.dispatch, this.props) : {};
            this.setState({
                allProps: {
                    ...stateProps,
                    ...dispatchProps,
                    ...this.props
                }
            });
        }
        render () {
            // 最后把获取到的state注入到包装组件的props中
            return <WrappedComponent {...this.state.allProps} />
        }

    }
    return Connect
}