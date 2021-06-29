import * as React from "react";
import { Table } from 'antd';
import { DndProvider, DragSource, DropTarget, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

function renderSource({connectDragSource}) {
    return connectDragSource(<div style={{
        width: '40%',
        height: '100%',
        border: '1px solid gray',
        cursor: 'move'
    }}>
        我想被拖动
    </div>)
}
function renderTarget({connectDropTarget}) {
    return connectDropTarget(<div style={{
        width: '40%',
        height: '100%',
        border: '1px solid gray'
    }}>
        拖动到这里
    </div>)
}
const rowSource = { // spec：必填。一个普通的JavaScript对象，上面有一些允许的方法。它描述了拖动源如何对拖放事件做出反应。
    beginDrag(props) { // 必填
        console.log("开始拖动");
        console.log(props);
        return {
            index: props.index,
        };
    },
    // endDrag(props, monitor, component) { }
    // canDrag(props, monitor) { }
    // isDragging(props, monitor) { }
};
const rowTarget = {
    drop(props, monitor) {
        console.log("放置回调");
        console.log(props);
        props.onDrop();
        // const dragIndex = monitor.getItem().index;
        // const hoverIndex = props.index;
        // if (dragIndex === hoverIndex) {
        //     return;
        // }
        // props.moveRow(dragIndex, hoverIndex);
        // monitor.getItem().index = hoverIndex;
    },
};
class BodyDiv extends React.Component {
    render() {
        // @ts-ignore
        const { isOver, connectDragSource, connectDropTarget } = this.props;
        let color = 'black';
        if(isOver) {
            color = 'red';
        }
        return connectDragSource(
            connectDropTarget(<div style={{color}}>
                请拖动
            </div>),
        );
    }
}
const SourceDiv = DragSource('div', rowSource, connect => ({
    // 这里返回的值注入到props中
    index: 102,
    connectDragSource: connect.dragSource()
}))(renderSource);

const TargetDiv: any = DropTarget('div', rowTarget, (connect, monitor) => ({
    // 这里返回的值注入到props中
    index: 101,
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    onDrop: "11111"
}))(renderTarget);

const DragableBodyDiv = DropTarget('div', rowTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
}))(
    DragSource('div', rowSource, connect => ({ // 使组件能够被拖
        connectDragSource: connect.dragSource(),
        // dragPreview()：返回一个函数，传递给组件用来将拖动时预览的 DOM 节点 和 React DnD Backend 连接起来
    }))(BodyDiv)
);
export class DndDiv extends React.Component<any, any> {
    state = {
        isDrop: false
    };
    onDrop() {
        console.log("onDrop...");
        this.setState({isDrop: true});
    }
    render() {

        return <DndProvider backend={HTML5Backend}>
            <div
                style={{
                    width: '40%',
                    height: '200px',
                    display: 'flex',
                    flexWrap: 'wrap'
                }}>
                {
                    this.state.isDrop ?
                        <>
                            <SourceDiv/>
                            <SourceDiv/>
                        </> :
                        <>
                            <SourceDiv/>
                            <TargetDiv onDrop={() => this.onDrop()}/>
                        </>
                }
                {/*<DragableBodyDiv/>*/}
                {/*<DragableBodyDiv/>*/}
                {/*<DragableBodyDiv/>*/}
                {/*<DragableBodyDiv/>*/}
                {/*<DragableBodyDiv/>*/}
            </div>
        </DndProvider>
    }
}