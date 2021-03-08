import React from 'react';
import {useEffect, useContext} from 'react';
import {useFormValue, useMessage} from '../../utils/hooks/customHooks';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser, clearLoginError} from '../../redux/actions/authActions';
import {ProjectUrlContext} from '../../context/contexts';
import './loginPage.css';

export function LoginPage() {
    const {value, onChange} = useFormValue({
        email: '',
        password: '',
    });
    const {BASE_URL} = useContext(ProjectUrlContext);
    const state = useSelector(state => state.auth);
    const {loading,error,isUserLoggedIn} = state;
    const dispatch = useDispatch();
    const history = useHistory();
    const message = useMessage();
    useEffect(() => {
        // эффект для отрисовки ошибки при неверном логине
        // затем в возвращаемой функции мы чистим ошибку в сторе чтобы у нас каждый раз
        // сбрасывалась ошибка и показывалась на UI
        message(error);
        return () => {
            dispatch(clearLoginError())
        }
    },[error]);

    useEffect(() => {
        // здесь если переменная поменяется а она поменяется после того как мы залогинемся
        // поменяется переменная в dispatch и будет переход
        if (isUserLoggedIn) {
            history.push('/dashbord')
        }
    },[isUserLoggedIn])

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await dispatch(loginUser(`${BASE_URL}/api/login`,value));
        } catch (error) {
        }
    };
    return (
        <div className="login_block">
            <div className="row _block">
                <form class="col s12" onSubmit={handleLogin}>
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">account_circle</i>
                            <input 
                            id="icon_prefix" 
                            type="email" 
                            class="validate"
                            name="email"
                            value={value.email}
                            onChange={onChange}
                            />
                            <label for="icon_prefix">Email</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">visibility</i>
                            <input 
                            id="icon_prefix" 
                            type="password" 
                            class="validate"
                            name="password"
                            value={value.password}
                            onChange={onChange}
                            disabled={loading}/>
                            <label for="icon_prefix">Пароль</label>
                        </div>
                    </div>
                    <div class="row">
                        <button 
                            className="auth_button" 
                            type="submit" 
                            name="action">
                            Войти
                        <i class="material-icons right">send</i>
                        </button>
                    </div>
                </form>
                <div>
                </div>
            </div>
        </div>
    )
};