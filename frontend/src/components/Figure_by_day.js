import React, { useState } from 'react';
import { ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

function Figure_by_day({ data }) {
    const [visibleAreas, setVisibleAreas] = useState({
        energy_gen: true,
        energy_grid: true,
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
            return [`Generación: ${value.toFixed(2)} W`, ''];
        } else {
            if (name === 'energy_self') {
                return [`Autoconsumo: ${value.toFixed(2)} W`, ''];
            }else{                
                if (name === 'energy_grid') {
                    return [`Red: ${value.toFixed(2)} W`, ''];
                }else{
                    return value;
                }
            }
        }
    };

    const formatXAxis = (tickItem) => {
        return new Date(tickItem).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Función para personalizar el estilo de la leyenda
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
                             entry.value === 'energy_grid' ? 'Red' :
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
                <ComposedChart
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
                    <defs>
                        <linearGradient id="PV" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00ff00" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#00ff00" stopOpacity={0.3} />
                        </linearGradient>
                        <linearGradient id="Carga" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ff0000" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#ff0000" stopOpacity={0.3} />
                        </linearGradient>
                        <linearGradient id="Autoconsumo" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0000ff" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#0000ff" stopOpacity={0.3} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="timestamp"
                        padding={{ left: 20, right: 20 }}
                        tickFormatter={formatXAxis}
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis yAxisId="left" type="number" width={80} interval={0} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip formatter={formatTooltip} />
                    <Legend content={<CustomLegend />} />

                    <Area
                        type="monotone"
                        dataKey="energy_gen"
                        stroke="#00ff00"
                        strokeWidth={2} 
                        fill="url(#PV)"
                        yAxisId="left"
                        hide={!visibleAreas.energy_gen}
                    />
                    <Area
                        type="monotone"
                        dataKey="energy_grid"
                        stroke="#ff0000"
                        strokeWidth={2} 
                        fill="url(#Carga)"
                        yAxisId="left"
                        hide={!visibleAreas.energy_grid}
                    />
                    <Area
                        type="monotone"
                        dataKey="energy_self"
                        stroke="#0000ff"
                        strokeWidth={2} 
                        fill="url(#Autoconsumo)"
                        yAxisId="left"
                        hide={!visibleAreas.energy_self}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Figure_by_day;
