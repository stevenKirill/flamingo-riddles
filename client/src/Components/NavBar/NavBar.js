import React from 'react';
import {useEffect, useState} from 'react';
import {useVisible} from '../../utils/hooks/customHooks';
import {useSelector} from 'react-redux';
import {SubNavBar} from '../SubNavBar/SubNavBar';
import {LogOut} from '../Logout/Logout';
import {Link} from 'react-router-dom';
import './NavBar.css';

export function NavBar() {
    const {visible, handleChangeVisible} = useVisible(false);
    const [login, setLogin] = useState(false);
    const {isUserLoggedIn, isUserLoggedOut} = useSelector(state => state.auth)
    useEffect(() => {
        const localStorageValue = JSON.parse(localStorage.getItem('userSuccessedLoggedIn'));
        if (localStorageValue) {
            setLogin(true);
        } else {
            setLogin(false);
        }
    }, [isUserLoggedIn, isUserLoggedOut]);
    return (
        <div>
            <nav class="pink lighten-2">
                <div class="nav-wrapper">
                    <div class="main_logo">
                        <Link to="/" className="brand-logo">
                           Logo
                        </Link>
                    </div>
                    <ul class="right">
                        <li>
                            <Link to="/">Главная</Link>
                        </li>
                        <li onClick={handleChangeVisible} class="riddles_link">
                            <span>Загадки</span>
                        </li>
                        {!login &&
                        <li>
                            <Link to="/auth">Зарегестрироваться</Link>
                        </li>
                        }
                        {!login && 
                        <li>
                            <Link to="/login">Войти</Link>
                        </li>}
                        <li>
                            <Link to="/about">О проекте</Link>
                        </li>
                        {login && <LogOut/>}
                    </ul>
                </div>
            </nav>
            {visible && <SubNavBar isUserLoggedIn={login}/>}
        </div>
    );
}