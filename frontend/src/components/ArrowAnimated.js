import React from 'react';
import { useSpring, animated } from 'react-spring';

function AnimatedArrow({ sense, diagonal, angle135 }) {
  const length = diagonal ? 100 : 150; // Longitud de la flecha (aproximadamente)

  // Cálculo de las coordenadas iniciales y finales según diagonal y sentido
  const x_start = 0;
  const y_start = diagonal ? (sense ? 0 : 100) : 50; // Horizontal si no es diagonal
  const x_end = diagonal ? (angle135 ? -length : length) : length;
  const y_end = diagonal ? (sense ? 100 : 0) : 50; // Mantener en la misma línea para horizontal

  // Animación de la flecha
  const props = useSpring({
    from: { x: x_start, y: y_start },
    to: { x: x_end, y: y_end },
    config: { duration: 800 },
    loop: { reverse: true },
  });

  return (
    <svg width="200" height="100" style={{ overflow: 'visible' }}>
      {/* Línea animada */}
      <animated.line
        x1={x_start}
        y1={y_start}
        x2={props.x}
        y2={props.y}
        stroke="black"
        strokeWidth="2"
      />
      {/* Punta de la flecha */}
      <animated.polygon
        points={props.x.to((x) =>
          props.y.to((y) =>
            `${x},${y - 5} ${x},${y + 5} ${x + (diagonal && angle135 ? -10 : 10)},${y}`
          )
        )}
        fill="black"
      />
    </svg>
  );
}

export default AnimatedArrow;
