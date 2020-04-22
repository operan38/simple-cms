import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class Dynamic extends Component {

    test() {
        return true;
    }

    render() {
        return (
            <div>
                <h1>Dynamic контейнер</h1>
                <NavLink to='/routes'>К списку маршрутов</NavLink>
            </div>
        )
    }
}

export default Dynamic