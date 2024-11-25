import React from 'react';
import { useSpring, animated } from 'react-spring';

function AnimatedArrow({ sense, diagonal, angle135 }) {
  const length = diagonal ? 100 : 150; // Longitud de la flecha

  // Calcular las coordenadas iniciales y finales dependiendo de las propiedades
  const x_start = 0;
  const y_start = diagonal ? (sense ? 0 : 100) : 50; // Vertical o horizontal dependiendo de "diagonal"
  const x_end = diagonal ? (angle135 ? -length : length) : length;
  const y_end = diagonal ? (sense ? 100 : 0) : 50; // Mantener en la misma línea para horizontal

  // Animación de la flecha usando react-spring
  const props = useSpring({
    from: { x: x_start, y: y_start },
    to: { x: x_end, y: y_end },
    config: { duration: 800 },
    loop: { reverse: true },
  });

  // Calcular los puntos del triángulo (flecha)
  const arrowHead = props.x.to(x => {
    return props.y.to(y => {
      const arrowWidth = 10;
      const arrowHeight = 5;
      const x_offset = diagonal && angle135 ? -arrowWidth : arrowWidth;

      return `${x},${y - arrowHeight} ${x},${y + arrowHeight} ${x + x_offset},${y}`;
    });
  });

  return (
    <svg width="200" height="100" style={{ overflow: 'visible' }}>
      {/* Línea de la flecha */}
      <animated.line
        x1={x_start}
        y1={y_start}
        x2={props.x}
        y2={props.y}
        stroke="black"
        strokeWidth="2"
      />
      
      {/* Cabeza de la flecha */}
      <animated.polygon
        points={arrowHead}
        fill="black"
      />
    </svg>
  );
}

export default AnimatedArrow;
