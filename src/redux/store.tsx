import {createStore, applyMiddleware} from 'redux'
import MenuReducer from "./reducers/MenuReducer";


const store = createStore(MenuReducer); // 使用reducer创建store //内部会第一次调用reducer函数，得到初始state
export default store;