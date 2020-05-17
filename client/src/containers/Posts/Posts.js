import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	fetchPosts,
	fetchDelPost,
	fetchPostById,
} from '../../store/actions/posts';
import { fetchDelCommentsByPostId } from '../../store/actions/comments';

import {
	hideDelModal,
	showDelModal,
	showEditModal,
} from '../../store/actions/modal';

import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/UI/Loader/Loader';
import DeleteModal from '../../components/UI/Modal/DeleteModal';

import PostCreator from './PostCreator';
import PostItem from './PostItem';
import PostEditModal from './PostEditModal';

class Posts extends Component {
	onChangePage = async (limit, offset) => {
		await this.props.fetchPosts(limit, offset);
	};

	delPostCommentsHandler = (id) => {
		this.props.fetchDelCommentsByPostId(id);
	};

	submitDelPostHandler = (id) => {
		// Подтвердить удаление и закрыть окно удаления
		this.props.fetchDelCommentsByPostId(id).then(() => {
			this.props.fetchDelPost(id).then(() => {
				window.location.reload();
			});
			//this.props.hideDelModal();
		});
	};

	cancelDelPostHandler = () => {
		// Закрыть окно удаления (отменить)
		this.props.hideDelModal();
	};

	delPostHandler = (id) => {
		// Открыть окно удаления
		this.props.showDelModal(id);
	};

	editPostHandler = (id) => {
		// Получить выбранный пост и открыть окно редактирования
		this.props.fetchPostById(id).then(() => {
			this.props.showEditModal();
		});
	};

	renderPosts() {
		return this.props.postsList.map((post, index) => {
			return (
				<PostItem
					key={index}
					post={post}
					editPostHandler={this.editPostHandler}
					delPostCommentsHandler={this.delPostCommentsHandler}
					delPostHandler={this.delPostHandler}
					loading={this.props.editModal.loading}
				/>
			);
		});
	}

	render() {
		return (
			<div>
				<h1>Список постов</h1>
				<DeleteModal
					title={'Удаление поста'}
					show={this.props.delModal.show}
					id={this.props.delModal.id}
					handleSubmit={this.submitDelPostHandler}
					handleClose={this.cancelDelPostHandler}
					children={
						<div>
							Вы уверены что хотите удалить выбранный пост и все комментарии?
						</div>
					}
				/>
				<PostCreator />
				{this.props.editModal.show ? <PostEditModal /> : ''}
				{this.props.editModal.loading ? <Loader /> : ''}

				{this.props.loading && this.props.postsList.length === 0 ? (
					<Loader />
				) : (
					''
				)}

				{!this.props.loading && this.props.postsList.length === 0 ? (
					<div className='w-100 text-center'>
						{this.props.error ? this.props.error.data.message : 'Список пуст'}
					</div>
				) : (
					''
				)}

				{!this.props.loading && this.props.postsList.length !== 0
					? this.renderPosts()
					: ''}

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
		editModal: state.modal.editModal,
		delModal: state.modal.delModal,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchPosts: (limit, offset) => dispatch(fetchPosts(limit, offset)),
		fetchPostById: (id) => dispatch(fetchPostById(id)),
		fetchDelCommentsByPostId: (id) => dispatch(fetchDelCommentsByPostId(id)),
		fetchDelPost: (id) => dispatch(fetchDelPost(id)),
		showEditModal: () => dispatch(showEditModal()),
		showDelModal: (id) => dispatch(showDelModal(id)),
		hideDelModal: () => dispatch(hideDelModal()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
