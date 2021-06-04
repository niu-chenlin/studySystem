import React, { useEffect, useState } from "react";
import { LOADING_VIEW, REDUX_PROMISE, REDUX_THUNK, TEST_VIEW } from "../../redux/actions/ActionType";

// 使用hooks可实现redux的功能 - 享受使用 React 本地 state(状态)的好处，或者可能不想安装其他库。

// 自定义redux reducer hook
function useReducer(reducer, initialState) {
    const [state, setState] = useState(initialState);
    function dispatch(action) {
        const nextState = reducer(state, action);
        setState(nextState);
    }
    return [state, dispatch];
}

const ViewReducers = (state, action) => {
    switch (action.type) {
        case LOADING_VIEW:
            return {...state, value: action.value};
        default:
            return state;
    }
};

export const TestHookReducer: React.FC<{}> = () => {
    const [state, dispatch] = useReducer(ViewReducers, []);
    function changeState() {
        console.log("changeState");
        dispatch({type: "LOADING_VIEW", value: "22"});
    }
    return (<div>
        <p>reducer value is: {state.value}</p>
        <button onClick={() => changeState()}>
            测试reducer调用dispatch
        </button>
    </div>)
};