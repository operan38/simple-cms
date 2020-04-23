import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import {fetchRoutes, fetchDelRoute} from '../../store/actions/routes';

import RouteCreator from '../../components/RouteCreator/RouteCreator';
import Loader from '../../components/UI/Loader/Loader';

class Routes extends Component {

    componentDidMount() {
        this.props.fetchRoutes();
    }

    delRouteHandler = (id) => {
        this.props.fetchDelRoute(id);
    }

    showRoutes() {
        return this.props.customRoutes.map((route, index) => {
            return (
                <div key={ index } className="mb-3 border p-2">
                    <b>Title: </b> <NavLink to={ route.path }>{ route.title } </NavLink>
                    <span><b>Path: </b> <NavLink to={ route.path }>{ route.path } </NavLink></span>
                    <span><b>Сontainer: </b> { route.container_title } </span>
                    <button type="button" className="btn btn-danger" onClick={() => this.delRouteHandler(route.id)}>Удалить</button>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <h1>Список маршрутов</h1>
                { this.props.loading && this.props.customRoutes.length === 0 ? <Loader /> : this.showRoutes() }
                { !this.props.loading && this.props.customRoutes.length === 0 ? <div className="w-100 text-center">Список пуст</div> : ''}
                <RouteCreator />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        customRoutes: state.routes.customRoutes,
        loading: state.routes.loading,
        error: state.routes.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchRoutes: () => dispatch(fetchRoutes()),
        fetchDelRoute: (id) => dispatch(fetchDelRoute(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)