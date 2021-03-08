

export function riddlesReducer(state = {}, action) {
    if (action.type === 'LOAD_RIDDLES') {
        return {
            ...state,
            loading: true,
        }
    };

    if (action.type === "LOAD_RIDDLES_SUCCESS") {
        return {
            ...state,
            data: action.payload,
            loading: false,
        }
    };

    if (action.type === "LOAD_RIDDLES_FAIL") {
        return {
            ...state,
            error: action.payload,
            loading: false,
        }
    }

    return state;
}