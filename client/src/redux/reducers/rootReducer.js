import {riddlesReducer} from './riddlesReducer';
import {authReducer} from './authReducer';
import {userReducer} from './userReducer';
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    riddles: riddlesReducer,
    auth: authReducer,
    user: userReducer,
});

export default rootReducer;