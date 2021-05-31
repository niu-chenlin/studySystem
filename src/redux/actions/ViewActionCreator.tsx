import {LOADING_VIEW} from "./ActionType";

export const changeViewLoading = (value?: any) => ({
    type: LOADING_VIEW,
    payload: {
        loading: value
    }
});

// creator实例
// export class ViewActionCreator {
//     static action1 = (param) => (dispatch, getState) => (
//         type: 'action1',
//         data
//     )
// }
