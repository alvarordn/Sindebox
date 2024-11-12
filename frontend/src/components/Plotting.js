import React, { useState } from 'react'
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


function Plotting( {data }) {
    const formatTooltip = (value, name) => {
      if(name === 'Generación' || name === 'Carga'){      
        if(typeof value === 'number'){
          return `${value.toFixed(2)} kWh`;
        }else{
          return `${value} kWh`;
        }    
      }else if(name === 'Precio'){
        return `${value.toFixed(2)} €/kWh`;
      }else{
        return value;
      }      
    };

    return (      
      <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart 
            width='100%'
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
              <stop offset="5%" stopColor="#ffa500" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ffa500" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a52a2a" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#a52a2a" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            height={60} 
            dataKey="Hora" 
            name="Hora" 
            label={{ value: 'Hora' }}
            padding={{ left: 20, right: 20 }} 
          />
          <YAxis
            yAxisId="left"
            type="number"
            domain={[0, 6]}
            width={80}
            interval={0}
            label={{ value: 'Energía (kWh)', angle: -90 }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            type="number"
            domain={[0, 0.14]}
            width={160}
            interval={0}
            label={{ value: 'Precio (€/MWh)', angle: 90}}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip formatter={formatTooltip} />
            <Area type="monotone" dataKey="Generación" stroke="#ffa500" yAxisId="left" fillOpacity={1} fill="url(#colorPv)" />
            <Area type="monotone" dataKey="Carga" stroke="#a52a2a" yAxisId="left" fillOpacity={1} fill="url(#colorDemand)" />
            <Line 
              type="monotone" 
              dataKey="Precio" 
              stroke="#8884d8"
              strokeWidth={3}
              yAxisId="right"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    )
}

export default Plotting
