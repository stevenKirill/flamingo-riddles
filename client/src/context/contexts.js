import {createContext} from 'react';

export const LoginContext = createContext({
    login: function() {},
    logout: function() {},
    userLoggedIn: false,
});

export const ProjectUrlContext = createContext({
    BASE_URL: '',
})