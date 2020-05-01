import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchPostById } from '../../store/actions/posts';
import { fetchCommentsByPostId } from '../../store/actions/comments';

import Loader from '../../components/UI/Loader/Loader';

class Post extends Component {
	componentDidMount() {
		this.props.fetchPostById(this.props.match.params.id);
		this.props.fetchCommentsByPostId(this.props.match.params.id);
	}

	renderComments() {
		return this.props.commentsList.map((comment, index) => {
			return (
				<div className='mb-3 border p-2' key={index}>
					<div>Автор: {comment.user}</div>
					<p>Cообщение: {comment.message}</p>
				</div>
			);
		});
	}

	renderPost() {
		return (
			<div className='mb-3 border p-2'>
				<Link to={'/posts'}>К списку постов</Link>
				<h1>{this.props.post.title}</h1>
				<h3>{this.props.post.subtitle}</h3>
				<p>{this.props.post.text}</p>
				<span>{this.props.post.created}</span>
			</div>
		);
	}

	render() {
		return (
			<div>
				{this.props.loading || this.props.post === null ? (
					<Loader />
				) : (
					this.renderPost()
				)}
				<h4>Список коментариев</h4>
				{this.props.commentsLoading && this.props.commentsList.length === 0 ? (
					<Loader />
				) : (
					this.renderComments()
				)}
				{console.log(this.props.post)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		post: state.posts.post,
		commentsList: state.comments.post.commentsList,
		commentsLoading: state.comments.post.loading,
		loading: state.posts.loading,
		error: state.posts.error,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchPostById: (id) => dispatch(fetchPostById(id)),
		fetchCommentsByPostId: (id) => dispatch(fetchCommentsByPostId(id)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
