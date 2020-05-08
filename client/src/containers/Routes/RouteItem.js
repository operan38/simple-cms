import React from 'react';
import { NavLink } from 'react-router-dom';

const RouteItem = (props) => (
	<div className='mb-2 mt-2 border p-2 d-flex justify-content-between align-items-center'>
		<div>
			<b>Заголовок: </b>
			<NavLink to={props.route.path}>{props.route.title} </NavLink>
			<b>Путь: </b> <NavLink to={props.route.path}>{props.route.path} </NavLink>
			<b>Контейнер: </b> {props.route.container_title}
		</div>
		<div>
			<button
				type='button'
				className='btn btn-primary mr-2'
				disabled={props.loading}
				onClick={() => props.editRouteHandler(props.route.id)}
			>
				Редактировать
			</button>
			<button
				type='button'
				className='btn btn-danger'
				disabled={props.loading}
				onClick={() => props.delRouteHandler(props.route.id)}
			>
				Удалить
			</button>
		</div>
	</div>
);

export default RouteItem;
