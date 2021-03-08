import React from 'react';
import err from '../../assets/err.png';
import './errorComponent.css';
export function ErrorComponent({error}) {
    console.error(error.message)
    return (
        <div className="error_page">
            <p className="error_title">Страница ошибки</p>
            <img src={err} alt="error" width="500px" height="500px"></img>
        </div>
    )
}