import React, { Component } from 'react';

class Home extends Component {

  componentDidMount() {
    fetch('/home')
      .then(res => res.json())
  }

  render () {

    return (
      <h1>
        Home
      </h1>
      
    );
  }
}

export default Home;