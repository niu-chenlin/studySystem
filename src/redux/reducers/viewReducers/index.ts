import { LOADING_VIEW, REDUX_PROMISE, REDUX_THUNK, TEST_VIEW } from "../../actions/ActionType";
import ViewState from "../../state/ViewState";

const ViewReducers = (state = ViewState, action) => {
    switch (action.type) {
        case LOADING_VIEW:
            return {...state, loading: action.payload.loading};
        case TEST_VIEW:
            return {...state};
        case REDUX_THUNK:
            return {...state, fakeThunkValue: action.fakeThunkValue, thunkLoading: action.thunkLoading};
        case REDUX_PROMISE:
            return {...state, fakePromiseValue: action.fakePromiseValue, promiseLoading: action.promiseLoading};
        default:
            return state;
    }
};
export default ViewReducers;