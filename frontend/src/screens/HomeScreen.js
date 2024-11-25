import React from 'react'
import PlotData from './PlotData'
import ProductionSummaryHeader from './ProductionSummaryHeader'
import RTpowerflow from '../components/RTpowerflow'
import { Container, Row } from 'react-bootstrap'

function HomeScreen() {

  

  return (
    <Container >
      <Row>
        <ProductionSummaryHeader/>
      </Row>
      <Row>
        <RTpowerflow/>
      </Row>
      <Row>
        <PlotData/>
      </Row>
    </Container>   
  )
}

export default HomeScreen
