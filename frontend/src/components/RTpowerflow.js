import React, { useEffect, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { FaBatteryFull, FaPlug, FaSun  } from 'react-icons/fa'
import EnergyFlow from './EnergyFlow'
import axios from 'axios'
import url_server from '../url_server.json'

function RTpowerflow() {
  
    const [EnergyDatas, setEnergyDatas] = useState({
        energy_gen: 0,
        energy_dem: 0,
        energy_self: 0,
        genrt: 0,
        demrt: 0,
        gridrt: 0
    });

    useEffect(() => {
    async function fetchEnergyData() {
        try {
            const { data } = await axios.get(url_server.url_server + `api/getrt/`);
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
            <Col className="text-center" xs lg="5">
                <EnergyFlow data = {EnergyDatas} />
            </Col>
            <Col className="text-center d-flex flex-column align-items-center justify-content-center" xs lg="2">
               <FaSun size={30} style={{ color: '#FDB813' }} /> <br />
                {EnergyDatas.energy_gen.toFixed(2)} kWh <br />
                <span>Rendimiento hoy</span>
            </Col>
            <Col className="text-center d-flex flex-column align-items-center justify-content-center" xs lg="2">         
                <FaPlug size={30} style={{ color: '#00A9FF' }} /> <br />
                {EnergyDatas.energy_dem.toFixed(2)} kWh <br />
                <span>Consumo hoy</span>
            </Col>
            <Col className="text-center d-flex flex-column align-items-center justify-content-center" xs lg="2">         
                <FaBatteryFull size={30} style={{ color: '#76C900' }} /> <br />
                {EnergyDatas.energy_self.toFixed(0)} kWh <br />
                <span>Autoconsumo</span>
            </Col>
        </Row>
    </Container>
    )
}


export default RTpowerflow



