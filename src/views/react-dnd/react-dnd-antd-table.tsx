import * as React from "react";
import { Table } from 'antd';
import { DndProvider, DragSource, DropTarget, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import update, { extend } from "immutability-helper";

let dragingIndex = -1;
const columns = [
    {
        title: (sortOrder, sortColumn, filters ) => {
            console.log(sortOrder, sortColumn, filters );
            return <div>
                <p>This is Name</p>
            </div>
        },
        // onHeaderCell: () => {
        //     // 设置头部单元格属性
        //     return {}
        // },
        // onCell: () => {
        //     // 设置单元格属性
        //     return {className: "test"}
        // },
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
class BodyRow extends React.Component {
    render() {
        // @ts-ignore
        const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;
        // @ts-ignore
        const style = { ...restProps.style, cursor: 'move'};

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
        console.log(isOver, moveRow);
        return connectDragSource(
            connectDropTarget(<tr {...restProps} className={className} style={style} />),
        );
    }
}

const rowTarget = {
    drop(props, monitor) {
        const dragIndex = monitor.getItem().index; // 拖动行的index
        const hoverIndex = props.index; // 目标行的index
        if (dragIndex === hoverIndex) { // 不拖动
            return;
        }
        props.moveRow(dragIndex, hoverIndex); // 回调函数 - 移动行
        monitor.getItem().index = hoverIndex; // 设置拖动行的index为目标行
    }
};
const rowSource = {
    beginDrag(props) { // 必填
        dragingIndex = props.index; // 拖动时获取拖动行的index
        return {
            index: props.index,
        };
    },
};
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
export class DndRow extends React.Component<any, any> {
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
        a: { // 这种情况下修改d就会比较麻烦
            b: {
                c: {
                    d: {
                        name: "aa"
                    }
                }
            }
        }
    };
    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        console.log(prevState);
    }

    setD() {
        // this.state.a.b.c.d = {name: "bb"}; // 使用这种方法最大的弊端是 失去了prevState，因为state被覆盖了
        // this.setState({a: this.state.a});
        // 第二种方式使用深拷贝 - 代价开销大
        // 第三中方式 - 使用 immutability-helper

        this.setState(update(this.state, {
            // $push 向数组末尾添加一个或多个元素
            // $unshift 在数组开头添加一或多个元素
            // $splice 从数组中添加/删除元素
            // $set 给对象某个元素赋值
            // $toggle 切换目标对象的布尔字段列表
            // $unset 从目标对象中删除数组中的键列表
            // $merge 合并对象
            // $apply 通过函数将一个值转为另外一个值
            // $add 为 Map 或者 Set 添加值
            // $remove 从 Map 或者 Set 移除值
            // 你也可以使用 extend 功能添加你自己的命令
            // 参考 https://www.jianshu.com/p/6ffb29e97bde
            a: {b: {c: {d: {name: {$set: "ddd"}}}}}
        }));
    }
    components = {
        body: {
            row: DragableBodyRow,
        },
    };
    moveRow = (dragIndex, hoverIndex) => {
        const { data } = this.state;
        const dragRow = data[dragIndex]; // 拖动的行
        this.setState(
            update(this.state, {
                // immutability-helper - 在不改变原始来源的情况下改变数据副本 - 用于解决state深拷贝问题（state的多层级修改）
                data: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
                },
            }),
        );

    };
    render() {
        return <DndProvider backend={HTML5Backend}>
            <p>this is D value : {this.state.a.b.c.d.name}</p>
            <button onClick={() => this.setD()}>changeD</button>
            <Table
                columns={columns}
                dataSource={this.state.data}
                components={this.components}
                // @ts-ignore
                onRow={(record, index) => ({
                    index,
                    moveRow: this.moveRow,
                })}
            />
        </DndProvider>
    }
}

class HeaderTitle extends React.Component {
    render() {
        // @ts-ignore
        const { isOver, connectDragSource, connectDropTarget, moveTitle, ...restProps } = this.props;
        // @ts-ignore
        const style = { ...restProps.style, cursor: 'move'};

        // @ts-ignore
        let { className } = restProps;
        if (isOver) {
            // @ts-ignore
            // if (restProps.index > dragingIndex) {
            //     className += ' drop-over-downward';
            // }
            // // @ts-ignore
            // if (restProps.index < dragingIndex) {
            //     className += ' drop-over-upward';
            // }
            className += ' drop-over';
        }
        // console.log(isOver, moveTitle);
        return connectDragSource(
            connectDropTarget(<th {...restProps} className={className} style={style} />),
        );
    }
}
let dragingTitleIndex = -1;
const titleTarget = {
    drop(props, monitor) {
        console.log(monitor.getItem());
        const dragIndex = monitor.getItem().index; // 拖动行的index
        const hoverIndex = props.index; // 目标行的index
        if (dragIndex === hoverIndex) { // 不拖动
            return;
        }
        props.moveTitle(dragIndex, hoverIndex); // 回调函数 - 移动行
        monitor.getItem().index = hoverIndex; // 设置拖动行的index为目标行
    }
};
const titleSource = {
    beginDrag(props) { // 必填
        // dragingTitleIndex = props.index; // 拖动时获取拖动行的index
        return {
            index: props.index,
        };
    },
};
const DragableHeaderTitle = DropTarget('title', titleTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
}))(
    DragSource('title', titleSource, connect => ({ // 使组件能够被拖拽
        connectDragSource: connect.dragSource(),
    }))(HeaderTitle),
);
const columns1 = [
    {
        // title: (sortOrder, sortColumn, filters ) => {
        //     console.log(sortOrder, sortColumn, filters );
        //     return <div>
        //         <p>This is Name</p>
        //     </div>
        // },
        // onHeaderCell: () => {
        //     // 设置头部单元格属性  可以用来像onRow那样给dnd传递index数据
        //     return {}
        // },
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
export class DndColumn extends React.Component<any, any> {
    // React中的immutability
    // React官方建议把State当做是不可变对象，State中包含的所有状态都应该是不可变对象，当State中的某个状态发生变化，
    // 我们应该重新创建这个状态对象，而不是直接修改原来的状态。
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {
                    // title: (sortOrder, sortColumn, filters ) => {
                    //     console.log(sortOrder, sortColumn, filters );
                    //     return <div>
                    //         <p>This is Name</p>
                    //     </div>
                    // },
                    // onHeaderCell: () => {
                    //     // 设置头部单元格属性  可以用来像onRow那样给dnd传递index数据
                    //     return {}
                    // },
                    sorter: (a, b) => b.ZZ - a.ZZ,
                    onHeaderCell: this.headerCell,
                    render: (value, record, index) => {
                        console.log(value, record, index);
                        return value
                    },
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    index: 0
                },
                {
                    sorter: (a, b) => b.ZZ - a.ZZ,
                    onHeaderCell: this.headerCell,
                    title: 'Age',
                    dataIndex: 'age',
                    key: 'age',
                    index: 1
                },
                {
                    sorter: (a, b) => b.ZZ - a.ZZ,
                    onHeaderCell: this.headerCell,
                    title: 'Address',
                    dataIndex: 'address',
                    key: 'address',
                    index: 2
                },
            ],
            data: [
                {
                    key: '1',
                    name: 'AAA',
                    age: 1,
                    address: 'New York No. 1 Lake Park',
                },
                {
                    key: '2',
                    name: 'BBB',
                    age: 2,
                    address: 'London No. 1 Lake Park',
                },
                {
                    key: '3',
                    name: 'CCC',
                    age: 3,
                    address: 'Sidney No. 1 Lake Park',
                },
                {
                    key: '4',
                    name: 'DDD',
                    age: 4,
                    address: 'Sidney No. 1 Lake Park',
                },
            ],
        };

        // this.dragProps = {
        //     onDragEnd(fromIndex, toIndex) {
        //         const columns = [...that.state.columns];
        //         const item = columns.splice(fromIndex, 1)[0];
        //         columns.splice(toIndex, 0, item);
        //         that.setState({
        //             columns
        //         });
        //     },
        //     nodeSelector: "th"
        // };
    }
    componentDidMount(): void {
        let div = document.getElementById("div");
        div.onmousedown = function(e) { // on 发生在捕获阶段
            alert("div mousedown");
            // React无法阻止父元素事件的原因：React的合成事件并不是直接绑定到DOM中，而是通过冒泡机制到最上层的Document中处理
            // 所以永远是先执行DOM绑定的事件，然后才冒泡到Document

            // React合成事件和原生事件区别
            // React合成事件一套机制：React并不是将click事件直接绑定在dom上面，而是采用事件冒泡的形式冒泡到document上面，
            // 然后React将事件封装给正式的函数处理运行和处理。
            // React合成事件理解
            // 如果DOM上绑定了过多的事件处理函数，整个页面响应以及内存占用可能都会受到影响。React为了避免这类DOM事件滥用，
            // 同时屏蔽底层不同浏览器之间的事件系统差异，实现了一个中间层——SyntheticEvent。

            // 1 当用户在为onClick添加函数时，React并没有将Click时间绑定在DOM上面。
            // 2 而是在document处监听所有支持的事件，当事件发生并冒泡至document处时，React将事件内容封装交给中间层SyntheticEvent（负责所有事件合成）
            // 3 所以当事件触发的时候，对使用统一的分发函数dispatchEvent将指定函数执行。

            // react 16版本后才支持Ref和Context
        };
    }

    headerCell = column => ({
        index: column.index,
        moveTitle: this.moveTitle,
        test: "aabb"
    });
    components = {
        header: {
            // row: DragableBodyRow,
            cell: DragableHeaderTitle
        },
        body: {
            row: DragableBodyRow,
        },
    };
    moveTitle = (dragIndex, hoverIndex) => {
        // const { columnList } = this.state;
        let columnList = this.state.columns;
        const dragColumn = columnList[dragIndex]; // 拖动的列
        const dropColumn = columnList[hoverIndex]; // 放置的列

        // let tempIndex = dragColumn.sortIndex;
        // dragColumn.sortIndex = dropColumn.sortIndex;
        // dropColumn.sortIndex = tempIndex;



        // let dragData = columnList.splice(dragIndex, 1)[0];
        // columnList.splice(hoverIndex, 0, dragData);
        // columnList.forEach((column, index) => {
        //     console.log(column);
        //     column.index = index;
        // });

        // console.log(dragIndex, hoverIndex);
        // this.setState({columns: columnList});

        // let newColumns = update(this.state, {
        //     // immutability-helper - 在不改变原始来源的情况下改变数据副本 - 用于解决state深拷贝问题（state的多层级修改）
        //     columns: {
        //         $splice: [[dragIndex, 1], [hoverIndex, 0, dragColumn]],
        //     },
        // });
        // console.log(newColumns);
        // columnList.forEach((obj, index) => {
        //     update(this.state, {
        //         columns: {
        //             [index]: {index: {$set: index}}
        //         },
        //     });
        // });
        // console.log(newColumns);
        // // console.log(this.state.columns);
        // console.log(this.state.columns);
        // update(collection, {children: {[index]: {$set: 1}}});

        extend('$forEach', (value, object: any) => { // 使用extend扩展自定义方法
            return object.map((obj, index) => {
                return update(obj, {
                    index: {$set: index}
                })
            });
        });
        this.setState(
            update(this.state, {
                columns: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragColumn]],
                    $forEach: {}
                },
        }));

        // let newColumns = this.state.columns.map((column, index) => {
        //     return update(column, {
        //         [index]: {index: {$set: index}}
        //     })
        // });
        // this.setState({columns: newColumns});
    };
    moveRow = (dragIndex, hoverIndex) => {
        const { data } = this.state;
        const dragRow = data[dragIndex]; // 拖动的行
        this.setState(
            update(this.state, {
                // immutability-helper - 在不改变原始来源的情况下改变数据副本 - 用于解决state深拷贝问题（state的多层级修改）
                data: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
                },
            }),
        );
    };
    testClick(e) { // 原生js默认事件都发生在冒泡阶段
        // react中指定的onMouseDown等事件要比原生的onmousedown事件的执行时机晚
        alert("父事件");
        // onClick={(e) => {this.testClick(e)}}
    }
    testClick1(e) {
        e.stopPropagation();
        // 阻止合成事件与最外层document上的事件间的冒泡
        e.nativeEvent.stopImmediatePropagation();
        // e.nativeEvent.stopImmediatePropagation();
        alert("子事件");
    }
    render() {
        console.log(this.state.columns);
        return <DndProvider backend={HTML5Backend}>
            <div id="div" style={{width: 100, height: 100, border: '1px solid gray'}}
                 onMouseDown={(e) => {this.testClick(e)}}>
                父
                <div style={{width: 50, height: 50, border: '1px solid gray'}} onMouseDown={(e) => {this.testClick1(e)}}>
                    子
                </div>
            </div>
            <Table
                columns={this.state.columns}
                dataSource={this.state.data}
                components={this.components}
                // @ts-ignore
                onRow={(record, index) => ({
                    index,
                    moveRow: this.moveRow,
                })}
            />
        </DndProvider>
    }
}