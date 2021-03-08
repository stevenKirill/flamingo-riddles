import React from 'react';
import {useEffect,useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RiddlesList} from '../../Components/RiddlesList/RiddlesList';
import {Loader} from '../../Components/Loader/Loader';
import {PaginationTabs} from '../../Components/PaginationTabs/PaginationTabs';
import {loadAsyncRiddles} from '../../redux/actions/riddlesActions';
import {ErrorComponent} from '../../Components/ErrorComponent/ErrorComponent';
import {ProjectUrlContext} from '../../context/contexts';

export function RiddlesPage() {
    const {pathname} = window.location;
    // строчка для корректного запроса задач
    const stripped = pathname.replace(/\//,'');
    const dispatch = useDispatch();
    const state = useSelector(state => state.riddles);
    const {BASE_URL} = useContext(ProjectUrlContext);
    const {loading, data, error} = state;
    useEffect(() => {
        const url = new URL(`${BASE_URL}/api/${stripped}`);
        url.searchParams.append('page',1);
        const headers = {
            method: "POST",
            body: url.search,
            'Content-Type': 'application/json',
        }
        try {
            dispatch(loadAsyncRiddles(url,headers));
        } catch (error) {}
    }, [dispatch, stripped])
    let component;
    if (error) {
        component = <ErrorComponent error={error}/>;
    }
    if (data) {
        component = <RiddlesList riddles={data} riddleType={stripped}/>;
    }
    return (
        <div>
            {loading ? 
            <Loader/> : 
            <div>
                {component}
                <PaginationTabs riddleType={stripped}/>
            </div>
            }
        </div>
    )
}