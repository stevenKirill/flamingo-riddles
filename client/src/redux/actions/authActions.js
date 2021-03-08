export function startLoginUser(payload) {
    return {
        type: 'START_LOGIN_USER',
        payload
    }
}

export function loginUserError(payload) {
    return {
        type: 'LOGIN_USER_ERROR',
        payload
    }
}

export function loginUserSuccess(payload) {
    return {
        type: 'LOGIN_USER_SUCCESS',
        payload
    }
}
export function logOutUser(payload) {
    return {
        type: 'LOG_OUT_USER',
        payload
    }
};

export function clearLoginError() {
    return {
        type: 'CLEAR_LOGIN_ERROR',
    }
};
// функция логина для пользователя
export function loginUser(url,body, headers = {}) {
    if (body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }
    return (dispatch) => {
        dispatch(startLoginUser())
        fetch(url, {
            method: 'POST',
            body,
            headers
        })
        .then((response) => {
            const data = response.json();
            return data;
        })
        .then((data) => {
            // если ответ содержит поле message (что явялется ошибкой) тогда сразу reject
            if(data.message) {
                return Promise.reject(data.message)
            };
            localStorage.setItem('tokenAndId',JSON.stringify(data));
            localStorage.setItem('userSuccessedLoggedIn',true.toString());
            dispatch(loginUserSuccess());
        })
        .catch((error) => {
            dispatch(loginUserError(error));
        })
    }
};