import React, { Component } from 'react';

import './Routes.css';

class Routes extends Component {

  state = {
    dataView: '',
    showDataView: false,
  }

  componentDidMount() {
    fetch('/test')
      .then(res => res.json())
      .then(res => this.setState({ dataView: res, showDataView: true }))
  }

  render () {

    return (
      <h1>
        Routes
      </h1>
      
    );
  }
}

export default Routes;