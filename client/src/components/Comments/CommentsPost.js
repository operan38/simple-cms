import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	fetchCommentsByPostId,
	fetchAddComment,
	fetchDelComment,
} from '../../store/actions/comments';

import Loader from '../UI/Loader/Loader';

class CommentsPost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			commentsTree: [],
			message: '',
		};
	}

	componentDidMount() {
		this.props.fetchCommentsByPostId(this.props.postId).then(() => {
			this.convertCommentsTree(this.props.commentsList);
		});
	}

	convertCommentsTree(comments) {
		let roots = [],
			children = {};

		// найти узлы верхнего уровня и хэшировать детей на основе родительского
		for (let i = 0, len = comments.length; i < len; ++i) {
			let item = comments[i],
				p = item.parent_id,
				target = !p ? roots : children[p] || (children[p] = []);

			target.push({ value: item });
		}

		// функция для рекурсивного построения дерева
		let findChildren = function (parent) {
			if (children[parent.value.id]) {
				parent.children = children[parent.value.id];
				for (let i = 0, len = parent.children.length; i < len; ++i) {
					findChildren(parent.children[i]);
				}
			}
		};

		// Перечислите через, чтобы обработать случай, когда есть несколько корней
		for (let i = 0, len = roots.length; i < len; ++i) {
			findChildren(roots[i]);
		}

		console.log(roots);

		this.setState({
			commentsTree: roots,
		});
	}

	subComments(comments, author) {
		return comments.map((comment, index) => {
			return (
				<div key={index}>
					<div>В ответ: {author}</div>
					<p>Cообщение: {comment.value.message}</p>
					<textarea
						className='form-control mb-2'
						placeholder='Сообщение'
						value={this.state.message}
						onChange={(e) => this.onChangeMessageHandler(e)}
					></textarea>
					<button
						type='button'
						className='btn btn-primary mb-2'
						onClick={(parent_id) => this.addCommentHandler(comment.value.id)}
						disabled={!this.props.isAuthenticated || this.state.message === ''}
					>
						Ответить
					</button>
					{comment.children ? (
						<div className='border p-2'>
							{this.subComments(comment.children, comment.value.author)}
						</div>
					) : (
						''
					)}
				</div>
			);
		});
	}

	renderComments() {
		return this.state.commentsTree.map((comment, index) => {
			return (
				<div className='mb-3 border p-2' key={index}>
					<div className='d-flex justify-content-between'>
						<div>Автор: {comment.value.author}</div>
					</div>
					<p>Cообщение: {comment.value.message}</p>
					<textarea
						className='form-control mb-2'
						placeholder='Сообщение'
						value={this.state.message}
						onChange={(e) => this.onChangeMessageHandler(e)}
					></textarea>
					<button
						type='button'
						className='btn btn-primary mb-2'
						onClick={(parent_id) => this.addCommentHandler(comment.value.id)}
						disabled={!this.props.isAuthenticated || this.state.message === ''}
					>
						Ответить
					</button>
					{comment.children ? (
						<div className='border p-2'>
							{this.subComments(comment.children, comment.value.author)}
						</div>
					) : (
						''
					)}
				</div>
			);
		});
	}

	delCommentHandler = (id) => {
		this.props.fetchDelComment(id).then(() => {
			this.props.fetchCommentsByPostId(this.props.postId).then(() => {
				this.convertCommentsTree(this.props.commentsList);
			});
		});
	};

	onChangeMessageHandler = (e) => {
		this.setState({ message: e.target.value });
	};

	addCommentHandler = (parent_id) => {
		const comment = {
			author: this.props.userLogin,
			post_id: this.props.postId,
			parent_id: parent_id,
			message: this.state.message,
		};

		console.log(comment);

		this.props.fetchAddComment(comment).then(() => {
			this.props.fetchCommentsByPostId(this.props.postId).then(() => {
				this.convertCommentsTree(this.props.commentsList);
			});
		});

		this.setState({ message: '' });
	};

	render() {
		return (
			<>
				{this.props.loading && this.props.commentsList.length === 0 ? (
					<Loader />
				) : (
					this.renderComments()
				)}
				<div className='text-right'>
					{!this.props.isAuthenticated ? (
						<div>
							Для того чтобы оставить комментарий необходимо авторизоватся.
						</div>
					) : (
						''
					)}
					<textarea
						className='form-control mb-2'
						placeholder='Сообщение'
						value={this.state.message}
						onChange={(e) => this.onChangeMessageHandler(e)}
					></textarea>
					<button
						type='button'
						className='btn btn-success'
						onClick={(parent_id) => this.addCommentHandler(0)}
						disabled={!this.props.isAuthenticated || this.state.message === ''}
					>
						Отправить
					</button>
				</div>
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		commentsList: state.comments.post.commentsList,
		loading: state.comments.loading,
		userLogin: state.auth.payload ? state.auth.payload.login : '',
		isAuthenticated: !!state.auth.payload,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchCommentsByPostId: (postId) => dispatch(fetchCommentsByPostId(postId)),
		fetchAddComment: (comment) => dispatch(fetchAddComment(comment)),
		fetchDelComment: (id) => dispatch(fetchDelComment(id)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsPost);
