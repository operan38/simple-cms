import React from 'react';
import { Link } from 'react-router-dom';

import notFoundPhoto from '../../assets/notFoundPhoto.jpg';

const PostItem = (props) => (
	<div className='mb-3 border p-2'>
		<div className='d-flex justify-content-between align-items-center'>
			<div className='d-flex align-items-center'>
				<div>
					<Link to={'/post/' + props.post.id}>
						<img src={notFoundPhoto} alt=''></img>
					</Link>
				</div>
				<div style={{ maxWidth: '300px' }}>
					<Link to={'/post/' + props.post.id}>{props.post.title}</Link>
					<p>{props.post.subtitle}</p>
				</div>
			</div>

			<div className='d-flex flex-column'>
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
						className='btn btn-warning mr-2'
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
						<span>Дата создания: {props.post.created}</span>
					</div>
					<div>
						<span>Дата изменения: </span>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default PostItem;
