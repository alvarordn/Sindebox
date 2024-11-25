import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Figurebyday from './Figurebyday'
import DaySelector from './DaySelector'
import ConsumoGeneracionBar from './ConsumoGeneracionBar'
import url_server from '../url_server.json'

function  Plotbyday() {

    const [EnergyDatas, setEnergyDatas] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date('2023-01-01'));

    const handleDateChange = async (newDate) => {
        setSelectedDate(newDate);
        const formattedDate = newDate.toISOString().split('T')[0]; 
        try {
            const { data } = await axios.get(url_server.url_server + `api/getdailydata/${formattedDate}/`);
            setEnergyDatas([...data]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const formattedDate = selectedDate.toISOString().split('T')[0]; 
        async function fetchEnergyData() {
        try {
            const { data } = await axios.get(url_server.url_server + `api/getdailydata/${formattedDate}/`);
            setEnergyDatas([...data]);
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
                    <DaySelector selectedDate={selectedDate} onDateChange={handleDateChange} />
                </Col>        
            </Row>
            <Row className="mt-4">
                <Col>
                    <Figurebyday data={EnergyDatas}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Plotbyday
