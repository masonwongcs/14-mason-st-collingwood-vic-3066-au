import './Arrow.scss';

import { useEffect, useState } from 'react';

import { useGameStore } from '@/store/gameStore';

const getShortestRotation = (current: number, target: number) => {
  let delta = target - current;
  delta = ((delta % 360) + 360) % 360;
  if (delta > 180) delta -= 360;
  return delta;
};

const Arrow = () => {
  const { position, direction } = useGameStore();

  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    setRotation((prevRotation) => {
      const shortestRotation = getShortestRotation(prevRotation, direction * 90);
      return prevRotation + shortestRotation;
    });
  }, [direction]);

  return (
    <div
      className="arrowWrapper"
      style={{
        transform: `translate(calc(${position.x} * var(--gridSize)), calc(${position.y} * var(--gridSize)))`
      }}
    >
      <div className="arrowWrapper--icon" style={{ transform: `rotate(${rotation}deg)` }}>
        <img src="/images/owl.svg" alt="Bellroy Owl" />
        <img src="/images/arrow.svg" alt="Arrow" />
      </div>
    </div>
  );
};

export { Arrow };
