export function userReducer(state = {}, action) {
    if (action.type === 'LOAD_USER_DATA') {
        return {
            ...state,
            loading: true,
        }
    }

    if (action.type === 'LOAD_USER_DATA_SUCCESS') {
        // логика для отделения поля с любимыми задачами пользователя в отдельное поле
        // в сторе соответсвенно будет легче удалять задачу из массива
        const riddles = action.payload.favouriteRiddles;
        const exceptRiddles = {};
        for(let key in action.payload) {
            if (key === 'favouriteRiddles') {
                continue;
            } else {
                exceptRiddles[key] = action.payload[key]
            }
        }
        return {
            ...state,
            loading: false,
            userData: exceptRiddles,
            favouriteRiddles: riddles ? riddles : [],
        }
    }

    if (action.type === 'LOAD_USER_DATA_ERROR') {
        return {
            ...state,
            loading: false,
            error: action.payload,
        }
    }

    if (action.type === 'UPDATE_USER_DATA_SUCCESS') {
        return {
            ...state,
            loading: false,
            userData: action.payload.userData,
            successMessage: action.payload.success,
        }
    }

    if (action.type === 'UPDATE_USER_DATA_ERROR') {
        return {
            ...state,
            loading: false,
            error: action.payload,
        }
    }
    if (action.type === 'START_DELETE_RIDDLE') {
        return {
            ...state,
            loading: true,
        }
    }
    if (action.type === 'DELETE_RIDDLE_SUCCESS') {
        return {
            ...state,
            loading: false,
            favouriteRiddles: action.payload.favouriteRiddles,
            successMessage: action.payload.successMessage
        }
    }
    if (action.type === 'DELETE_RIDDLE_FAIL') {
        return {
            ...state,
            loading: false,
            error: action.payload,
        }
    }
    return state;
}