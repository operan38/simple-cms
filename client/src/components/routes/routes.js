import React, { Component } from 'react';
import RoutesDataService from "../../services/routes.service";

import { NavLink } from 'react-router-dom';

import './routes.css';



export default class Routes extends Component {

  /*componentDidMount() {
    fetch('/routes')
      .then(res => res.json())
  }*/

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      url: ''
    }
  }

  /*getData() {
    RoutesDataService.getAll().then(response => {
      this.setState({
        routes: response.data
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }*/

  componentDidMount() {
    //this.getData();
  }

  handleAdd = (title, url) => {
    RoutesDataService.add({'title': title, 'url': url}).then(response => {
      console.log(response.data);
      this.setState({title: '', url: ''})
      this.props.getData();
    })
    .catch(e => {
      console.log(e);
    });
  } 

  handleDelete = (id) => {
    RoutesDataService.del({'id': id}).then(response => {
      console.log(response.data);
      this.props.getData();
    })
    .catch(e => {
      console.log(e);
    });
  }
  
  onTitleChange = (e) => {
    this.setState({ title: e.target.value, });
  }

  onUrlChange = (e) => {
    this.setState({ url: e.target.value, });
  }

  render () {

    let routesList = [];

    routesList = this.props.routes.map((route, index) => {
      return (
        <li key={ index } className="mb-3 border p-2">
          <b>title:</b> <NavLink to={ route.url }>{ route.title }</NavLink>
          <br></br>
          <span><b>url:</b><NavLink to={ route.url }>{ route.url }</NavLink></span>
          <br></br>
          <span><b>component:</b> { route.component }</span><br></br>
          <button type="button" className="btn btn-danger" onClick={() => this.handleDelete(route.id)}>Удалить</button>
        </li>
      )
    });

    return (
      <div>
        <h3>Список маршрутов:</h3>
        <NavLink to="/">Главная</NavLink>
        <ul>
          { routesList }
        </ul>
        <div>
            {/*<form method="POST" action="/api/routes/add">*/}
              <div className="d-inline-flex flex-column p-2">
                <input name="title" className="mb-2" type="text" placeholder="title" value={this.state.title} onChange={this.onTitleChange}></input>
                <input name="url" className="mb-2" type="text" placeholder="url" value={this.state.url} onChange={this.onUrlChange}></input>
                <button className="btn btn-success" onClick={() => this.handleAdd(this.state.title, this.state.url)} type="submit">Добавить</button>
              </div>
            {/*</form>*/}
        </div>
      </div>
    );
  }
}