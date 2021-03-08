export function authReducer(state = {}, action) {

    if (action.type === 'START_LOGIN_USER') {
        return {
            ...state,
            loading: true,
        }
    }

    if (action.type === 'LOGIN_USER_ERROR') {
        return {
            ...state,
            loading: false,
            error: action.payload,
            isUserLoggedIn: false,
        }
    }

    if (action.type === 'LOGIN_USER_SUCCESS') {
        return {
            ...state,
            loading: false,
            isUserLoggedIn: true,
        }
    }

    if(action.type === 'LOG_OUT_USER') {
        return {
            ...state,
            isUserLoggedIn: false,
            isUserLoggedOut: true,
        }
    }
    if(action.type === 'CLEAR_LOGIN_ERROR') {
        return {
            ...state,
            error: '',
        }
    };
    return state;
}