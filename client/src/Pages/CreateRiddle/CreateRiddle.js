import React from 'react';
import {useState, useContext} from 'react';
import {useFormValue, useMessage} from '../../utils/hooks/customHooks';
import {ProjectUrlContext} from '../../context/contexts';
import './createRiddle.css';

export function CreateRiddle({ setShowModal }) {
    const {value, onChange} = useFormValue({
        header: '',
        description: '',
        category: '',
        answer: ''
    });
    const message = useMessage();
    const [disabled, setDisabled] = useState(false);
    const {BASE_URL} = useContext(ProjectUrlContext);
    async function handleSendNewRiddle(e) {
        e.preventDefault();
        setDisabled(true);
        const emptyValues = Object.values(value).some(value => value === '');
        const {userId} = JSON.parse(localStorage.getItem('tokenAndId'));
        if (emptyValues) {
            message('Все поля должны быть заполнены');
            setTimeout(() => {
                setDisabled(false)
            },4000)
        } else {
            // здесь запрос с данными формы на бэк
            const body = JSON.stringify(value);
            const headers = {
                'Content-Type': 'application/json',
                'userId': userId,
            };
            const response = await fetch(`${BASE_URL}/api/create-new-riddle`,{
                method: 'POST',
                body,
                headers
            });
            const data = await response.json();
            // показать message что задача была отправлена
            if (data.message) {
                message(data.message)
            }
            setShowModal(false);
        }
    };
    function handleCloseModal(e) {
        if (!e.target.classList.contains('create_riddle_form_wrapper')) {
            return
        };
        setShowModal(false)
    }
    return (
        <div className="create_riddle_form_wrapper" onClick={handleCloseModal}>
            <form className="create_riddle_form" onSubmit={handleSendNewRiddle}>
                <header className="create_riddle_header">
                    <h4 style={{marginTop: '0px'}}>Форма отправки задачи</h4>
                </header>
                <section className="create_riddle_body">
                    <div className="input-field riddle_inputs_common_styles">
                    <div className="riddle_inputs_titles">Название задачи</div>
                        <input 
                        placeholder="введите название" 
                        id="riddle_title" 
                        type="text"
                        maxLength="50"
                        name="header"
                        onChange={onChange}
                        value={value.header}/>
                    </div>
                    <div className="input-field riddle_inputs_common_styles">
                    <div className="riddle_inputs_titles">Текст задачи</div>
                        <textarea 
                        className="materialize-textarea"
                        placeholder="введите условие"
                        maxLength="300"
                        name="description"
                        onChange={onChange}
                        value={value.description}>
                        </textarea>
                    </div>
                    <div className="row riddle_inputs_common_styles">
                        <div className="riddle_inputs_titles">Категория</div>
                        <div>
                            <label>
                                <input
                                type="radio"
                                name="category"
                                onChange={onChange}
                                value="easy"/>
                                <span>Легкая</span>
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                type="radio"
                                name="category"
                                onChange={onChange}
                                value="medium"/>
                                <span>Средняя</span>
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                type="radio"
                                name="category"
                                onChange={onChange}
                                value="hard"/>
                                <span>Сложная</span>
                            </label>
                        </div>
                        </div>
                    <div className="input-field riddle_inputs_common_styles">
                        <div className="riddle_inputs_titles">Ответ к задаче</div>
                        <textarea
                        className="materialize-textarea"
                        placeholder="введите ответ"
                        name="answer"
                        onChange={onChange}
                        value={value.answer}>
                        </textarea> 
                    </div>
                </section>
                <footer className="create_riddle_footer">
                    <div className="create_riddle_footer_buttons">
                        <button
                        disabled={disabled}
                        style={{backgroundColor: disabled ? 'red' : 'deeppink'}}
                        onClick={handleSendNewRiddle}
                        className="create_riddle_footer_button_send">
                        Отправить
                        </button>
                        <button
                        className="create_riddle_footer_button_cancel"
                        onClick={() => setShowModal(false)}>
                        Отмена
                        </button>
                    </div>
                </footer>
            </form>
        </div>
    );
};