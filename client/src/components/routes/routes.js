import React, { Component } from 'react';
import RoutesDataService from "../../services/routes.service";

import './routes.css';



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
        <li key={ index } className="mb-3 border p-2">
          <b>title:</b> { route.title }
          <br></br>
          <span><b>url:</b> { route.url }</span>
          <br></br>
          <span><b>component:</b> { route.component }</span>
          <form method="POST" action="/api/routes/del">
            <input type="hidden" name="id" value={ route.id }></input>
            <button className="btn btn-danger" type="submit">Удалить</button>
          </form>
        </li>
      )
    })

    return (
      <div>
        <h3>Список маршрутов:</h3>
        <ul>
          { routesList }
        </ul>
        <div>
            <form method="POST" action="/api/routes/add">
              <div className="d-inline-flex flex-column p-2">
                <input name="title" className="mb-2" type="text" placeholder="title"></input>
                <input name="url" className="mb-2" type="text" placeholder="url"></input>
                <button className="btn btn-success" type="submit">Добавить</button>
              </div>
            </form>
        </div>
      </div>
    );
  }
}