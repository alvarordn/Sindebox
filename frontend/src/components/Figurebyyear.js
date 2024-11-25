import React, { useState } from 'react';
import { Container } from 'react-bootstrap'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

function Figurebyyear({ data }) {
    const [visibleAreas, setVisibleAreas] = useState({
        energy_gen: true,
        energy_dem: true,
        energy_self: true,
    });

    const handleLegendClick = (e) => {
        setVisibleAreas((prevState) => ({
            ...prevState,
            [e.dataKey]: !prevState[e.dataKey],
        }));
    };

    
    function CustomTooltip({ payload, label, active }) {        
        const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
            "Julio", "Agosto", "Septiembre", "Octubre", "Novimebre", "Diciembre"];
          if (active && data && data.length > 0) {
          return (
            <Container
              style={{
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                padding: '15px',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                textAlign: 'center',
              }}
              className="p-3"
            >
              {/* Hora */}
              <p style={{ fontSize: '14px', marginBottom: '5px', fontWeight: 'bold' }}>
               {months[label-1]}
              </p>
      
              {/* Generación */}
              <p style={{ fontSize: '12px', marginBottom: '5px', textAlign: 'left' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: '#00ff00', // Color verde para generación
                    marginRight: '8px',
                  }}
                ></span>
                <strong>Generación:</strong> {payload[0].value.toFixed(2)} kWh
              </p>
      
              {/* Demanda */}
              <p style={{ fontSize: '12px', marginBottom: '5px', textAlign: 'left' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: '#ff0000', // Color rojo para demanda
                    marginRight: '8px',
                  }}
                ></span>
                <strong>Demanda:</strong> {payload[1].value.toFixed(2)} kWh
              </p>
      
              {/* Autoconsumo */}
              <p style={{ fontSize: '12px', textAlign: 'left' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: '#0000ff', // Color azul para autoconsumo
                    marginRight: '8px',
                  }}
                ></span>
                <strong>Autoconsumo:</strong> {payload[2].value.toFixed(2)} kWh
              </p>
            </Container>
          );
        }
      
        return null;
      }

    

    const formatXAxis = (tickItem) => {        
        const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
        return months[tickItem - 1]; 
    };
    
    const CustomLegend = (props) => {
        const { payload } = props;
        return (
            <ul style={{ padding: 0, margin: '0 auto', display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                {payload.map((entry, index) => (
                    <li
                        key={`legend-item-${index}`}
                        onClick={() => handleLegendClick(entry)}
                        style={{
                            listStyleType: 'none',
                            marginRight: '20px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                width: '12px',
                                height: '12px',
                                backgroundColor: visibleAreas[entry.dataKey] ? entry.color : "#A9A9A9",
                                opacity: 1,
                                marginRight: '5px',
                            }}
                        ></div>
                        <span
                            style={{
                                color: !visibleAreas[entry.dataKey] ? '#808080' : 'inherit'
                            }}
                        >
                            {entry.value === 'energy_gen' ? 'Generación' :
                             entry.value === 'energy_dem' ? 'Demanda' :
                             entry.value === 'energy_self' ? 'Autoconsumo' :
                             entry.value}
                        </span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width="100%"
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 5,
                    }}
                >
                
                    <CartesianGrid strokeDasharray="3 3" />
                    
                    <XAxis
                        dataKey="month"
                        padding={{ left: 20, right: 20 }}
                        tickFormatter={formatXAxis}
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis  type="number" width={80} interval={0} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip content={<CustomTooltip />}/>
                    <Legend content={<CustomLegend />} />
                    
                    <Bar
                        dataKey="energy_gen"
                        fill="#00ff00"
                        hide={!visibleAreas.energy_gen}
                    />
                    <Bar
                        dataKey="energy_dem"
                        fill="#ff0000"
                        hide={!visibleAreas.energy_dem}
                    />
                    <Bar
                        dataKey="energy_self"
                        fill="#0000ff"
                        hide={!visibleAreas.energy_self}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Figurebyyear;
