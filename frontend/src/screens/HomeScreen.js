import React from 'react'
import { Container } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Plot_by_day from '../components/Plot_by_day'
import Plot_by_month from '../components/Plot_by_month';


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
          <span>
            Año
          </span>
        </Tab>

        <Tab eventKey="Personzalizado" title="Personzalizado">
          <span>
            Personalizado
          </span>
        </Tab>
      </Tabs>
    </Container>
  )
}

export default HomeScreen
