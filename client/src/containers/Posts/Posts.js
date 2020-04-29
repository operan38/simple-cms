import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Pagination } from 'react-bootstrap';

import { fetchPosts } from '../../store/actions/posts';

import Loader from '../../components/UI/Loader/Loader';

class Posts extends Component {
	componentDidMount() {
		this.props.fetchPosts();
	}

	renderPosts() {
		return this.props.postsList.map((post, index) => {
			return (
				<div key={index} className='mb-3 border p-2'>
					<NavLink to={'/post/' + post.id}>{post.title} </NavLink>
				</div>
			);
		});
	}

	render() {
		return (
			<div>
				<h1>Список постов</h1>
				{this.props.loading && this.props.postsList.length === 0 ? (
					<Loader />
				) : (
					this.renderPosts()
				)}
				<Pagination>
					<Pagination.First />
					<Pagination.Prev />
					<Pagination.Item active>{1}</Pagination.Item>
					<Pagination.Item>{2}</Pagination.Item>
					<Pagination.Next />
					<Pagination.Last />
				</Pagination>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		postsList: state.posts.postsList,
		loading: state.posts.loading,
		error: state.posts.error,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchPosts: () => dispatch(fetchPosts()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
