import React from 'react';
import {Link} from 'react-router-dom';

export function SubNavBar({isUserLoggedIn}) {
    const styles = {
        marginRight: isUserLoggedIn ? '8%' : '12%',
    };
    return (
        <nav class="sub_nav">
            <div style={styles}>
                <ul class="right sub_nav_list">
                    <li>
                        <Link to="/easy">Простые</Link>
                    </li>
                    <li>
                        <Link to="/medium">Средние</Link>
                    </li>
                    <li>
                        <Link to="/hard">Сложные</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}