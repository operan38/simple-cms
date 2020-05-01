import React, { Component } from 'react';
import propTypes from 'prop-types';

import { Pagination } from 'react-bootstrap';

class PaginationLib extends Component {
	constructor(props) {
		super(props);
		this.state = { pager: {} };
	}

	componentDidMount() {
		//if (this.props.items && this.props.items.length) {
		this.setPage(this.props.initialPage);
		//}
	}

	setPage(page) {
		//let items = this.props.items;
		let pager = this.state.pager;

		// Если страница меньше 1 или больше totalPages
		if (page < 1 || page > pager.totalPages) {
			return;
		}

		// получить новый объект для конкретной страницы
		//pager = this.getPager(items.length, page);
		pager = this.getPager(this.props.countItems, page);
		console.log('pager: ', pager);

		// получить новую страницу из массива элементов
		//let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

		// обновить state
		this.setState({ pager: pager });

		// вызов страницы функции изменения в родительском компоненте
		this.props.onChangePage(pager.startIndex, pager.endIndex);
	}

	getPager(totalItems, currentPage, pageSize) {
		// по умолчанию (первая страница при инициализации)
		currentPage = currentPage || 1;

		// количество элементов на одной страницы
		pageSize = this.props.pageSize || 5;

		// Расчет количества страниц
		let totalPages = Math.ceil(totalItems / pageSize);

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
		let endIndex = pageSize; //Math.min(startIndex + pageSize - 1, totalItems - 1);

		// create an array of pages to ng-repeat in the pager control
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
			<Pagination>
				<Pagination.First
					onClick={() => this.setPage(1)}
					className={pager.currentPage === 1 ? 'disabled' : ''}
				></Pagination.First>
				<Pagination.Prev
					className={pager.currentPage === 1 ? 'disabled' : ''}
					onClick={() => this.setPage(pager.currentPage - 1)}
				></Pagination.Prev>
				{pager.pages.map((page, index) => (
					<Pagination.Item
						key={index}
						className={pager.currentPage === page ? 'active' : ''}
						onClick={() => this.setPage(page)}
					>
						{page}
					</Pagination.Item>
				))}
				<Pagination.Next
					className={pager.currentPage === pager.totalPages ? 'disabled' : ''}
					onClick={() => this.setPage(pager.currentPage + 1)}
				></Pagination.Next>
				<Pagination.Last
					className={pager.currentPage === pager.totalPages ? 'disabled' : ''}
					onClick={() => this.setPage(pager.totalPages)}
				></Pagination.Last>
				<div className='align-self-center'>
					Всего элементов: {this.state.pager.totalItems}
				</div>
			</Pagination>
		);
	}
}

PaginationLib.propTypes = {
	onChangePage: propTypes.func.isRequired,
	initialPage: propTypes.number,
};

PaginationLib.defaultProps = {
	initialPage: 1,
};

export default PaginationLib;
