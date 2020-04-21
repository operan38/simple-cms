import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

export default class Home extends Component {

  /*componentDidMount() {
    fetch('/')
      .then(res => res.json())
  }*/

  /*constructor(props) {
    super(props);
  }*/

  render () {

    return (
      <div>
        <h2>Home</h2>

        <NavLink to="/routes">Список маршрутов</NavLink>
        
      </div>
      
    );
  }
}