

const addItem = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return [action.text, ...state]
        default:
            return state
    }
}

export default addItem;