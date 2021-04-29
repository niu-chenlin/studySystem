import MenuState from "../state/MenuState";
import {INIT_MENU} from "../actions/ActionType";

const MenuReducer = (state = MenuState, action) => {
    switch (action.type) {
        case INIT_MENU:
            return state; // 个人认为init放回init数据即可
        default:
            return state;
    }
};
export default MenuReducer;
// 多个reducer的情况下，记得使用combineReducers合并一下