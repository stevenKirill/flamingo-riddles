import React from 'react';
import welcome from '../../assets/welcome.png';
import './mainPage.css';

export function MainPage() {
    return (
        <div>
            <div className="main_page_block">
                <div>
                    <h1 className="main_page_title">Добро пожаловать!</h1>
                <p className="main_page_text">
                    Данный сайт посвящен разгадыванию загадок. Вы можете найти их в секции загадки. Все загадки разделены на 3 категории (простые, средние и сложные). Попробуйте разгадать их все без подсматривания ответа! Вы также можете предложить свою загадку в панели управления сразу после регистрации на данном сайте. Надеюсь вам понравиться данный контент, а даже если и нет, то все равно спасибо что заглянули.
                </p>
                </div>
                <div>
                    <img src={welcome} alt="Logo" width="500px" height="500px"/>
                </div>
            </div>
        </div>
    );
};