export function loadRiddles(payload) {
    return {
        type: 'LOAD_RIDDLES',
        payload
    }
}

export function loadRiddlesSuccess(payload) {
    return {
        type: 'LOAD_RIDDLES_SUCCESS',
        payload
    }
}

export function loadRiddlesFail(payload) {
    return {
        type: 'LOAD_RIDDLES_FAIL',
        payload
    }
}

export function loadAsyncRiddles(url, headers) {
    return (dispatch) => {
        dispatch(loadRiddles())
        fetch(url, {...headers})
        .then((response) => {
            const data = response.json();
            return data
        })
        .then((data) => {
            if (data.message) {
                return dispatch(loadRiddlesFail(data))
            }
            return dispatch(loadRiddlesSuccess(data))
        })
        .catch((error) => dispatch(loadRiddlesFail(error)))
    }
}