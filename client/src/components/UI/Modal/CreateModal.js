import React from 'react';
import { Row, Col, Button, Accordion, Card } from 'react-bootstrap';

const CreateModal = (props) => {
	return (
		<>
			<Accordion>
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant='link' eventKey='0'>
							<Row>
								<Col>{props.title}</Col>
							</Row>
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey='0'>
						<Card.Body>
							<Row>
								{props.children}
								<Col>
									<button
										className='btn btn-success'
										type='submit'
										disabled={props.isFormValid}
										onClick={props.handleSubmit}
									>
										Добавить
									</button>
								</Col>
							</Row>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		</>
	);
};

export default CreateModal;
