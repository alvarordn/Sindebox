import React, {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'

function HomeScreen() {
  const [EnergyDatas, setEnergyDatas] = useState([])

  useEffect(() => {
      async function fecthEnergyData(){
        const { data } = await axios.get('http://127.0.0.1:8000/api/getdata/2024-11-12/')
        setEnergyDatas(data)
      }
      fecthEnergyData()
  }, [])

  return (
    <div>
      <h1>Buenas tardes</h1>
      <Row>
        {EnergyDatas.map(EnergyData => (
          <Col key={EnergyData.id}>
            {EnergyData.power}
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default HomeScreen
