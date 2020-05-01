import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchPosts } from '../../store/actions/posts';

import PaginationLib from '../../components/UI/Pagination/PaginationLib';
import Loader from '../../components/UI/Loader/Loader';

class Posts extends Component {
	componentDidMount() {}

	onChangePage = (start, end) => {
		this.props.fetchPosts({ start, end });
	};

	renderPosts() {
		return this.props.postsList.map((post, index) => {
			return (
				<div key={index} className='mb-3 border p-2'>
					<Link to={'/post/' + post.id}>{post.title}</Link>
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

				{this.props.loading && this.props.postsList.length === 0 ? (
					<Loader />
				) : (
					<PaginationLib
						items={this.props.postsList}
						countItems={this.props.count}
						pageSize={4}
						onChangePage={this.onChangePage}
					/>
				)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		postsList: state.posts.postsList,
		count: state.posts.count,
		loading: state.posts.loading,
		error: state.posts.error,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchPosts: (limit) => dispatch(fetchPosts(limit)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
