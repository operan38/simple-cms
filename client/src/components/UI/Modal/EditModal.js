import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const EditModal = (props) => {
	return (
		<>
			<Modal
				show={props.show}
				onHide={props.handleClose}
				size={props.size ? props.size : 'md'}
			>
				<Modal.Header closeButton>
					<Modal.Title>{props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{props.children}</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={props.handleClose}>
						Закрыть
					</Button>
					<Button
						variant='success'
						disabled={props.isFormValid}
						onClick={props.handleSubmit}
					>
						Сохранить
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default EditModal;
