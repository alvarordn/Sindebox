import React from 'react'
import { Navbar, Nav, NavDropdown, Container, Col, Row } from 'react-bootstrap'
import { Switch, Route, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

function Header() {
  return (
    <header >
      <Navbar className="bg-info text-light py-4" collapseOnSelect >
        <Container>
        <Navbar.Brand>
          <LinkContainer to="/">
              <Nav.Link>
                <Col xs lg="2">
                  <Navbar.Brand href="#home">
                    <img
                      alt=""
                      src="/favicon.png"
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                    />{' '}
                    SINDETEC
                  </Navbar.Brand>
                </Col>   
              </Nav.Link>   
          </LinkContainer> 
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="flex-grow-1 text-light justify-content-evenly" style={{ width: "100%" }} >
                <Col md="auto">
                  <LinkContainer to="/">
                    <Nav.Link><i className='fas fa-pen-nib text-light'></i> Inicio </Nav.Link>
                  </LinkContainer>
                </Col>
                <Col md="auto">
                  <LinkContainer to="/realtime">
                    <Nav.Link><i className='fas fa-note-sticky'></i> Estado en tiempo real </Nav.Link>
                  </LinkContainer>
                </Col>
                <Col md="auto">
                  <LinkContainer to="/data">
                    <Nav.Link><i className='fas fa-sun'></i> Consulta de históricos</Nav.Link>
                  </LinkContainer>
                </Col>
                <Col md="auto">
                  <NavDropdown title="Usuario" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Cerrar sesión</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Ajustes</NavDropdown.Item>               
                  </NavDropdown>
                </Col>
              </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
