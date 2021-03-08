export function loadUserData() {
    return {
        type: 'LOAD_USER_DATA'
    }
}

export function loadUserDataSuccess(payload) {
    return {
        type: 'LOAD_USER_DATA_SUCCESS',
        payload
    }
}

export function loadUserDataError(payload) {
    return {
        type: 'LOAD_USER_DATA_ERROR',
        payload
    }
};

export function updateUserDataSuccess(payload) {
    return {
        type: 'UPDATE_USER_DATA_SUCCESS',
        payload,
    }
};

export function updateUserDataError(payload) {
    return {
        type: 'UPDATE_USER_DATA_ERROR',
        payload
    }
};

// функция загрузки данных пользователя
export function fetchUserData(url, userId, headers = {}) {
    headers['Content-Type'] = 'application/json';
    headers.auth = `Bearer ${userId}`
    return (dispatch) => {
        dispatch(loadUserData())
        fetch(url, {
            method: 'GET',
            headers
        })
        .then((response) => {
            const data = response.json();
            return data;
        })
        .then((data) => {
            dispatch(loadUserDataSuccess(data));
        })
        .catch((error) => {
            return dispatch(loadUserDataError(error));
        })
    }
};

export function updateUserData(url,body,userId) {
    const headers = {
        'Content-Type': 'application/json',
        auth: `Bearer ${userId}`
    };
    if (body) {
        body = JSON.stringify(body);
    };
    return (dispatch) => {
        dispatch(loadUserData())
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
            dispatch(updateUserDataSuccess(data));
        })
        .catch((error) => {
            return dispatch(updateUserDataError(error));
        })
    }
};

export function startDeleteRiddle() {
    return {
        type: 'START_DELETE_RIDDLE',
    }
}

export function deleteRiddleSuccess(payload) {
    return {
        type: 'DELETE_RIDDLE_SUCCESS',
        payload
    }
}

export function deleteRiddleFail(payload) {
    return {
        type: 'DELETE_RIDDLE_FAIL',
        payload
    }
}

export function deleteFetchRiddle(url,userId,riddleId) {
    const headers = {
        'Content-Type': 'application/json',
        auth: `Bearer ${userId}`,
        riddleId: riddleId,
    };
    return (dispatch) => {
        dispatch(startDeleteRiddle())
        fetch(url, {
            method: 'DELETE',
            headers
        })
        .then((response) => {
            const data = response.json();
            return data;
        })
        .then((data) => {
            // если есть поле message тогда это ошибка нужно reject
            if (data.message) {
                return Promise.reject(data.message);
            }
            dispatch(deleteRiddleSuccess(data));
        })
        .catch((err) => {
            dispatch(deleteRiddleFail(err));
        })
    }
}
