import React from 'react';
import {useEffect, useContext} from 'react';
import './AuthPage.css';
import {useFormValue, useHttp, useMessage} from '../../utils/hooks/customHooks';
import {ProjectUrlContext} from '../../context/contexts';
import {useHistory} from 'react-router-dom';
import {Loader} from '../../Components/Loader/Loader';
import registrationImage from '../../assets/reg.png';

export function AuthPage() {
    const {value, onChange} = useFormValue({
        firstName: '',
        email: '',
        password: '',
    });
    const {BASE_URL} = useContext(ProjectUrlContext);
    const {loading, error, request, clearError} = useHttp();
    const message = useMessage();
    useEffect(() => {
        message(error);
        clearError();
    }, [error, message,clearError]);
    const history = useHistory();

    const handleRegistration = async (event) => {
        event.preventDefault();
        try {
            const data = await request(`${BASE_URL}/api/register`,'POST',{
              ...value,
            });
            console.log(data,'=> data');
            history.push('/dashboard');
        } catch (error) {}
    };

    return (
        <div>
            {loading ? 
            <Loader/> 
            :
            <div class="container auth_container">
            <div class="row form-wrapper">
                <form class="col s12" onSubmit={handleRegistration}>
                    <div class="row">
                        <div class="input-field col s12 input_wrapper">
                            <input 
                            id="first_name" 
                            type="text" 
                            class="validate" 
                            name="firstName"
                            value={value.firstName}
                            onChange={onChange}
                            />
                            <label for="first_name">Имя</label>
                            <span class="helper-text" data-error="неверно" data-success="верно">Введите ваше имя</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12 input_wrapper">
                            <input 
                            id="email" 
                            type="email" 
                            class="validate" 
                            name="email"
                            value={value.email}
                            onChange={onChange}
                            />
                            <label for="email">Email</label>
                            <span class="helper-text" data-error="неверно" data-success="верно">Введите ваш email</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12 input_wrapper">
                            <input id="password" 
                            type="password" 
                            class="validate"
                            name="password"
                            value={value.password}
                            onChange={onChange}
                            />
                            <label for="password">Пароль</label>
                            <span class="helper-text" data-error="неверно" data-success="верно">Введите ваш пароль</span>
                        </div>
                    </div>
                    <div class="row">
                        <button 
                        class="auth_button" 
                        type="submit" 
                        name="action"
                        disabled={loading}>
                            Зарегестрироваться
                        <i class="material-icons right">send</i>
                        </button>
                    </div>
                </form>
            </div>
            <div>
                <img src={registrationImage} alt="registration" width="500px" height="500px"/>
            </div>
        </div>}
        </div>
    )
};