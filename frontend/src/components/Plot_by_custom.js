import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import PeriodSelector from './PeriodSelector'
import Figure_by_custom from './Figure_by_custom'

function Plot_by_custom() {

    const [EnergyDatas, setEnergyDatas] = useState([])
    const [selectedDates, setSelectedDates] = useState([new Date('2023-01-01'), new Date('2023-01-01')]);

    const handleDateChange = async (dates) => {
        const [start, end] = dates;
        setSelectedDates([start, end]);
        if (start && end) {
            const formattedDate = start.toISOString().split('T')[0] + '/' + end.toISOString().split('T')[0]; 
            try {
                const { data } = await axios.get(`http://127.0.0.1:8000/api/getcustomdata/${formattedDate}/`);
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
                    const { data } = await axios.get(`http://127.0.0.1:8000/api/getcustomdata/${formattedDate}/`);
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
                <Col></Col>
                <Col></Col>
                <Col>
                    <PeriodSelector startDate={selectedDates[0]} endDate={selectedDates[1]} onDateChange={handleDateChange}  />
                </Col>        
            </Row>
            <Row>
                <Figure_by_custom data={EnergyDatas}/>
            </Row>
        </Container>
    )
}

export default Plot_by_custom
