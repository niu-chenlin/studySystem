import {LOADING_VIEW} from "../../actions/ActionType";

const ViewReducers = (state = {loading: true}, action) => {
    switch (action.type) {
        case LOADING_VIEW:
            return {...state, loading: action.payload.loading};
        default:
            return state;
    }
};
export default ViewReducers;