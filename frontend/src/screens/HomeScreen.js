import React, {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Plotting from '../components/Plotting'
import DateSelector from '../components/DateSelector'

function HomeScreen() {
  const [EnergyDatas, setEnergyDatas] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date('2023-01-01'));

  const handleDateChange = async (newDate) => {
    setSelectedDate(newDate);
    const formattedDate = newDate.toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/getdata/${formattedDate}/`);
      setEnergyDatas(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Al montar el componente, cargar los datos para la fecha actual
    const formattedDate = selectedDate.toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
    async function fetchEnergyData() {
      try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/getdata/${formattedDate}/`);
        setEnergyDatas(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchEnergyData();
  }, [selectedDate]);

  return (
    <div>
      <h1>Header</h1>
      <Row>
        <DateSelector selectedDate={selectedDate} onDateChange={handleDateChange} />
      </Row>
      <Row>
        <Plotting data={EnergyDatas}/>
      </Row>
    </div>
  )
}

export default HomeScreen
