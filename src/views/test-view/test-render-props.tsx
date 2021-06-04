
class Cat extends React.Component<any> {
    render() {
        const mouse = this.props.mouse;
        return (
            <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
        );
    }
}

class Mouse extends React.Component<any> {
    constructor(props) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = { x: 0, y: 0 };
    }

    handleMouseMove(event) {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }

    render() {
        return (
            <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

                {/*
          使用 `render`prop 动态决定要渲染的内容，
          而不是给出一个 <Mouse> 渲染结果的静态表示
          render props就是利用props定义一个回调，在组件内部去调用获取值即可
           任何被用于告知组件需要渲染什么内容的函数 prop 在技术上都可以被称为 “render prop”.
           缺点：复用状态逻辑很难 -- handleMouseMove
        */}
                {this.props.render(this.state)}
            </div>
        );
    }
}

class MouseTracker extends React.Component<any> {
    render() {
        return (
            <div>
                <h1>移动鼠标!</h1>
                <Mouse render={mouse => (
                    <Cat mouse={mouse} />
                )}/>
            </div>
        );
    }
}