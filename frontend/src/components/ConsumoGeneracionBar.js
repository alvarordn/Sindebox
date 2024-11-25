import React, { useState, useEffect } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Col, Row, Container } from 'react-bootstrap'


function ConsumoGeneracionBar({ data_base }) {

  const [data, setdata] = useState([1,1,1,1,1,1,1,1,1])

  useEffect(() => {
    if (data_base && data_base.length > 0) {
      const Production = data_base.reduce((total, entry) => total + (entry.energy_gen || 0), 0);
      const Demand = data_base.reduce((total, entry) => total + (entry.energy_dem || 0), 0);
      const Selfconsumption = data_base.reduce((total, entry) => total + (entry.energy_self || 0), 0);
      const FromGrid = data_base.reduce((total, entry) => total + (entry.energy_grid || 0), 0);
      const ToGrid = data_base.reduce((total, entry) => total + (entry.energy_extra || 0), 0);
      setdata([Production, 
                Demand, 
                Selfconsumption, 
                FromGrid, 
                ToGrid, 
                100*Selfconsumption/(Selfconsumption+ToGrid), 
                100*ToGrid/(Selfconsumption+ToGrid), 
                100*Selfconsumption/(Selfconsumption+FromGrid), 
                100*FromGrid/(Selfconsumption+FromGrid)]);
      console.log("Efecto ejecutándose");
    }
}, [data_base]);

  return (
      <Container class="p-4" style={{ width:'95%' }}>
        <Row>
          <Col>
            <h5>Producción energética {data[0].toFixed(2)} kWh</h5>              
              <Row>
                <Col style={{ fontSize: '1.0rem' }}>
                  Autoconsumo <br />
                  {data[5].toFixed(2)} % <br />
                  {data[2].toFixed(2)} kWh <br />      
                </Col>
                <Col style={{ textAlign: 'right', fontSize: '1.0rem' }}>    
                  Energía exportada <br />
                  {data[6].toFixed(2)} % <br />
                  {data[4].toFixed(2)} kWh <br />          
                </Col>
              </Row>
              <ProgressBar style={{ height: '20px' }}>
                <ProgressBar animated variant="info" now={data[5].toFixed(2)}  
                  label={
                    <span style={{ fontSize: '16px'}}>
                      {`${data[5].toFixed(2)}%`}
                    </span>
                  }   key={1} />
                <ProgressBar animated variant="warning" now={data[6].toFixed(2)}  
                  label={
                    <span style={{ fontSize: '16px'}}>
                      {`${data[6].toFixed(2)}%`}
                    </span>
                  }   key={2} />
              </ProgressBar>
          </Col>
          <Col>
            <h5>Consumo {data[1].toFixed(2)} kWh</h5>
              <Row>
                <Col style={{ fontSize: '1.0rem' }}>
                  Autosuficiencia <br />
                  {data[7].toFixed(2)} % <br />
                  {data[2].toFixed(2)} kWh <br />      
                </Col>
                <Col style={{ textAlign: 'right', fontSize: '1.0rem' }}>    
                  Energía importada <br />
                  {data[8].toFixed(2)} % <br />
                  {data[3].toFixed(2)} kWh <br />          
                </Col>
              </Row>
              <ProgressBar style={{ height: '20px' }}>
                <ProgressBar animated variant="info" now={data[7].toFixed(2)}  
                  label={
                    <span style={{ fontSize: '16px'}}>
                      {`${data[7].toFixed(2)}%`}
                    </span>
                  }  key={1} />
                <ProgressBar animated variant="danger" now={data[8].toFixed(2)} 
                  label={
                    <span style={{ fontSize: '16px'}}>
                      {`${data[8].toFixed(2)}%`}
                    </span>
                  } 
                  key={2}  />
              </ProgressBar>
          </Col>
        </Row>
      </Container>

  )
}

export default ConsumoGeneracionBar
