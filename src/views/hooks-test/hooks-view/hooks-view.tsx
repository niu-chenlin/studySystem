import React, {useCallback, useEffect, useReducer, useState} from 'react';
import { Table, Tag, Space } from 'antd';
import {useDispatch} from "react-redux";
import {hooksTableColumns, hooksTableData} from "./hooksData/hooksData";
import { Button } from 'antd';
import {
    AppstoreAddOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { changeViewLoading } from "../../../redux/actions/ViewActionCreator";

export const staticChangeLoading = () => {
    console.log("staticChangeLoading");
    const dispatch = useDispatch();
    dispatch(changeViewLoading(true));
    setTimeout(() => {
        dispatch(changeViewLoading(false));
    }, 500)
};

function getBtnDisabled(edit: boolean, del: boolean) { // hook的逻辑状态共享 -
    // 当你涉及多个子值的复杂 state(状态) 逻辑时，useReducer 通常优于 useState 。
    // 它还允许你优化触发深度更新的组件的性能.因为 你可以传递调度而不是回调。
    const [editDisabled, setEditDisabled] = useState(edit);
    const [delDisabled, setDelDisabled] = useState(del);
    return [[editDisabled, setEditDisabled], [delDisabled, setDelDisabled]];
}
function btnReducer(state, action) {
    switch (action.type) {
        case "selectionType":
            return {...state, selectionType: action.value};
        case "selectRowKes":
            return {...state, selectRowKeys: action.value};
        case "edit":
            return {...state, editDisabled: action.value};
        case "del":
            return {...state, delDisabled: action.value};
        default:
            return state;
    }
}
export const HooksView: React.FC<{}> = () => {
    // const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
    // const [edit, del] = getBtnDisabled(true, true);
    // const [state, setState] = useState({edit: true, del: true});
    let isFish = false;
    console.log("aaaaaaaaaaaaaaaaaaaaaa");
    console.log(isFish);
    const [state, dispatch] = useReducer(btnReducer, {editDisabled: true, delDisabled: true, selectionType: "checkbox", selectRowKeys: []});
    const [isFresh, setIsFresh] = useState(false);
    staticChangeLoading();
    const loadingFunc = useCallback(() => {
        console.log("loading callback");
        setIsFresh(true);
        staticChangeLoading();
    }, [isFresh]);

    // loadingFunc();

    const rowSelection = {
        selectedRowKeys: state.selectRowKeys,
        onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            dispatch({type: "selectRowKes", selectedRowKeys});
        },
        getCheckboxProps: (record: any) => ({
            // disabled: record.name === 'Disabled User', // Column configuration not to be checked
            // name: record.name,
        }),
    };
    // if(!isFish) {
    //     isFish = true;
    //     staticChangeLoading();
    // }
    // useEffect(() => {
    //     staticChangeLoading();
    // }, []);

    // const columns = [
    //     {
    //         title: 'Name',
    //         dataIndex: 'name',
    //         render: (text: string) => <a>{text}</a>,
    //     },
    //     {
    //         title: 'Age',
    //         dataIndex: 'age',
    //     },
    //     {
    //         title: 'Address',
    //         dataIndex: 'address',
    //     },
    // ];
    //
    // interface DataType {
    //     key: React.Key;
    //     name: string;
    //     age: number;
    //     address: string;
    // }
    //
    // const data: DataType[] = [
    //     {
    //         key: '1',
    //         name: 'John Brown',
    //         age: 32,
    //         address: 'New York No. 1 Lake Park',
    //     },
    //     {
    //         key: '2',
    //         name: 'Jim Green',
    //         age: 42,
    //         address: 'London No. 1 Lake Park',
    //     },
    //     {
    //         key: '3',
    //         name: 'Joe Black',
    //         age: 32,
    //         address: 'Sidney No. 1 Lake Park',
    //     },
    //     {
    //         key: '4',
    //         name: 'Disabled User',
    //         age: 99,
    //         address: 'Sidney No. 1 Lake Park',
    //     },
    // ];

    return <div className="hooks-view">
        <h3>使用hooks实现一个前端URDP - 前端基于react + antd</h3>
            <Space style={{marginBottom: 10}}>
                <Button type="primary" icon={<AppstoreAddOutlined />} >添加</Button>
                <Button type="primary" icon={<EditOutlined />} disabled={state.editDisabled}>编辑</Button>
                <Button type="primary" icon={<DeleteOutlined />} danger disabled={state.delDisabled}>删除</Button>
            </Space>
        <DC/>
        <TestCon/>
        <Table
            rowKey="name" // 指定选中时的selectedRowKeys，否则选中 == 全选了
            rowSelection={{
                type: state.selectionType,
                ...rowSelection,
            }}
            columns={hooksTableColumns}
            dataSource={hooksTableData}
        />
    </div>
};

function JOKER(props) {
    console.log("11111111111111111");
    const [count, setCount] = useState(props.count);
    useEffect(() => {
        console.log('I am JOKER\'s useEffect--->', props.count);
        setCount(props.count);
    }, [props.count]);

    console.log('I am JOKER\'s  render-->', count);
    return (
        <div>
            <p style={{ color: 'red' }}>JOKER: You clicked {count} times</p>
        </div>
    );
}

function DC() {
    console.log("222222222222222222222");
    const [count, setCount] = useState(0);
    return (
        <div>
            <button onClick={() => {
                setCount(count );
                console.log('\n');
            }}>
                Click me
            </button>
            <p>DC: You clicked {count} times</p>
            <JOKER count={count} />
        </div>
    );
}

export const TestCon: React.FC<{}> = () => {
    console.log("使用useMemo|useCallback后还会不会导致组件重新渲染呢？");
    const [count, setCount] = useState(1);
    const [val, setValue] = useState('');
    const [isTest, setTest] = useState(false);
    function expensive() {
        // 每次state的修改都会导致expensive的执行，即使修改的state和expensive函数无关，
        // 这是因为useState的修改和setState更新阶段是一样的，即不管值是否相等都重新render，class有shouldComponentUpdate做判断
        // 函数组件有useCallback和useMemo
        console.log('compute');
        let sum = 0;
        for (let i = 0; i < count * 100; i++) {
            sum += i;
        }
        return sum;
    }
    // return <div>
    //     <h4>{count}-{val}-{expensive()}</h4>
    //     <div>
    //         <button onClick={() => setCount(count)}>+c1</button>
    //         <input value={val} onChange={event => setValue(event.target.value)}/>
    //     </div>
    // </div>;
    console.log(isTest);
    // const loadingFunc = useCallback(() => {
    //     console.log("loading callback");
    //     // setTest(false);
    //     // staticChangeLoading();
    // }, [isTest]);
    useEffect(() => {
        console.log("useEffect.....");
    }, [isTest]);
    // loadingFunc();
    return <div>
        <h4>{isTest}</h4>
        <button onClick={() => setTest(true)}>TRUE</button>
    </div>
};