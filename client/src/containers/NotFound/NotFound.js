import React from 'react';

const NotFound = (props) => (
	<div className='d-flex flex-column text-center mt-5'>
		<i
			className='fa fa-file-o'
			aria-hidden='true'
			style={{ color: '#20b2ff', fontSize: '102px' }}
		></i>
		<h1 style={{ color: '#20b2ff', marginBottom: '0px', fontSize: '64px' }}>
			404
		</h1>
		<p style={{ color: '#20b2ff', fontSize: '30px' }}>Страница не найдена</p>
	</div>
);

export default NotFound;
