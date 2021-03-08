import React from 'react';
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import about from '../../assets/about.png';
import './about.css'
export function About() {
    const [showLink,setShowLink] = useState(true);
    useEffect(() => {
        const loggedIn = JSON.parse(localStorage.getItem('userSuccessedLoggedIn'));
        if (loggedIn) {
            setShowLink(false);
        }

    }, []);
    return (
        <div className="about_container">
            <div>
                <h1 className="about_title">О проекте</h1>
                <p className="about_text_description">
                    Сайт про загадки. Тут можно решать загадки, а так же предложить свои.
                </p>
                {showLink &&
                <p>
                    <Link to="/auth">Регестрируйтесь</Link>,и приятного времяпровождения
                </p>}
            </div>
            <img src={about} alt="about" width="500px" height="500px" className="about_img"/>
        </div>
    );
}