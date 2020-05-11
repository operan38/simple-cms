import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchPosts, fetchDelPost } from '../../store/actions/posts';
import { fetchDelCommentsByPostId } from '../../store/actions/comments';

import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/UI/Loader/Loader';
import notFoundPhoto from '../../assets/notFoundPhoto.jpg';

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
					<div className='d-flex justify-content-between align-items-center'>
						<div className='d-flex align-items-center'>
							<div>
								<Link to={'/post/' + post.id}>
									<img src={notFoundPhoto} alt=''></img>
								</Link>
							</div>
							<div style={{ maxWidth: '300px' }}>
								<Link to={'/post/' + post.id}>{post.title}</Link>
								<p>{post.subtitle}</p>
							</div>
						</div>

						<div className='d-flex flex-column'>
							<div className='mb-2 text-right'>
								<button type='button' className='btn btn-primary'>
									Редактировать
								</button>
							</div>
							<div className='mb-2 text-right'>
								<button
									type='button'
									className='btn btn-warning mr-2'
									onClick={() => this.delPostCommentsHandler(post.id)}
								>
									Удалить все комментарии
								</button>
								<button type='button' className='btn btn-danger'>
									Удалить пост
								</button>
							</div>
							<div className='text-right'>
								<div>
									<span>Дата создания: {post.created}</span>
								</div>
								<div>
									<span>Дата изменения: </span>
								</div>
							</div>
						</div>
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
