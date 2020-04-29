import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = (props) => {
	return (
		<>
			<Modal show={props.show} onHide={props.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{props.children}</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={props.handleClose}>
						Отменить
					</Button>
					<Button variant='danger' onClick={() => props.handleSubmit(props.id)}>
						Ок
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default DeleteModal;
