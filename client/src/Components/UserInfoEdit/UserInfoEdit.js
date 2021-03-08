import React from 'react';
import {useContext} from 'react';
import {useFormValue} from '../../utils/hooks/customHooks';
import {countryList} from './countries';
import {useDispatch} from 'react-redux';
import {updateUserData} from '../../redux/actions/userActions';
import {ProjectUrlContext} from '../../context/contexts';
import './userInfoEdit.css';

export function UserInfoEdit({handleCloseEdit}) {
    const {value, onChange} = useFormValue({
        firstName: '',
        gender: '',
        country: '',
        hobbies: '',
    });
    const {BASE_URL} = useContext(ProjectUrlContext);
    const dispatch = useDispatch();

    function handleUpdateData(event) {
        event.preventDefault();
        const tokenAndId = JSON.parse(localStorage.getItem('tokenAndId'));
        const {userId} = tokenAndId;
        dispatch(updateUserData(`${BASE_URL}/api/edit`,value,userId));
        handleCloseEdit();
    };

    return (
        <form className="dashboard_user_info_edit" onSubmit={handleUpdateData}>
            <div class="row edit_info_row">
                <div className="select_name">Имя</div>
                    <input
                    name="firstName"
                    value={value.firstName} 
                    id="first_name" 
                    type="text"
                    onChange={onChange}/>
            </div>
            <div class="row edit_info_row">
                <div className="select_gender">Пол</div>
                <label>
                    <input 
                    name="gender" 
                    type="radio" 
                    class="pink lighten-3"
                    value="Мужской"
                    onChange={onChange}/>
                    <span>Мужской</span>
                </label>
                <label>
                    <input 
                    name="gender"
                    type="radio"
                    class="pink lighten-3"
                    value="Женский"
                    onChange={onChange}/>
                    <span>Женский</span>
                </label>
            </div>
            <div class="row edit_info_row">
                <div className="select_country">Cтрана</div>
            <select className="select_country_list" 
            value={value.country}
            name="country" 
            onChange={onChange}>
                {countryList.map(country => {
                    return (
                    <option
                    value={country}
                    className="select_country_item">
                    {country}
                    </option>
                    )
                })}
            </select>
            </div>
            <div class="row edit_info_row">
            <div className="select_hobbies">Увлечения</div>
                <textarea 
                value={value.hobbies}
                className="materialize-textarea"
                onChange={onChange}
                name="hobbies"/>
            </div>
            <div className="edit_footer_buttons">
            <button onClick={handleUpdateData} className="edit_save_button">Сохранить данные</button>
            <button onClick={handleCloseEdit} className="edit_cancel_button">Отмена</button>
            </div>
        </form>
    );
};