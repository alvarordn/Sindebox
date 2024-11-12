import React, { useState } from 'react'
import Plotting from '../components/Plotting'
import { Container, Row, Col } from 'react-bootstrap'
import getValues from '../resources/getValues'


function DataPlot() {
    const [data, setData] = useState(getValues());
    return (
        <Container className='py-5'>
            <Row className='mb-4'>
                <Col md={12} className='text-center'>
                    <h2 className='display-5'>Gestión de energía</h2>
                </Col>
            </Row>
            <Row className='my-5'>
                <Plotting data={data}/>
            </Row>
        </Container>
    )
}

export default DataPlot
