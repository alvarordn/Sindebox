import React from 'react'
import { Container } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Plotbyday from '../components/Plotbyday'
import Plotbymonth from '../components/Plotbymonth';
import Plotbyyear from '../components/Plotbyyear';
import Plotbycustom from '../components/Plotbycustom';

function HomeScreen() {
  

  return (   
    <Container> 
      <Tabs defaultActiveKey="Dia" id="fill-tab-example" className="mb-3" fill>

        <Tab eventKey="Dia" title="Dia">          
          <Plotbyday/>
        </Tab>
          
        <Tab eventKey="Mes" title="Mes">
          <Plotbymonth/>
        </Tab>

        <Tab eventKey="Año" title="Año">
          <Plotbyyear/>
        </Tab>

        <Tab eventKey="Personalizado" title="Personalizado">
          <Plotbycustom/>
        </Tab>
      </Tabs>
    </Container>
  )
}

export default HomeScreen
