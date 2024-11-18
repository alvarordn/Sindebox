import React from 'react'
import { Container } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Plot_by_day from '../components/Plot_by_day'
import Plot_by_month from '../components/Plot_by_month';
import Plot_by_year from '../components/Plot_by_year';
import Plot_by_custom from '../components/Plot_by_custom';


function HomeScreen() {
  

  return (   
    <Container> 
      <Tabs defaultActiveKey="Dia" id="fill-tab-example" className="mb-3" fill>
        <Tab eventKey="Dia" title="Dia">
          <Plot_by_day/>
        </Tab>
          
        <Tab eventKey="Mes" title="Mes">
          <Plot_by_month/>
        </Tab>

        <Tab eventKey="Año" title="Año">
          <Plot_by_year/>
        </Tab>

        <Tab eventKey="Personalizado" title="Personalizado">
          <Plot_by_custom/>
        </Tab>
      </Tabs>
    </Container>
  )
}

export default HomeScreen
