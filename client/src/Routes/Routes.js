import React, { Component } from 'react';
import RoutesDataService from "../services/routes.service";

import './Routes.css';

export default class Routes extends Component {

  /*componentDidMount() {
    fetch('/routes')
      .then(res => res.json())
  }*/

  constructor(props) {
    super(props);

    this.state = {
      routes: []
    }
  }

  componentDidMount() {
    RoutesDataService.getAll().then(response => {
      this.setState({
        routes: response.data
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }

  render () {

    let routesList = [];

    routesList = this.state.routes.map((route, index) => {
      return (
        <div key={ index }>
          <h1>{ route.title }</h1>
        </div>
      )
    })

    return (
      <h1>
        { routesList }
      </h1>
    );
  }
}