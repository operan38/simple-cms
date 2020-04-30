import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchPosts } from '../../store/actions/posts';

import PaginationLib from '../../components/UI/Pagination/Pagination';
import Loader from '../../components/UI/Loader/Loader';

class Posts extends Component {
	constructor() {
		super();

		// an example array of items to be paged
		let exampleItems = [...Array(150).keys()].map((i) => ({
			id: i + 1,
			name: 'Item ' + (i + 1),
		}));

		this.state = {
			exampleItems: exampleItems,
			pageOfItems: [],
		};
	}

	componentDidMount() {
		this.props.fetchPosts({ start: 5, end: 2 });
	}

	onChangePage = (pageOfItems) => {
		console.log('exampleItems' + this.state.exampleItems);
		console.log('pageOfItems' + this.state.pageOfItems);
		this.setState({ pageOfItems: pageOfItems });
	};

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
				{/*this.props.loading && this.props.postsList.length === 0 ? (
					<Loader />
				) : (
					this.renderPosts()
				)*/}

				{this.state.pageOfItems.map((item) => (
					<div key={item.id}>{item.name}</div>
				))}
				<PaginationLib
					items={this.state.exampleItems}
					onChangePage={this.onChangePage}
				/>

				{/*<Pagination>
					<Pagination.First />
					<Pagination.Prev />
					<Pagination.Item active>{1}</Pagination.Item>
					<Pagination.Item>{2}</Pagination.Item>
					<Pagination.Next />
					<Pagination.Last />
				</Pagination>*/}
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
		fetchPosts: (limit) => dispatch(fetchPosts(limit)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
