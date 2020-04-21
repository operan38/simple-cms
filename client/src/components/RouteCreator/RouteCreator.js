import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchAddRoute} from '../../store/actions/routes';

class RouteCreator extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            title: '',
            path: ''
        }
    }

    addRouteHandler = (title, path) => {

        let route = {
            title,
            path
        }

        this.props.fetchAddRoute(route)

        this.setState({
            title: '',
            path: ''
        })
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
                    <input name="title" className="mb-2" type="text" placeholder="title" value={this.state.title} onChange={this.onTitleChange}></input>
                    <input name="path" className="mb-2" type="text" placeholder="path" value={this.state.path} onChange={this.onPathChange}></input>
                    <button className="btn btn-success" type="submit" onClick={() => this.addRouteHandler(this.state.title, this.state.path)}>Добавить</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchAddRoute: (route) => dispatch(fetchAddRoute(route))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteCreator)