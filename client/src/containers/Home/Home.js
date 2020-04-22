import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class Home extends Component {

    render() {
        return (
            <div>
                <h1><i className="fa fa-home" aria-hidden="true"></i>Домашняя страница</h1>
                <NavLink to='/admin/routes'>Cписок маршрутов</NavLink>
            </div>
        )
    }
}

export default Home