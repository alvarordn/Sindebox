import React, { useEffect, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { FaIndustry, FaTree, FaBolt  } from 'react-icons/fa'
import { GiFuelTank } from 'react-icons/gi'
import axios from 'axios'
import url_server from '../url_server.json'

function ProductionSummaryHeader() {

  const [EnergyDatas, setEnergyDatas] = useState({
      carbon: 10,
      total_energy_gen: 10,
      co2: 10,
      trees: 10,
  });

    useEffect(() => {
      async function fetchEnergyData() {
        try {
            const { data } = await axios.get(url_server.url_server + `api/getsummary/`);
            setEnergyDatas(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
      }
      fetchEnergyData();
    }, []);

    return (
      <Container style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '10px', padding: '20px' }}>
        <Row>
          <Col className="text-center">
            <FaBolt size={30} style={{ color: '#FDB813' }} /> <br />
            {EnergyDatas.total_energy_gen.toFixed(2)} kWh <br />
            <span>Rendimiento total</span>
          </Col>
          <Col className="text-center">
            <GiFuelTank size={30} style={{ color: '#4B4B4B' }} /> <br />
            {EnergyDatas.carbon.toFixed(2)} toneladas <br />
            <span>Ahorro de carbón</span>
          </Col>
          <Col className="text-center">
            <FaIndustry size={30} style={{ color: '#7E5A45' }} /> <br />
            {EnergyDatas.co2.toFixed(2)} toneladas <br />
            <span>CO2 evitados</span>
          </Col>
          <Col className="text-center">
            <FaTree size={30} style={{ color: '#76C900' }} /> <br />
            {EnergyDatas.trees.toFixed(0)}  <br />
            <span>Árboles equivalentes plantados</span>
          </Col>
        </Row>
      </Container>
    )
  }
  
  export default ProductionSummaryHeader