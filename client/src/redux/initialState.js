export default {
    auth: {
        loading: false,
        error: '',
        isUserLoggedIn: false,
        isUserLoggedOut: false,
    },
    riddles: {
        data: null,
        loading: true,
        error: null,
    },
    user: {
        userData: null,
        loading: false,
        error: '',
        successMessage: '',
        favouriteRiddles: []
    }
}