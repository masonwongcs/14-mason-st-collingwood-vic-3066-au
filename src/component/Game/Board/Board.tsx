import './Board.scss';

import { useEffect, useState } from 'react';

import { Arrow } from '@/component/Game/Arrow';
import { SwipeDetector } from '@/component/Game/Board/Board.utils';
import { GRID_COL, MODE } from '@/component/Game/Game.constant';
import { useGameStore } from '@/store/gameStore';

const Board = () => {
  const { prizes, gameMode, isCompleted, move, moveForward, moveBackward, rotate, resetGame, setDirection } =
    useGameStore();

  const handleSwipe = (direction: string) => {
    switch (direction) {
      case 'up':
        setDirection(0);
        move(0, -1);
        break;
      case 'left':
        setDirection(3);
        move(-1, 0);
        break;
      case 'down':
        setDirection(2);
        move(0, 1);
        break;
      case 'right':
        setDirection(1);
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
          if (gameMode === MODE[0].id) {
            moveForward();
          } else {
            setDirection(0);
            move(0, -1);
          }
          break;
        case 'a':
        case 'ArrowLeft':
          if (gameMode === MODE[0].id) {
            rotate(false);
          } else {
            setDirection(3);
            move(-1, 0);
          }
          break;
        case 's':
        case 'ArrowDown':
          if (gameMode === MODE[0].id) {
            moveBackward();
          } else {
            setDirection(2);
            move(0, 1);
          }
          break;
        case 'd':
        case 'ArrowRight':
          if (gameMode === MODE[0].id) {
            rotate(true);
          } else {
            setDirection(1);
            move(1, 0);
          }
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
        <Arrow />
      </div>
    </SwipeDetector>
  );
};

export { Board };
