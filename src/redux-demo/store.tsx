
import {combineReducers, createStore} from 'redux';
import addItem from './reducer';


// export default combineReducers({
//     todos,
//     visibilityFilter
// })

const store = createStore(addItem); // 1.通过reducer（具体修改store的方法，使用纯函数编写）去创建store

export default store;