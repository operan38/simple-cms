import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchPosts, fetchDelPost } from '../../store/actions/posts';
import { fetchDelCommentsByPostId } from '../../store/actions/comments';

import PaginationLib from '../../components/Pagination/PaginationLib';
import Loader from '../../components/UI/Loader/Loader';

class Posts extends Component {
	componentDidMount() {}

	onChangePage = (start, end) => {
		this.props.fetchPosts({ start, end });
	};

	delPostHandler = (id) => {
		console.log(id);
		this.props.fetchDelCommentsByPostId(id);
	};

	renderPosts() {
		return this.props.postsList.map((post, index) => {
			return (
				<div key={index} className='mb-3 border p-2'>
					<div className='d-flex align-items-center justify-content-between'>
						<Link to={'/post/' + post.id}>{post.title}</Link>
						<button
							type='button'
							className='btn btn-danger'
							onClick={() => this.delPostHandler(post.id)}
						>
							Удалить все комментарии
						</button>
					</div>
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
						{...this.props}
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
		fetchDelCommentsByPostId: (id) => dispatch(fetchDelCommentsByPostId(id)),
		fetchDelPost: (id) => dispatch(fetchDelPost(id)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
