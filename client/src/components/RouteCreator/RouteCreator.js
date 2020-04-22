import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchAddRoute} from '../../store/actions/routes';
import {fetchContainers} from '../../store/actions/containers';

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

        console.log(container_id);

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

    onContainerChange = (e) => {
        e.preventDefault();
        this.setState({ container_id: e.target.value })
    }

    onTitleChange = (e) => {
        e.preventDefault();
        this.setState({ title: e.target.value, });
    }
    
    onPathChange = (e) => {
        e.preventDefault();
        this.setState({ path: e.target.value, });
    }

    render() {
        return (
            <div>
                <div className="d-inline-flex flex-column p-2">
                    <input className="mb-2" type="text" placeholder="title" value={this.state.title} onChange={this.onTitleChange}></input>
                    <input className="mb-2" type="text" placeholder="path" value={this.state.path} onChange={this.onPathChange}></input>
                    <select className="mb-2" onChange={this.onContainerChange}>
                        <option selected></option>
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