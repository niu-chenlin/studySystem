import {LOADING_VIEW} from "./ActionType";

export const changeViewLoading = (value?: any) => ({
    type: LOADING_VIEW,
    payload: {
        loading: value
    }
})