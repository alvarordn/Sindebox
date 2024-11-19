import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

function Figurebycustom({ data }) {
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

    const formatTooltip = (value, name) => {
        if (name === 'energy_gen') {
            return [`Generación: ${value.toFixed(2)} kWh`, ''];
        } else {
            if (name === 'energy_self') {
                return [`Autoconsumo: ${value.toFixed(2)} kWh`, ''];
            }else{                
                if (name === 'energy_dem') {
                    return [`Demanda: ${value.toFixed(2)} kWh`, ''];
                }else{
                    return value;
                }
            }
        }
    };

    const formatXAxis = (tickItem) => {
        const date = new Date(tickItem);
        return date.getDate().toString() + '/' +  (date.getMonth() + 1).toString(); 
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
                        dataKey="timestamp"
                        padding={{ left: 20, right: 20 }}
                        tickFormatter={formatXAxis}
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis  type="number" width={80} interval={0} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip formatter={formatTooltip} />
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

export default Figurebycustom;
