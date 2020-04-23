import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchAddRoute} from '../../store/actions/routes';
import {fetchContainers} from '../../store/actions/containers';

import Input from '../UI/Input/Input';

class RouteCreator extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            title: '',
            path: '',
            container_id: ''
        }
    }

    componentDidMount() {
        this.props.fetchContainers();
    }

    addRouteHandler = (title, path, container_id) => {

        let route = {
            title,
            path,
            container_id
        }

        this.props.fetchAddRoute(route);

        this.setState({
            title: '',
            path: '',
            container_id: ''
        })
    }

    showContainers() {
        return this.props.containersList.map((container, index) => {
            return (
                <option key={index} value={container.id}>{container.title}</option>
            )
        })
    }

    onChangeContainer = (e) => {
        e.preventDefault();
        this.setState({ container_id: e.target.value })
    }

    onChangeTitle = (e) => {
        e.preventDefault();
        this.setState({ title: e.target.value, });
    }
    
    onChangePath = (e) => {
        e.preventDefault();
        this.setState({ path: e.target.value, });
    }

    render() {
        return (
            <div>
                <div className="d-inline-flex flex-column p-2">
                    <Input className="mb-3" placeholder="title" onChange={this.onChangeTitle} value={this.state.title}></Input>
                    <Input className="mb-3" placeholder="path" onChange={this.onChangePath} value={this.state.path}></Input>
                    <select className="form-control mb-2" onChange={this.onChangeContainer}>
                        <option></option>
                        { this.props.loading && this.props.customRoutes.length !== 0 ? <option disabled selected>загрузка...</option> : this.showContainers() }
                    </select>
                    <button className="btn btn-success" type="submit" onClick={() => this.addRouteHandler(this.state.title, this.state.path, this.state.container_id)}>Добавить</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        containersList: state.containers.containersList,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchAddRoute: (route) => dispatch(fetchAddRoute(route)),
        fetchContainers: () => dispatch(fetchContainers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteCreator)