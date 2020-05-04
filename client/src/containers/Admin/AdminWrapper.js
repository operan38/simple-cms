import React, { Component } from 'react';
import { connect } from 'react-redux';

class AdminWrapper extends Component {
	componentDidMount() {
		this.checkAdmin();
	}

	checkAdmin() {
		if (!this.props.userIsAdmin) {
			console.log('noAdmin');
		}
	}

	render() {
		return (
			<div>
				{this.props.userIsAdmin}
				{this.props.children}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		userIsAdmin: state.auth.userIsAdmin,
	};
}

export default connect(mapStateToProps)(AdminWrapper);
