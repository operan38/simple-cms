import React, { Component } from 'react';

export default class Default extends Component {

  /*componentDidMount() {
    fetch('/')
      .then(res => res.json())
  }*/

  constructor(props) {
    super(props);

    console.log(props);
  }

  render () {

    return (
        <h3>
            {this.props.location.pathname}
        </h3>
    );
  }
}