import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import YearSelector from './YearSelector'
import Figurebyyear from './Figurebyyear'
import ConsumoGeneracionBar from './ConsumoGeneracionBar'
import url_server from '../url_server.json'

function Plotbyyear() {

    const [EnergyDatas, setEnergyDatas] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date('2023'));

    const handleDateChange = async (newDate) => {
        setSelectedDate(newDate);
        const formattedDate = newDate.toISOString().split('T')[0].slice(0, 4);
        try {
            const { data } = await axios.get(url_server.url_server + `api/getyearlydata/${formattedDate}/`);
            setEnergyDatas(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const formattedDate = selectedDate.toISOString().split('T')[0].slice(0, 4);; 
        async function fetchEnergyData() {
        try {
            const { data } = await axios.get(url_server.url_server + `api/getyearlydata/${formattedDate}/`);
            setEnergyDatas(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        }
        fetchEnergyData();
    }, [selectedDate]);
    
    return (
        <Container>
            <Row className="justify-content-end">
                <Col>
                    <ConsumoGeneracionBar data_base={EnergyDatas} />
                </Col>
                <Col className="d-flex justify-content-center align-items-center mt-2" xs="auto">
                    <YearSelector selectedDate={selectedDate} onDateChange={handleDateChange} />
                </Col>        
            </Row>
            <Row className="mt-4">
                <Col>
                    <Figurebyyear data={EnergyDatas}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Plotbyyear
