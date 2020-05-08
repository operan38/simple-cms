import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = (props) => (
	<div className='w-100 text-center mt-2' style={{ position: 'absolute' }}>
		<Spinner animation='grow' role='status' variant='primary'>
			<span className='sr-only'>Loading...</span>
		</Spinner>
	</div>
);

export default Loader;
