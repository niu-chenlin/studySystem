import MenuState from "../../state/MenuState";
import {SHOW_MENU} from "../../actions/ActionType";

/**
 * State 的计算过程就叫做 Reducer，Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。
 * 为什么这个函数叫做 Reducer 呢？因为它可以作为数组的reduce方法的参数。请看下面的例子，一系列 Action 对象按照顺序作为一个数组。
 * Reducer 函数负责生成 State。由于整个应用只有一个 State 对象，包含所有数据，对于大型应用来说，这个 State 必然十分庞大，导致 Reducer 函数也十分庞大。
 * Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。
 * @api {get} redux的reducers
 * @apiParam {json} state 默认数据源
 * @apiParam {json} action 描述对象
 * Create Date: 2021-5-7
 * Create Author: 牛晨林
 */
const MenuReducers = (state = MenuState, action) => {
    switch (action.type) {
        case SHOW_MENU:
            return state;
        default:
            return state;
    }
};
export default MenuReducers;