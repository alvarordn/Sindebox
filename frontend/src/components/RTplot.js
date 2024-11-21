import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import ArrowAnimated from '../components/ArrowAnimated';

function RTplot({ data }) {
    
  return (
    <Container fluid>
      {/* Fila superior */}
      <Row className="align-items-center">
        <Col lg={2}></Col>
        <Col lg={5} className="text-center">
          <div>
            <strong>Generación</strong> <br />
            {data.energy_gen.toFixed(2)} kWh <br />
          </div>
        </Col>
        <Col lg={2}></Col>
      </Row>

      {/* Fila de flechas */}
      <Row className="align-items-center">
        <Col lg={5}></Col>
        <Col lg={2} className="d-flex align-items-center justify-content-center">
          <ArrowAnimated diagonal={true} sense={true}  angle135={true} />
        </Col>
        <Col lg={2} className="d-flex align-items-center justify-content-center">
          <ArrowAnimated diagonal={true} sense={true}  angle135={false} />
        </Col>
      </Row>

      {/* Fila inferior */}
      <Row className="align-items-center">
        <Col lg={3} className="text-center">
          <div>
            <strong>Demanda</strong> <br />
            {data.energy_dem.toFixed(2)} kWh <br />
          </div>
        </Col>
        <Col lg={1}></Col>
        <Col lg={3} className="d-flex align-items-center justify-content-center">
          <ArrowAnimated diagonal={false} sense={true} angle135={true} />
        </Col>
        <Col lg={3} className="text-center">
          <div>
            <strong>Red</strong> <br />
            {data.energy_self.toFixed(2)} kWh <br />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default RTplot;
