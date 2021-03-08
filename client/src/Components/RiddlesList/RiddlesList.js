import React from 'react';
import {useEffect,useState} from 'react';
import {RiddleItem} from '../RiddleItem/RiddleItem';
import './riddleList.css';

export function RiddlesList({riddles, riddleType}) {
    const [loggedIn,setLoggedIn] = useState(false);

    useEffect(() => {
        const wasUserLoggedIn = JSON.parse(localStorage.getItem('userSuccessedLoggedIn'));
        if (wasUserLoggedIn) {
            setLoggedIn(wasUserLoggedIn)
        }
    }, [])

    return (
        <div className="riddle_list_container">
            {riddles.map(riddle => 
            <RiddleItem
            riddleType={riddleType}
            riddle={riddle} 
            loggedIn={loggedIn}/>)}
        </div>
    )
}