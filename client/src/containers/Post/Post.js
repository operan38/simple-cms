import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchPostById } from '../../store/actions/posts';

import { formatDayMonthYear } from '../../framework/date';

import CommentsPost from '../../components/Comments/CommentsPost';
import notFoundPhoto from '../../assets/notFoundPhoto.jpg';

import Loader from '../../components/UI/Loader/Loader';

class Post extends Component {
	componentDidMount() {
		this.props.fetchPostById(this.props.match.params.id);
	}

	renderPost() {
		return (
			<div className='mb-3 border p-2'>
				<Link to={'/posts'}>К списку постов</Link>
				<h1>{this.props.post.title}</h1>
				<img src={notFoundPhoto} alt=''></img>
				<p>{this.props.post.text}</p>
				<span>{formatDayMonthYear(this.props.post.created)}</span>
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
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
