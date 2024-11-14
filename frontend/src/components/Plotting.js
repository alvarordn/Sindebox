import React from 'react';
import { ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


function Plotting({ data }) {
    const formatTooltip = (value, name) => {
        if (name === 'energy_gen') {
            return [`Generación: ${value.toFixed(2)} W`, ''];
        } else {
            return value;
        }
    };

    const formatXAxis = (tickItem) => {
      return new Date(tickItem).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ffa500" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#ffa500" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="timestamp"
                        name="Hora"
                        // label={{ value: 'Hora', position: 'insideBottomRight', offset: -10 }}
                        padding={{ left: 20, right: 20 }}
                        tickFormatter={formatXAxis} // Aplica el formato al timestamp
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis
                        yAxisId="left"
                        type="number"
                        width={80}
                        interval={0}
                        // label={{ value: 'Potencia (W)', angle: -90, position: 'insideLeft' }}
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip formatter={formatTooltip} />

                    <Area
                        type="monotone"
                        dataKey="energy_gen"
                        stroke="#82ca9d"
                        fill="url(#colorPv)"
                        fillOpacity={1}
                        yAxisId="left"
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Plotting;
