import React, { Component } from 'react';
import Radium from 'radium';

import Routes from './Routes/Routes'

import './App.css';

class App extends Component {

  /*state = {
    routes: [
      {
        title: 'Test',
        url: '/test'
      },
      {
        title: 'Главная',
        url: '/'
      }
    ],
    pageTitle: 'Test',
    showRoutes: false
  }*/

  state = {
    dataView: [],
    showDataView: false
  }

  componentDidMount() {
    fetch('/test')
      .then(res => res.json())
      .then(res => this.setState({ dataView: res, showDataView: true }))
  }

  changeTitleHandler = (newTitle) => {

    this.setState({
      pageTitle: newTitle
    })
  }

  toggleRouteHandler = () => {
    this.setState({
      showRoutes: !this.state.showRoutes
    })
  }

  onChangeTitleText = (e) => {


    this.setState({
      pageTitle: e.target.value
    })
  }

  render() {

    let routesTitle = null

    if (this.state.showDataView)
      routesTitle = this.state.dataView.route.title;

    /*if (this.state.showRoutes) {
      routes = this.state.routes.map((route, index) => {
        return (
          <div key={index}>
            <h1>{route.title}</h1>
            <h3>{route.url}</h3>
          </div>
        )
      })
    }*/

    /*routes = this.state.routes.map((route, index) => {
      return (
        <div key={index}>
          <h1>{route}</h1>
          <h3>{route}</h3>
        </div>
      )
    })*/

    const style = {
      border: '1px solid #ccc',
      margin: '10px',
    }

    return (
      <div className="App" style={style}>

        <input type="text" onChange={this.onChangeTitleText}/>

        {/*<button onClick={this.changeTitleHandler.bind(this, 'Changed!')}>Change</button>*/}

        <button onClick={this.toggleRouteHandler}>Change</button>

        <Routes pageTitle={this.state.pageTitle} onChangeTitle={this.changeTitleHandler.bind(this, 'ChangeTest')}/>

        <p>{ routesTitle }</p>

      </div>
    );
  }
}

export default App;
