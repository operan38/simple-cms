import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class Default extends Component {

    render() {
        return (
            <div>
                <h1>Default страница</h1>
                <NavLink to='/routes'>К списку маршрутов</NavLink>
            </div>
        )
    }
}

export default Default