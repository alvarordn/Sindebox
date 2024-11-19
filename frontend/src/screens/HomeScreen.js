import React from 'react'
import PlotData from './PlotData'
import ProductionSummaryHeader from './ProductionSummaryHeader'
import { Container, Row } from 'react-bootstrap'

function HomeScreen() {
  

  return (
    <Container>
      <Row>
        <ProductionSummaryHeader data={[12.42, 4089.61, 53.35, 11.35]}/>
      </Row>
      <Row>
        <PlotData/>
      </Row>
    </Container>   
  )
}

export default HomeScreen
