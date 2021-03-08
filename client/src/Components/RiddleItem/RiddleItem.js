import React from 'react';
import {useState, useEffect, useContext} from 'react';
import {useVisible, useMessage} from '../../utils/hooks/customHooks';
import {SocialMedia} from '../SocialMedia/SocialMedia';
import {ProjectUrlContext} from '../../context/contexts';
import './riddleItem.css';

export function RiddleItem({riddle, loggedIn, fetchSaveRiddle, riddleType}) {
    const {visible,handleChangeVisible} = useVisible(false);
    const [disabled,setDisabled] = useState(false);
    const {header, category, answer, description, id} = riddle;
    const [message,setMessage] = useState('');
    const errorFunc = useMessage();
    const {BASE_URL} = useContext(ProjectUrlContext);
    // обработчик нажатия на кнопку
    async function handleAddRiddle(e) {
        const response = await fetchSaveRiddle(e);
        setMessage(response.message)
    };

    // функция отправки запроса на сервер и добавления задачи
    async function fetchSaveRiddle(event) {
        setDisabled(true);
        const riddleId = event.target.dataset.riddle;
        const tokenAndId = JSON.parse(localStorage.getItem('tokenAndId'));
        if(!tokenAndId) {
            return;
        }
        const {userId} = tokenAndId;

        const headers = {
            riddle: riddleId,
            id: userId,
        };

        const response = await fetch(`${BASE_URL}/api/save-riddle`,{
            method: 'POST',
            headers
        });

        const data = await response.json();
        setTimeout(() => {
            setDisabled(false)
        },3000);
        return data;
    };
    // этот эффект зависит от текста ошибки , в функции мы чистим ошибку в стейт чтобы 
    // перменная изменялась и вызывался эффект
    useEffect(() => {
        errorFunc(message);
        return () => {
            setMessage('');
        }
    },[message]);

    return (
            <div className="riddle_list_item" data-category={category}>
                <h2 className="riddle_item_header">{header}</h2>
                <div className="riddle_item_description">{description}</div>
                {visible &&
                <div className="riddle_item_answer">
                    <span>Ответ: </span>
                    {answer}
                </div>
                }
                <div className="riddle_item_buttons">
                    <button 
                    onClick={handleChangeVisible} 
                    className="riddle_item_button_show">Показать ответ</button>
                    {loggedIn && 
                    <button
                    disabled={disabled}
                    style={{
                        backgroundColor: disabled ? 'red' : 'deeppink',
                    }}
                    data-riddle={id}
                    className="riddle_item_button_favorite"
                    onClick={handleAddRiddle}>
                        {disabled ? 'Кнопка была нажата' : "Добавить в избранное"}
                    </button>
                    }
                </div>
                <SocialMedia
                url={`${BASE_URL}/${riddleType}`}
                options={{
                    title: header
                }}/>
            </div>
        )
    };