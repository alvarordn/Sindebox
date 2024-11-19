import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { FaSun, FaBolt, FaBatteryFull, FaPlug } from 'react-icons/fa'

function ProductionSummaryHeader({ data }) {
    return (
      <Container style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '10px', padding: '20px' }}>
        <Row>
          <Col className="text-center">
            <FaSun size={30} style={{ color: '#FDB813' }} /> <br />
            {data[0].toFixed(2)} kWh <br />
            <span>Rendimiento hoy</span>
          </Col>
          <Col className="text-center">
            <FaBolt size={30} style={{ color: '#FDB813' }} /> <br />
            {data[1].toFixed(2)} kWh <br />
            <span>Rendimiento total</span>
          </Col>
          <Col className="text-center">
            <FaPlug size={30} style={{ color: '#00A9FF' }} /> <br />
            {data[2].toFixed(2)} kWh <br />
            <span>Consumo hoy</span>
          </Col>
          <Col className="text-center">
            <FaBatteryFull size={30} style={{ color: '#76C900' }} /> <br />
            {data[3].toFixed(2)} kWh <br />
            <span>Autoconsumo</span>
          </Col>
        </Row>
      </Container>
    )
  }
  
  export default ProductionSummaryHeader