import React from 'react';
import {useState, useContext} from 'react';
import {useVisible} from '../../utils/hooks/customHooks';
import {useDispatch} from 'react-redux';
import {deleteFetchRiddle} from '../../redux/actions/userActions';
import {ProjectUrlContext} from '../../context/contexts';
import './favouriteRiddle.css';

export function FavouriteRiddle({riddle}) {
    const {visible,handleChangeVisible} = useVisible(false);
    const [blurred, setBlurred] = useState(true);
    const {BASE_URL} = useContext(ProjectUrlContext);
    const dispatch = useDispatch();
    function handleDeleteRiddle(event) {
        const tokenAndId = JSON.parse(localStorage.getItem('tokenAndId'));
        const {userId} = tokenAndId;
        const riddleId = event.target.parentNode.dataset.id;
        if (userId && riddleId) {
            dispatch(deleteFetchRiddle(`${BASE_URL}/api/delete-riddle`,userId,riddleId))
        };
    };
    return (
        <div className="favourite_riddle" data-id={riddle.id}>
            <h3 className="riddle_fav_header">{riddle.header}</h3>
            <button onClick={handleChangeVisible} className="fav_riddle_open">Раскрыть</button>
            <button className="delete_riddle" onClick={handleDeleteRiddle}>Удалить</button>
            {visible &&
                <div>
                    <div>
                        <label className="riddle_fav_text_label">Текст задачи: </label>
                        <p className="riddle_fav_text">{riddle.description}</p>
                    </div>
                    <div>
                        <label className="riddle_fav_answer_label">Ответ: </label>
                        <button onClick={() => setBlurred(prev => !prev)}>Показать:</button>
                        <p 
                        className="riddle_fav_answer"
                        style={{
                            filter: blurred ? "blur(4px)" : 'blur(0)'
                        }}>
                            {riddle.answer}
                        </p>
                    </div>
                </div>
            }
        </div>
        );
};