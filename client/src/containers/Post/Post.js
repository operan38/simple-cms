import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ReactQuill from 'react-quill';

import { fetchPostById, fetchUpdPost } from '../../store/actions/posts';

import { formatDayMonthYear } from '../../framework/date';

import CommentsPost from '../../components/Comments/CommentsPost';
import notFoundPhoto from '../../assets/notFoundPhoto.jpg';

import Loader from '../../components/UI/Loader/Loader';

class Post extends Component {
	constructor(props) {
		super(props);

		this.state = {
			editMode: false,
			quillValue: '',
		};
	}

	componentDidMount() {
		this.props.fetchPostById(this.props.match.params.id).then(() => {
			this.onChangeQuillHandler(this.props.post.text);
		});
	}

	textEditHandler = () => {
		this.setState({
			editMode: true,
		});
	};

	cancelEditHandler = () => {
		this.setState({
			editMode: false,
		});
	};

	submitEditHandler = () => {
		const d = new Date();

		const post = {
			id: this.props.post.id,
			title: this.props.post.title,
			subtitle: this.props.post.subtitle,
			text: this.state.quillValue,
			updated:
				d.toISOString().split('T')[0] + ' ' + d.toTimeString().split(' ')[0],
		};

		this.setState({
			editMode: false,
		});

		this.props.fetchUpdPost(post);
	};

	onChangeQuillHandler = (html) => {
		this.setState({
			quillValue: html,
		});
		console.log(html);
	};

	renderPost() {
		return (
			<div className='mb-3 border p-2'>
				<Link to={'/posts'}>К списку постов</Link>
				<h1>{this.props.post.title}</h1>
				<img src={notFoundPhoto} alt=''></img>
				<div>
					<div>
						{this.state.editMode ? (
							<>
								<div className='text-right mb-2'>
									<button
										className='btn btn-success mr-1'
										onClick={this.submitEditHandler}
									>
										Сохранить
									</button>
									<button
										className='btn btn-danger'
										onClick={this.cancelEditHandler}
									>
										Отменить
									</button>
								</div>

								<ReactQuill
									theme='snow'
									value={this.state.quillValue}
									onChange={this.onChangeQuillHandler}
								/>
							</>
						) : (
							<>
								<div className='text-right mb-2'>
									<button
										className='btn btn-success'
										onClick={this.textEditHandler}
									>
										Редактировать
									</button>
								</div>
								<div
									style={{ position: 'relative' }}
									dangerouslySetInnerHTML={{ __html: this.state.quillValue }}
								></div>
							</>
						)}
					</div>
				</div>

				<div className='text-right mt-3'>
					<div>
						<span>
							Дата создания: {formatDayMonthYear(this.props.post.created)}
						</span>
					</div>
					<div>
						<span>
							{this.props.post.updated
								? 'Дата изменения: ' +
								  formatDayMonthYear(this.props.post.updated)
								: ''}
						</span>
					</div>
				</div>
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
				<CommentsPost postId={this.props.match.params.id} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		post: state.posts.post,
		loading: state.posts.loading,
		error: state.posts.error,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchPostById: (id) => dispatch(fetchPostById(id)),
		fetchUpdPost: (post) => dispatch(fetchUpdPost(post)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
