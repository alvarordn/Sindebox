import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import PeriodSelector from './PeriodSelector'
import Figurebycustom from './Figurebycustom'
import ConsumoGeneracionBar from './ConsumoGeneracionBar'
import url_server from '../url_server.json'

function Plotbycustom() {

    const [EnergyDatas, setEnergyDatas] = useState([])
    const [selectedDates, setSelectedDates] = useState([new Date('2023-01-01'), new Date('2023-01-31')]);

    const handleDateChange = async (dates) => {
        const [start, end] = dates;
        setSelectedDates([start, end]);
        if (start && end) {
            const formattedDate = start.toISOString().split('T')[0] + '/' + end.toISOString().split('T')[0]; 
            try {
                const { data } = await axios.get(url_server.url_server + `api/getcustomdata/${formattedDate}/`);
                setEnergyDatas(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };


    
    useEffect(() => {
        if (selectedDates[0] && selectedDates[1]) {
            const formattedDate = selectedDates[0].toISOString().split('T')[0] + '/' + selectedDates[1].toISOString().split('T')[0]; 
            async function fetchEnergyData() {
                try {
                    const { data } = await axios.get(url_server.url_server + `api/getcustomdata/${formattedDate}/`);
                    setEnergyDatas(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            fetchEnergyData();
        }
    }, [selectedDates]);
    
    return (
        <Container>
            <Row className="justify-content-end">
                <Col>
                    <ConsumoGeneracionBar data_base={EnergyDatas} />
                </Col>
                <Col className="d-flex justify-content-center align-items-center mt-2" xs="auto">
                    <PeriodSelector startDate={selectedDates[0]} endDate={selectedDates[1]} onDateChange={handleDateChange}  />
                </Col>        
            </Row>
            <Row className="mt-4">
                <Col>
                    <Figurebycustom data={EnergyDatas}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Plotbycustom
