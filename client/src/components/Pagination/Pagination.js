import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import queryString from 'query-string';

class Pagination extends Component {
	constructor(props) {
		super(props);
		this.state = { pager: {} };
	}

	componentDidMount() {
		const queryValues = queryString.parse(this.props.location.search);
		this.props.onChangePage(this.props.pageSize, 0).then(() => {
			if (queryValues.page) {
				this.setPage(parseInt(queryValues.page));
				console.log('page', queryValues.page);
			} else {
				this.setPage(this.props.initialPage);
			}
		});
	}

	setPage(page) {
		let pager = this.state.pager;

		// Если страница меньше 1 или больше totalPages
		if (page < 1 || page > pager.totalPages) {
			return;
		}

		pager = this.getPager(this.props.countItems, page);
		console.log('pager: ', pager);

		// обновить state
		this.setState({ pager: pager });

		// вызов страницы функции изменения в родительском компоненте (Не вызывать при инициализации)
		this.props.onChangePage(pager.endIndex, pager.startIndex);
	}

	getPager(totalItems, currentPage) {
		// количество элементов на одной страницы
		let pageSize = this.props.pageSize || 5;

		// Расчет количества страниц
		let totalPages = Math.ceil(totalItems / pageSize);

		// по умолчанию (первая страница при инициализации)
		currentPage = currentPage || 1;

		let startPage, endPage;
		if (totalPages <= 10) {
			startPage = 1;
			endPage = totalPages;
		} else {
			if (currentPage <= 6) {
				startPage = 1;
				endPage = 10;
			} else if (currentPage + 4 >= totalPages) {
				startPage = totalPages - 9;
				endPage = totalPages;
			} else {
				startPage = currentPage - 5;
				endPage = currentPage + 4;
			}
		}

		// рассчет начального и конечного лимита
		let startIndex = (currentPage - 1) * pageSize;
		let endIndex = pageSize;

		let pages = [...Array(endPage + 1 - startPage).keys()].map(
			(i) => startPage + i
		);

		return {
			totalItems: totalItems,
			currentPage: currentPage,
			pageSize: pageSize,
			totalPages: totalPages,
			startPage: startPage,
			endPage: endPage,
			startIndex: startIndex,
			endIndex: endIndex,
			pages: pages,
		};
	}

	render() {
		let pager = this.state.pager;

		if (!pager.pages || pager.pages.length <= 1) {
			// не отображать пагинацию, если есть только 1 страница
			return null;
		}

		return (
			<ul className='pagination'>
				<li
					className={
						pager.currentPage === 1 ? 'page-item disabled' : 'page-item'
					}
				>
					<Link
						to={'/posts/?page=1'}
						onClick={() => this.setPage(1)}
						aria-label='First'
						className={'page-link'}
					>
						<span aria-hidden='true'>«</span>
						<span className='sr-only'>First</span>
					</Link>
				</li>
				<li
					className={
						pager.currentPage === 1 ? 'page-item disabled' : 'page-item'
					}
				>
					<Link
						className={'page-link'}
						to={'/posts/?page=' + (pager.currentPage - 1)}
						onClick={() => this.setPage(pager.currentPage - 1)}
						aria-label='Previous'
					>
						<span aria-hidden='true'>‹</span>
						<span className='sr-only'>Previous</span>
					</Link>
				</li>
				{pager.pages.map((page, index) => (
					<li
						className={
							pager.currentPage === page ? 'page-item active' : 'page-item'
						}
						key={index}
					>
						<Link
							className={'page-link'}
							to={'/posts/?page=' + page}
							onClick={() => this.setPage(page)}
						>
							{page}
						</Link>
					</li>
				))}

				<li
					className={
						pager.currentPage === pager.totalPages
							? 'page-item disabled'
							: 'page-item'
					}
				>
					<Link
						className={'page-link'}
						to={'/posts/?page=' + (pager.currentPage + 1)}
						onClick={() => this.setPage(pager.currentPage + 1)}
						aria-label='Next'
					>
						<span aria-hidden='true'>›</span>
						<span className='sr-only'>Next</span>
					</Link>
				</li>

				<li
					className={
						pager.currentPage === pager.totalPages
							? 'page-item disabled'
							: 'page-item'
					}
				>
					<Link
						className={'page-link'}
						to={'/posts/?page=' + pager.totalPages}
						onClick={() => this.setPage(pager.totalPages)}
						aria-label='Last'
					>
						<span aria-hidden='true'>»</span>
						<span className='sr-only'>Last</span>
					</Link>
				</li>
			</ul>
		);
	}
}

Pagination.propTypes = {
	onChangePage: propTypes.func.isRequired,
	initialPage: propTypes.number,
	countItems: propTypes.number,
	pageSize: propTypes.number,
};

Pagination.defaultProps = {
	initialPage: 1,
	countItems: 0,
};

export default Pagination;
