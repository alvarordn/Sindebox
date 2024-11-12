import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-info text-light py-4">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-left mb-3 mb-md-0">
            <h5>Sindetec</h5>
            <p>
              Sindetec es una empresa especializada en placas solares fotovoltaicas.
              Realizamos instalaciones fotovoltaicas “llave en mano” para autoconsumo.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-left">
            <h5>Contacto</h5>
            <p>
              <FaMapMarkerAlt className="me-2" /> Calle Antonio Gómez Millán 21, Gelves, C.P. 41120, Sevilla
            </p>
            <p>
              <FaEnvelope className="me-2" /> <a href="mailto:presupuesto@sindetec.com" className="text-light">presupuesto@sindetec.com</a>
            </p>
            <p>
              <FaPhoneAlt className="me-2" /> <a href="tel:+34672177688" className="text-light">+34 672 177 688</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
