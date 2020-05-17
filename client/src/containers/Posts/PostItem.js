import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col } from 'react-bootstrap';
import notFoundPhoto from '../../assets/notFoundPhoto.jpg';

import { formatDayMonthYear } from '../../framework/date';

const PostItem = (props) => {
	return (
		<div className='mb-3 border p-2'>
			<Row className='justify-content-between align-items-center'>
				<div className='col-md-6 align-items-center'>
					<Row>
						<Col md='6'>
							<Link to={'/post/' + props.post.id}>
								<img src={notFoundPhoto} alt=''></img>
							</Link>
						</Col>
						<Col md='6' style={{ maxWidth: '300px' }}>
							<Link to={'/post/' + props.post.id}>{props.post.title}</Link>
							<p>{props.post.subtitle}</p>
						</Col>
					</Row>
				</div>

				<Col md='6'>
					<div className='mb-2 text-right'>
						<button
							type='button'
							className='btn btn-primary'
							onClick={() => props.editPostHandler(props.post.id)}
						>
							Редактировать
						</button>
					</div>
					<div className='mb-2 text-right'>
						<button
							type='button'
							className='btn btn-warning mr-md-2 mr-0'
							onClick={() => props.delPostCommentsHandler(props.post.id)}
						>
							Удалить все комментарии
						</button>
						<button
							type='button'
							className='btn btn-danger'
							onClick={() => props.delPostHandler(props.post.id)}
						>
							Удалить пост
						</button>
					</div>
					<div className='text-right'>
						<div>
							<span>
								Дата создания: {formatDayMonthYear(props.post.created)}
							</span>
						</div>
						<div>
							<span>
								{props.post.updated
									? 'Дата изменения: ' + formatDayMonthYear(props.post.updated)
									: ''}
							</span>
						</div>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default PostItem;
