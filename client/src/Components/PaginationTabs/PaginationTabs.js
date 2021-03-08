import React from 'react';
import {useRef, useEffect, useContext} from 'react';
import {useDispatch} from 'react-redux';
import {loadAsyncRiddles} from '../../redux/actions/riddlesActions';
import {ProjectUrlContext} from '../../context/contexts';
import {EASY,MEDIUM,HARD} from '../../consts';
import './paginationTabs.css';

const fillWithNumners = (number) => {
    return Array.from({length: number}, (_,i) => ++i);
}

export function PaginationTabs({riddleType}) {
    const buttonsContainer = useRef(null);
    const {BASE_URL} = useContext(ProjectUrlContext);
    useEffect(() => {
        const {current} = buttonsContainer;
        if (current !== null) {
            const {children} = current;
            for(let i = 0; i < children.length; i++) {
                if (riddleType === EASY) {
                    children[i].classList.add('pagination_button_short_length');
                } else if (riddleType === MEDIUM) {
                    children[i].classList.add('pagination_button_medium_length');
                } else if (riddleType === HARD) {
                    children[i].classList.add('pagination_button_long_length');
                }
            };
        }
    },[riddleType]);

    let pages;
    if (riddleType === EASY) {
        pages = fillWithNumners(8);
    } else if (riddleType === MEDIUM) {
        pages = fillWithNumners(6)
    } else if (riddleType === HARD) {
        pages = fillWithNumners(4);
    }
    const dispatch = useDispatch();
    const baseURL = `${BASE_URL}/api/${riddleType}`;

    function handlePageClick(number) {
        const url = new URL(baseURL);
        url.searchParams.append('page',number);
        const headers = {
            method: "POST",
            body: url.search,
            'Content-Type': 'application/json',
        };
        dispatch(loadAsyncRiddles(url,headers));
    }
    return (
        <div className="pagination_buttons" ref={buttonsContainer}>
            {pages.map(number => {
                return (
                    <button 
                    onClick={() => handlePageClick(number)} 
                    className="pagination_button"
                    >
                        {number}
                    </button>
                )
            })}
        </div>
    )
};