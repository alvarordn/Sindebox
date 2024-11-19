import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import MonthSelector from './MonthSelector'
import Figurebymonth from './Figurebymonth'

function Plotbymonth() {

    const [EnergyDatas, setEnergyDatas] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date('2023-01'));

    const handleDateChange = async (newDate) => {
        setSelectedDate(newDate);
        const formattedDate = newDate.toISOString().split('T')[0].slice(0, 7);; 
        try {
            const { data } = await axios.get(`http://127.0.0.1:8000/api/getmonthlydata/${formattedDate}/`);
            setEnergyDatas(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const formattedDate = selectedDate.toISOString().split('T')[0].slice(0, 7);; 
        async function fetchEnergyData() {
        try {
            const { data } = await axios.get(`http://127.0.0.1:8000/api/getmonthlydata/${formattedDate}/`);
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
                <Col></Col>
                <Col></Col>
                <Col>
                    <MonthSelector selectedDate={selectedDate} onDateChange={handleDateChange} />
                </Col>        
            </Row>
            <Row>
                <Figurebymonth data={EnergyDatas}/>
            </Row>
        </Container>
    )
}

export default Plotbymonth
