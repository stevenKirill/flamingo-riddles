import React from 'react';
import {useState,useEffect, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {UserInfoEdit} from '../../Components/UserInfoEdit/UserInfoEdit';
import {UserInfo} from '../../Components/UserInfo/UserInfo';
import {useVisible} from '../../utils/hooks/customHooks';
import {fetchUserData} from '../../redux/actions/userActions';
import {Loader} from '../../Components/Loader/Loader';
import {FavouriteRiddles} from '../../Components/FavouriteRiddles/FavouriteRiddles';
import {CreateRiddle} from '../CreateRiddle/CreateRiddle';
import {ProjectUrlContext} from '../../context/contexts';
import './dashboard.css';

export function Dashboard() {
    const {visible, handleChangeVisible} = useVisible(true);
    const [edit, setEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const state = useSelector(state => state.user);
    const {BASE_URL} = useContext(ProjectUrlContext)
    const {loading, userData, favouriteRiddles} = state;
    const dispatch = useDispatch();

    function handleOpenEdit() {
        handleChangeVisible()
        setEdit(true)
    };

    function handleCloseEdit() {
        handleChangeVisible()
        setEdit(false)
    };

    function handleShowModal() {
        setShowModal(true);
    };

    useEffect(() => {
        /// если в локалсторадж есть ключ тогда возьми его оттуда и сделай запрос за данными
        /// ключ кладется туда после логина на странице логин и затем переход сразу на 
        /// данную страницу
        /// данный эффект всегда стартут даже после перезагрузки
        /// данные запрашиваем даже после перезагрузки
        const tokenAndId = JSON.parse(localStorage.getItem('tokenAndId'));
        if (tokenAndId) {
            const {userId} = tokenAndId;
            dispatch(fetchUserData(`${BASE_URL}/api/user-data`,userId))
        }
    },[]);

    let componentToRender;
    if (visible) {
        componentToRender = 
        <div>
            {userData && 
            <div>
                <UserInfo data={userData}/>
                <button className="edit_button" onClick={handleOpenEdit}>
                    Внести изменения
                </button>
            </div>
            }
        </div>
    } else if (edit) {
        componentToRender = <UserInfoEdit handleCloseEdit={handleCloseEdit}/>;
    };
    return (
        <div className="dashboard_container">
            {userData && <h2 className="greetig">Добро пожаловать {userData.firstName}!</h2>}
            {loading ? 
            <Loader/> :
            <div>
                <div className="dashboard_inner">
                    {favouriteRiddles && 
                        <div>
                            <h3 className="favourite_riddles_title">Избранные задачи</h3>
                            <FavouriteRiddles riddles={favouriteRiddles}/>
                        </div>
                    }
                    <div>
                        <h3 className="user_data_title">Данные пользователя</h3>
                        {componentToRender}
                    </div>
                </div>
                <div className="suggest_riddle_block">
                    {showModal && <CreateRiddle setShowModal={setShowModal}/>}
                    <button
                    className="suggest_riddle_block_button"
                    onClick={handleShowModal}>
                    Предложить свою задачу
                    </button>
                </div>
            </div>
            }
        </div>
    );
};