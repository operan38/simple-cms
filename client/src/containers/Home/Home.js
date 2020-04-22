import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class Home extends Component {

    render() {
        return (
            <div>
                <h1>Домашняя страница</h1>
                <NavLink to='/routes'>К списку маршрутов</NavLink>
            </div>
        )
    }
}

export default Home