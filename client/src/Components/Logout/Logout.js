import React from 'react';
import {useVisible} from '../../utils/hooks/customHooks';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {logOutUser} from '../../redux/actions/authActions';
import './Logout.css';

export function LogOut() {
    const {visible, handleChangeVisible} = useVisible(false);
    const history = useHistory();
    const dispatch = useDispatch();

    async function handleLogout() {
        await localStorage.removeItem('tokenAndId');
        await localStorage.removeItem('userSuccessedLoggedIn');
        await dispatch(logOutUser())
        history.push('/');
    };

    function handleGotoDashBoard() {
        history.push('/dashboard');
    };

    return (
        <li onClick={handleChangeVisible}>
            <li className="profile_button">Профиль</li>
            {visible &&
            <div className="log_out_list">
                <div onClick={handleGotoDashBoard} className="log_out_list_item">Инфо</div>
                <div onClick={handleLogout} className="log_out_list_item">Выйти</div>
            </div>
            }
        </li>
    )
}