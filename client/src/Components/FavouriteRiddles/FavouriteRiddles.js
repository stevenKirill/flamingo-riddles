import React from 'react';
import {useEffect, useRef} from 'react';
import {FavouriteRiddle} from '../FavouriteRiddle/FavouriteRiddle';
import './favouriteRiddles.css';

export function FavouriteRiddles({riddles}) {
    const ref = useRef();
    // effect для вычисления scroll
    useEffect(() => {
        const favRiddlesContainer = ref.current;
        if (favRiddlesContainer && favRiddlesContainer.offsetHeight > 420) {
            favRiddlesContainer.classList.add('scrollable')
        };
    }, []);

    if(riddles.length === 0) {
        return (
            <div className="no_favourite_riddles">У вас нет любимых загадок</div>
        )
    } else {
        return (
            <div className="favourite_riddles" ref={ref}>
                {riddles.map(riddle => <FavouriteRiddle riddle={riddle}/>)}
            </div>
        );
    }
};