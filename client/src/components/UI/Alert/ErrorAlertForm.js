import React from 'react';
import { Alert } from 'react-bootstrap';

const ErrorAlertForm = (props) => {
	const renderErrors = () => {
		if (props.error) {
			if (typeof props.error.data.errors == 'object') {
				return (
					<Alert variant='danger'>
						{props.error.data.message}
						{' (' + props.error.data.errors[0]['msg'] + ')'}
					</Alert>
				);
			} else {
				return <Alert variant='danger'>{props.error.data.message}</Alert>;
			}
		}
	};

	return <>{renderErrors()}</>;
};

export default ErrorAlertForm;
