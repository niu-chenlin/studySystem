import { combineReducers } from 'redux';
import MenuReducers from "./menuReducers";

const reducers = combineReducers([MenuReducers]);

export default reducers;