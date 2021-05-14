import { combineReducers } from 'redux';
import MenuReducers from "./menuReducers";
import ViewReducers from "./viewReducers";

const reducers = combineReducers([MenuReducers, ViewReducers]);

export default reducers;