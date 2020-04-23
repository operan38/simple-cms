import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const Header = props => (
    <header style={{boxShadow: '7px 7px 5px rgba(0,0,0,0.1)'}}>
        <Container>
            <Row>
                <Col xs={4}>
                    <div className="d-flex align-items-center">
                        <div>
                            <NavLink to='/'><img src="/logo.svg" alt=""></img></NavLink>
                        </div>
                        <div className="pl-2">
                            <h4>simple-cms</h4>
                        </div>
                    </div>
                </Col>
                <Col xs={4}>

                </Col>
                <Col xs={4}>
                    <div className="d-flex justify-content-end align-items-center h-100">
                        <NavLink className="btn btn-success mr-2" to='/auth'>Вход</NavLink>
                        <NavLink className="btn btn-secondary" to='/reg'>Регистрация</NavLink>
                    </div>
                </Col>
            </Row>
        </Container>
    </header>
)

export default Header