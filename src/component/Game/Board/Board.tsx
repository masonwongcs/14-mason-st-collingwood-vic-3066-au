import './Board.scss';

import { useEffect } from 'react';

import { SwipeDetector } from '@/component/Game/Board/Board.utils';
import { GRID_COL, MODE } from '@/component/Game/Game.constant';
import { useGameStore } from '@/store/gameStore';

const Board = () => {
  const { position, direction, prizes, gameMode, isCompleted, move, moveForward, moveBackward, rotate, resetGame } =
    useGameStore();

  const handleSwipe = (direction: string) => {
    switch (direction) {
      case 'up':
        move(0, -1);
        break;
      case 'left':
        move(-1, 0);
        break;
      case 'down':
        move(0, 1);
        break;
      case 'right':
        move(1, 0);
        break;
    }
  };

  useEffect(() => {
    resetGame();
  }, [gameMode]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isCompleted) return;
      switch (event.key) {
        case 'w':
        case 'ArrowUp':
          gameMode === MODE[0].id ? moveForward() : move(0, -1);
          break;
        case 'a':
        case 'ArrowLeft':
          gameMode === MODE[0].id ? rotate(false) : move(-1, 0);
          break;
        case 's':
        case 'ArrowDown':
          gameMode === MODE[0].id ? moveBackward() : move(0, 1);
          break;
        case 'd':
        case 'ArrowRight':
          gameMode === MODE[0].id ? rotate(true) : move(1, 0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameMode, isCompleted]);

  return (
    <SwipeDetector onSwipe={handleSwipe}>
      <div className="boardWrapper">
        {[...Array(GRID_COL * GRID_COL)].map((_, index) => {
          const x = index % GRID_COL;
          const y = Math.floor(index / GRID_COL);
          const prize = prizes.find((p) => p.x === x && p.y === y);
          return (
            <div key={index} className="boardWrapper--item">
              {prize && (
                <div className="boardWrapper--item--gift">
                  <img className="boardWrapper--item--gift--image" src={prize.image} alt={prize.name} />
                </div>
              )}
            </div>
          );
        })}
        <div
          className="boardWrapper--arrow"
          style={{
            transform: `translate(calc(${position.x} * var(--gridSize)), calc(${position.y} * var(--gridSize)))`
          }}
        >
          <div className="boardWrapper--arrow--icon" style={{ transform: `rotate(${direction * 90}deg)` }}>
            <img src="/images/owl.svg" alt="Bellroy Owl" />
            <img src="/images/arrow.svg" alt="Arrow" />
          </div>
        </div>
      </div>
    </SwipeDetector>
  );
};

export { Board };
