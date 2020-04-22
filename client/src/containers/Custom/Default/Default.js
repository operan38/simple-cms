import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import Loader from '../../../components/UI/Loader/Loader';
import {fetchCustomContainers} from '../../../store/actions/customContainers';

class Default extends Component {

    componentDidMount() {
        this.props.fetchCustomContainers(this.props.match.path);
    }

    render() {
        return (
            <div>
                <h1>Default контейнер</h1>
                { !this.props.loading && this.props.customContainersList.length !== 0 ? <h3>Title: {this.props.customContainersList.route.title}</h3> : <Loader /> }
                <button>Добавить секцию</button><br></br>
                <NavLink to='/admin/routes'>К списку маршрутов</NavLink>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        customContainersList: state.customContainers.customContainersList,
        loading: state.customContainers.loading,
        error: state.customContainers.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCustomContainers: (path) => dispatch(fetchCustomContainers(path)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Default)