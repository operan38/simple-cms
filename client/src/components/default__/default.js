import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

export default class Default extends Component {
	componentDidMount() {
		fetch('/custom' + this.props.location.pathname, { method: 'POST' })
			.then((res) => res.json())
			.then((res) => this.setState({ data: res, isLoadData: true }));
	}

	constructor(props) {
		super(props);

		this.state = {
			data: [],
			isLoadData: false,
		};
	}

	render() {
		return (
			<div>
				<h3>{this.state.isLoadData ? this.state.data.route.title : ''}</h3>
				<h4>{this.props.location.pathname}</h4>
				<NavLink to='/routes'>К списку маршрутов</NavLink>
			</div>
		);
	}
}
