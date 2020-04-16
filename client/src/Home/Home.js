import React, { Component } from 'react';

class Home extends Component {

  /*componentDidMount() {
    fetch('/')
      .then(res => res.json())
  }*/

  constructor(props) {
    super(props);
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