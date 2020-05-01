import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Loader from '../../../components/UI/Loader/Loader';
import { fetchCustomContainerByPath } from '../../../store/actions/customContainer';

class Default extends Component {
	componentDidMount() {
		this.props.fetchCustomContainerByPath(this.props.match.path);
	}

	render() {
		return (
			<div>
				<h1>Default контейнер</h1>
				{!this.props.loading && this.props.list.length !== 0 ? (
					<h3>Title: {this.props.list.route.title}</h3>
				) : (
					<Loader />
				)}
				<br></br>
				<NavLink to='/admin/routes'>К списку маршрутов</NavLink>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		list: state.customContainer.list,
		loading: state.customContainer.loading,
		error: state.customContainer.error,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchCustomContainerByPath: (path) =>
			dispatch(fetchCustomContainerByPath(path)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Default);
