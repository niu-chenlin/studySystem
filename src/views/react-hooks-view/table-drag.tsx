import * as React from "react";
import { Table } from 'antd';
import { DndProvider, DragSource, DropTarget, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import emitEvent from "./drag-game";

const ItemTypes = { // 定义项目类型 - 为可拖动的项目类型创建常量
    KNIGHT: 'knight'
};
function Knight() {
    // @ts-ignore
    // const [{isDragging}, drag] = useDrag(() => ({
    //     type: ItemTypes.KNIGHT,
    //     collect: monitor => ({
    //         isDragging: !!monitor.isDragging(),
    //     }),
    // }));
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.KNIGHT },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    return <div
        ref={drag}
        style={{
            opacity: isDragging ? 0.5 : 1,
            fontSize: 25,
            fontWeight: 'bold',
            cursor: 'move',
        }}
    >
        ♘
    </div>
    // return  <span>♘</span>
}
function BoardSquare({ x, y, children }) {
    const black = (x + y) % 2 === 1;
    const [{ isOver }, drag] = useDrop({
        accept: ItemTypes.KNIGHT,
        drop: () => handleSquareClick(x, y),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });
    return <div
        ref={drag}
        style={{
            position: 'relative',
            width: '100%',
            height: '100%',
        }}
    >
        <Square black={black}>{children}</Square>
        {isOver && (
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                    opacity: 0.5,
                    backgroundColor: 'yellow',
                }}
            />
        )}
    </div>
    // return <Square black={black}>{children}</Square>
}
function Square({black, children}) {
    const fill = black ? 'black' : 'white';
    const stroke = black ? 'white' : 'black';

    return <div style={{
        backgroundColor: fill,
        color: stroke,
        width: '80px',
        height: '80px'
    }} >{children}</div>
}
function Board({knightPosition}) {
    const squares = [];
    for (let i = 0; i < 64; i++) {
        squares.push(renderSquare(i, knightPosition));
    }
    return <DndProvider backend={HTML5Backend}>
        <div
            style={{
                width: '40%',
                height: '100%',
                display: 'flex',
                flexWrap: 'wrap'
            }}>
            {squares}
        </div>
    </DndProvider>
}
function renderPiece(x, y, [knightX, knightY]) {
    if (x === knightX && y === knightY) {
        return <Knight />
    }
}
function renderSquare(i, [knightX, knightY]) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    // const isKnightHere = x === knightX && y === knightY;
    // const black = (x + y) % 2 === 1;
    // const piece = isKnightHere ? <Knight /> : null;
    return <div key={i} onClick={() => handleSquareClick(x, y)}>
        {/*<Square black={black}>{piece}</Square>*/}
        <BoardSquare x={x} y={y}>
            {renderPiece(x, y, [knightX, knightY])}
        </BoardSquare>
    </div>
}
function handleSquareClick(x, y) {
    emitEvent.$emit("moveKnight", [x, y]);
}
export class DragSortingTable extends React.Component<any, any>  {
    constructor(props) {
        super(props);
        this.state = {
            knightPosition: [0, 0]
        }
    }
    componentDidMount(): void {
        // observe((knightPosition) => {
        //     console.log(this);
        //     console.log(knightPosition);
        //     this.setState({knightPosition});
        // })
        emitEvent.$on("moveKnight", (knightPosition) => {
            this.setState({knightPosition});
            // if(this.canMoveKnight(knightPosition[0], knightPosition[1], this.state.knightPosition)) {
            //     this.setState({knightPosition});
            // }
        });
    }
    canMoveKnight(toX, toY, knightPosition) {
        const [x, y] = knightPosition;
        const dx = toX - x;
        const dy = toY - y;

        return (
            (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
            (Math.abs(dx) === 1 && Math.abs(dy) === 2)
        )
    }
    render() {
        return (
            <Board knightPosition={this.state.knightPosition} />
        );
    }
}


let dragingIndex = -1;
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];
const rowTarget = {
    drop(props, monitor) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;
        if (dragIndex === hoverIndex) {
            return;
        }
        props.moveRow(dragIndex, hoverIndex);
        monitor.getItem().index = hoverIndex;
    },
};
const rowSource = { // spec：必填。一个普通的JavaScript对象，上面有一些允许的方法。它描述了拖动源如何对拖放事件做出反应。
    beginDrag(props) { // 必填
        dragingIndex = props.index;
        // 您必须返回描述被拖动数据的纯 JavaScript 对象。您返回的内容会被放置到 monitor.getItem() 获取到的对象中。
        // 参数：
        // props：当前组件的 props
        // monitor：一个 DragSourceMonitor 实例。使用它来查询有关当前拖动状态的信息，例如当前拖动的项目及其类型，当前和初始坐标和偏移，以及它是否已被删除。
        // component：指定时，它是组件的实例。使用它来访问底层DOM节点以进行位置或大小测量，或调用 setState 以及其他组件方法。isDragging、
        // canDrag 方法里获取不到 component 这个参数，因为它们被调用时实例可能不可用
        return {
            index: props.index,
        };
    },
    // endDrag(props, monitor, component) { }
    // canDrag(props, monitor) { }
    // isDragging(props, monitor) { }
};
class BodyRow extends React.Component {
    render() {
        // @ts-ignore
        const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;
        // @ts-ignore
        const style = { ...restProps.style, cursor: 'move', color: 'red'};

        // @ts-ignore
        let { className } = restProps;
        if (isOver) {
            // @ts-ignore
            if (restProps.index > dragingIndex) {
                className += ' drop-over-downward';
            }
            // @ts-ignore
            if (restProps.index < dragingIndex) {
                className += ' drop-over-upward';
            }
        }
        console.log(isOver, connectDragSource, connectDropTarget, moveRow);
        return connectDragSource(
            connectDropTarget(<tr {...restProps} className={className} style={style} />),
        );
    }
}
// DropTarget：使组件能够放置拖拽组件
const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
}))(
    DragSource('row', rowSource, connect => ({ // 使组件能够被拖拽
        // 必填。收集功能。它应该返回一个普通的对象注入你的组件。它接收两个参数：connect和monitor。
        // 参数
        // connect: 一个 DragSourceConnector 实例。它有两种方法：dragPreview()和dragSource()。
        // dragSource 返回一个函数，传递给组件用来将 source DOM 和 React DnD Backend 连接起来
        connectDragSource: connect.dragSource(),
        // dragPreview()：返回一个函数，传递给组件用来将拖动时预览的 DOM 节点 和 React DnD Backend 连接起来
    }))(BodyRow),
);
export class DragTable extends React.Component<any, any>  {
    state = {
        data: [
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
            },
            {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
        ],
    };

    components = {
        body: {
            row: DragableBodyRow,
        },
    };
    moveRow = (dragIndex, hoverIndex) => {
        const { data } = this.state;
        const dragRow = data[dragIndex];

        this.setState(
            update(this.state, {
                data: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
                },
            }),
        );
    };
    render() {
        console.log(DragableBodyRow);
        console.log(this.components);
        return <DndProvider backend={HTML5Backend}>
            <Table
                columns={columns}
                dataSource={this.state.data}
                components={this.components}
                // @ts-ignore
                // onRow={(record, index) => ({
                //     index,
                //     moveRow: this.moveRow,
                // })}
            />
        </DndProvider>
    }
}

function renderTR(index) {
    return <tr>
        <td>{index}</td>
        <td>测试{index}</td>
        <td>22 + {index}</td>
        <td>删除</td>
    </tr>
}
class RenderTR extends React.Component {
    render() {
        let index = 1;
        console.log(this.props);
        return <tr>
            <td>{index}</td>
            <td>测试{index}</td>
            <td>22 + {index}</td>
            <td>删除</td>
        </tr>;
    }
}
class RenderDiv extends React.Component {
    render() {
        console.log(this.props);
        return <div>
            <p>this is div</p>
        </div>;
    }
}
const renderDiv = DragSource('div', rowSource, connect => ({
    connectDragSource: connect.dragSource(),
}))(RenderDiv);
export class DndTable extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            dataIndex: 10
        }
    }
    rowSource = { // spec：必填。一个普通的JavaScript对象，上面有一些允许的方法。它描述了拖动源如何对拖放事件做出反应。
        beginDrag(props) { // 必填
            dragingIndex = props.index;
            return {
                index: props.index,
            };
        },
    };
    renderTr() {
        let ret = [];
        for(let i = 0; i < 10; i++) {
            // let tr = <RenderTR/>;
            let SouTr = DragSource('row1', this.rowSource, connect => ({
                index: i,
                connectDragSource: connect.dragSource(),
            }))(RenderTR);
            // @ts-ignore
            ret.push(<SouTr/>);
        }
        console.log(ret);
        return ret;
    }


    render() {
        // this.renderTr();
        return <DndProvider backend={HTML5Backend}>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>姓名</td>
                        <td>年龄</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                    {this.renderTr()}
                </tbody>
            </table>
            {/*<DragableBodyRow/>*/}
        </DndProvider>
    }
}
