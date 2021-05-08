import {SHOW_MENU} from "./ActionType";

/**
 * Action 一个描述对象，用于描述store如何更改
 * 社区推荐写法{type: "必须", payload: {} || "有关该操作的任何信息", error: boolean, meta: "其它信息"}
 * 这是redux的Action Creator（action生成器）
 * View（store.dispatch(Action Creator)） 要发送多少种消息，就会有多少种 Action。
 * 如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫 Action Creator。
 * Create Date: 2021-5-7
 * Create Author: 牛晨林
 * */
export const ShowMenuActionCreator = (value?: any) => ({
    type: SHOW_MENU,
    value
})