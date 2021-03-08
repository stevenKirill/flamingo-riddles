import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCoffee,faUser,faGamepad,faPlane} from '@fortawesome/free-solid-svg-icons'
import './UserInfo.css';

export function UserInfo({data}) {
    const {firstName, gender, hobbies, country} = data;
    return (
        <div>
            <div className="user_info_container">
                <ul className="user_info_container_list">
                    <li className="user_info_container_item">
                        <div style={{
                            marginLeft: '10px',
                            marginRight: '5px'
                        }}>
                            <FontAwesomeIcon icon={faUser}/>
                        </div>
                        <div className="user_info_container_item_label">Имя:</div>
                        <span>
                            {firstName ? firstName : 'Не заполнено'}
                        </span>
                    </li>
                    <li className="user_info_container_item">
                        <div style={{
                            marginLeft: '10px',
                            marginRight: '5px'
                        }}>
                            <FontAwesomeIcon icon={faCoffee}/>
                        </div>
                        <div className="user_info_container_item_label">Пол:</div>
                        <span>
                            {gender ? gender : 'Не заполнено'}
                        </span>
                    </li>
                    <li className="user_info_container_item">
                        <div style={{
                            marginLeft: '10px',
                            marginRight: '5px'
                        }}>
                            <FontAwesomeIcon icon={faPlane}/>
                        </div>
                        <div className="user_info_container_item_label">Страна:</div>
                        <span>
                            {country ? country : 'Не заполнено'}
                        </span>
                    </li>
                    <li className="user_info_container_item hobbies_item">
                        <div style={{
                            marginLeft: '10px',
                            marginRight: '5px'
                        }}>
                            <FontAwesomeIcon icon={faGamepad}/>
                        </div>
                        <div className="user_info_container_item_label">Увлечения:</div>
                        <span>
                            {hobbies ? hobbies : 'Не заполнено'}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};