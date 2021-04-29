import * as React from "react";
import store from "../redux-demo/store";


class ReduxDemoView extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            items: store.getState()
        }
        store.subscribe(() => { // 此方法采用订阅者模式 订阅store的更新
            this.setState({
                items: store.getState()
            });
            console.log(store.getState());
        })
    }
    onAdd() {
        const itemText: any = document.getElementById('itemtext');
        store.dispatch({type: 'ADD_ITEM', text: itemText.value}); // 2.调用store的dispatch传入一个Action 和要跟新的state
    }

    render() {
        return <div className={'App'}>
            <input type='text' id='itemtext'/>
            <button onClick={(event) => this.onAdd()}>AddItem</button>
            <ul>
                {
                    this.state.items.map(item => (
                        item ? <li>${item}</li> : ''
                    ))
                }
            </ul>
        </div>
    }
}

export default ReduxDemoView;


// withRouter是一个高阶组件 作用是使用<Router>包装一个普通组件，
// 然后react-router的三个对象history, location, match就会被放进这个组件的props属性中 实现方法：
// <Router conponent=MainView>
// 这里我们主要做Router的一种传递
