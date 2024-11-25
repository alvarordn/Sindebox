import React from 'react';
import { useSpring, animated } from 'react-spring';

function EnergyFlow({ data }) {
    
  const trianglePoints = [
    { x: 30, y: 25 },   // Vértice superior (Generación)
    { x: -30, y: 60 },   // Vértice inferior izquierdo (Demanda)
    { x: 90, y: 60 },    // Vértice inferior derecho (Red)
  ];
  
  const linePoints = [
    { x: 40, y: 30 },   // Punto de inicio de la flecha para Generación
    { x: 20, y: 80 },   // Punto de destino de la flecha para Demanda
    { x: 70, y: 80 },   // Punto de destino de la flecha para Red
  ];

  // Determinación de la dirección de flujo
  const flowFromGenToDem = data.genrt > data.demrt;
  const flowFromRedToDem = data.gridrt >= data.demrt;
  const flowFromGenToRed = data.genrt > data.gridrt;

  // Animación de las flechas
  const genToDemAnim = useSpring({
    from: { x: linePoints[0].x, y: linePoints[0].y },
    to: { x: linePoints[1].x, y: linePoints[1].y },
    config: { duration: 800 },
    reverse: !flowFromGenToDem, 
    loop: true,
  });

  const genToRedAnim = useSpring({
    from: { x: linePoints[0].x, y: linePoints[0].y },
    to: { x: linePoints[2].x, y: linePoints[2].y },
    config: { duration: 800 },
    reverse: !flowFromGenToRed, 
    loop: true,
  });

  const redToDemAnim = useSpring({
    from: { x: linePoints[2].x, y: linePoints[2].y },
    to: { x: linePoints[1].x, y: linePoints[1].y },
    config: { duration: 800 },
    reverse: !flowFromRedToDem,
    loop: true,
  });

  return (
    <svg width="200" height="200" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
      {/* Datos en las cajas (por encima de las líneas) */}
      <g>
        <foreignObject x={trianglePoints[0].x - 25} y={trianglePoints[0].y - 30} width="80" height="40">
          <div
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.0)', // Fondo sombreado
              padding: '5px',
              borderRadius: '5px',
              textAlign: 'center',
              fontSize: '10px',
            }}
          >
            <strong>Generación</strong>
            <div>{(data.genrt * 12).toFixed(2)} kW</div>
          </div>
        </foreignObject>

        <foreignObject x={trianglePoints[1].x - 25} y={trianglePoints[1].y + 5} width="80" height="40">
          <div
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.0)', // Fondo sombreado
              padding: '5px',
              borderRadius: '5px',
              textAlign: 'center',
              fontSize: '10px',
            }}
          >
            <strong>Demanda</strong>
            <div>{(data.demrt * 12).toFixed(2)} kW</div>
          </div>
        </foreignObject>

        <foreignObject x={trianglePoints[2].x - 25} y={trianglePoints[2].y + 5} width="80" height="40">
          <div
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.0)', // Fondo sombreado
              padding: '5px',
              borderRadius: '5px',
              textAlign: 'center',
              fontSize: '10px',
            }}
          >
            <strong>Red</strong>
            <div>{(data.gridrt * 12).toFixed(2)} kW</div>
          </div>
        </foreignObject>
      </g>


      {flowFromGenToDem && (
        <animated.line
          x1={linePoints[0].x}
          y1={linePoints[0].y}
          x2={genToDemAnim.x}
          y2={genToDemAnim.y}
          stroke="royalblue" 
          strokeWidth="2"
          opacity={0.6}
        //   markerEnd="url(#arrowhead)" 
        />
      )}

      {flowFromRedToDem && (
        <animated.line
          x1={linePoints[2].x}
          y1={linePoints[2].y}
          x2={redToDemAnim.x}
          y2={redToDemAnim.y}
          stroke="royalblue" // Color azulado
          strokeWidth="2"
          opacity={0.6} // Opacidad para que no opaque el texto
        //   markerEnd="url(#arrowhead)" // Aplica la punta de flecha al final de la línea
        />
      )}

      {flowFromGenToRed && (
        <animated.line
          x1={linePoints[0].x}
          y1={linePoints[0].y}
          x2={genToRedAnim.x}
          y2={genToRedAnim.y}
          stroke="royalblue" // Color azulado
          strokeWidth="2"
          opacity={0.6} // Opacidad para que no opaque el texto
        //   markerEnd="url(#arrowhead)" // Aplica la punta de flecha al final de la línea
        />
      )}
    </svg>
  );
}

export default EnergyFlow;
