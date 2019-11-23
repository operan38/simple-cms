import React, { Component } from 'react';

import './Routes.css';

class Routes extends Component {
  render () {

    return (
      <h1>
        {this.props.pageTitle}
        <button onClick={this.props.onChangeTitle}>Click</button>
      </h1>
      
    );
  }
}

export default Routes;