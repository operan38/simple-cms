import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchPosts, fetchDelPost } from '../../store/actions/posts';
import { fetchDelCommentsByPostId } from '../../store/actions/comments';

import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/UI/Loader/Loader';

class Posts extends Component {
	onChangePage = async (limit, offset) => {
		await this.props.fetchPosts(limit, offset);
	};

	delPostCommentsHandler = (id) => {
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
							onClick={() => this.delPostCommentsHandler(post.id)}
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
					''
				)}

				{!this.props.loading && this.props.postsList.length === 0 ? (
					<div className='w-100 text-center'>Список пуст</div>
				) : (
					''
				)}

				{!this.props.loading && this.props.postsList.length !== 0 ? (
					this.renderPosts()
				) : (
					<Loader />
				)}

				<Pagination
					pageSize={4}
					items={this.props.postsList}
					countItems={this.props.count}
					onChangePage={this.onChangePage}
					{...this.props}
				/>
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
		fetchPosts: (limit, offset) => dispatch(fetchPosts(limit, offset)),
		fetchDelCommentsByPostId: (id) => dispatch(fetchDelCommentsByPostId(id)),
		fetchDelPost: (id) => dispatch(fetchDelPost(id)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
