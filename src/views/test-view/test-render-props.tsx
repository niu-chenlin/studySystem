//
// class Cat extends React.Component<any> {
//     render() {
//         const mouse = this.props.mouse;
//         return (
//             <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
//         );
//     }
// }
//
// class Mouse extends React.Component<any> {
//     constructor(props) {
//         super(props);
//         this.handleMouseMove = this.handleMouseMove.bind(this);
//         this.state = { x: 0, y: 0 };
//     }
//
//     handleMouseMove(event) {
//         this.setState({
//             x: event.clientX,
//             y: event.clientY
//         });
//     }
//
//     render() {
//         return (
//             <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
//
//                 {/*
//           使用 `render`prop 动态决定要渲染的内容，
//           而不是给出一个 <Mouse> 渲染结果的静态表示
//           render props就是利用props定义一个回调，在组件内部去调用获取值即可
//            任何被用于告知组件需要渲染什么内容的函数 prop 在技术上都可以被称为 “render prop”.
//            缺点：复用状态逻辑很难 -- handleMouseMove
//         */}
//                 {this.props.render(this.state)}
//             </div>
//         );
//     }
// }
//
// class MouseTracker extends React.Component<any> {
//     render() {
//         return (
//             <div>
//                 <h1>移动鼠标!</h1>
//                 <Mouse render={mouse => (
//                     <Cat mouse={mouse} />
//                 )}/>
//             </div>
//         );
//     }
// }
//
//
//
//
// // render props 使用children
// class CountNumber extends React.Component {
//     state = { count: this.props.initNumber };
//     add = () => this.setState({ count: this.state.count + 1 });
//     minus = () => this.setState({ count: this.state.count - 1 });
//
//     render() {
//         // @ts-ignore
//         return this.props.children({
//             count: this.state.count,
//             add: this.add.bind(this),
//             minus: this.minus.bind(this)
//         })
//     }
// }
// // render比高阶组件更为强大，但是也有一个小小的缺点，就是难以优化。因为组件内部是一个匿名函数，
// // 这就导致即便传入的属性没有任何变化，内部的子组件还是会整个渲染一遍。解决方法就是将该匿名函数再次包装，不过每次都这样做终究还是比较麻烦的。
// export function RenderProps() {
//     return (
//         <div style={{flex:1,alignItems:'center',justifyContent:'center'}}>
//             <CountNumber initNumber={0}>
//                 {
//                     ({count,add,minus})=>
//                         <>
//                             {/*<Text>You clicked {count} times</Text>*/}
//                             {/*<button onPress={add} title={'add'}/>*/}
//                             {/*<Button onPress={minus} title={'minus'}/>*/}
//                             {/*<Button onPress={changeTheme} title={'ChangeTheme'}/>*/}
//                         </>
//                 }
//                 {
//                     ({count,add,minus})=> {  // 自定义属性 - 重新赋值 只要在属性传进组件之前，赋值给新的变量就可以了。
//                         const num=count;
//                         const addNum=add;
//                         const minusNum=minus;
//                         return (
//                             {/*<>*/}
//                                 {/*<Text>You clicked {num} times</Text>*/}
//                                 {/*<Button onPress={addNum} title={'add'}/>*/}
//                                 {/*<Button onPress={minusNum} title={'minus'}/>*/}
//                                 {/*<Button onPress={changeTheme} title={'ChangeTheme'}/>*/}
//                             {/*</>*/}
//                         )
//                     }
//                 }
//
//             </CountNumber>
//         </div>
//     );
// }