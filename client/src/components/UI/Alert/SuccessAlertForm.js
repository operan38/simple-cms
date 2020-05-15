import React from 'react';
import { Alert } from 'react-bootstrap';

const SuccessAlertForm = (props) => {
	const renderSuccess = () => {
		if (props.success) {
			return <Alert variant='success'>{props.success.message}</Alert>;
		}
	};

	return <>{renderSuccess()}</>;
};

export default SuccessAlertForm;
