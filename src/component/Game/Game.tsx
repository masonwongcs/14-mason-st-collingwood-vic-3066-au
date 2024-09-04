'use client';

import './Game.scss';

import { useEffect, useState } from 'react';

import cx from 'classnames';

import { DIRECTIONS, GRID_COL, MODE, PRIZES, STARTING_POSITION } from '@/component/Game/Game.constant';
import { PrizeType } from '@/component/Game/Game.type';
import { Instruction, SwipeDetector } from '@/component/Game/Game.utils';
import { Message } from '@/component/Game/Message';

const Game = () => {
  const [position, setPosition] = useState({ x: STARTING_POSITION[0], y: STARTING_POSITION[1] });
  const [direction, setDirection] = useState(0); // 0: N, 1: E, 2: S, 3: W
  const [prizes, setPrizes] = useState<PrizeType[]>([]);
  const [collectedPrizes, setCollectedPrizes] = useState<PrizeType[]>([]);
  const [gameMode, setGameMode] = useState(MODE[0].id);
  const [totalSteps, setTotalSteps] = useState(0);
  const isCompleted = collectedPrizes.length === PRIZES.length;

  const generatePrizes = () => {
    const occupiedPositions = new Set();
    const avoidPosition = STARTING_POSITION.join(',');
    const newPrizes = PRIZES.map(({ name, id, image }) => {
      let x, y, position;

      do {
        x = Math.floor(Math.random() * GRID_COL);
        y = Math.floor(Math.random() * GRID_COL);
        position = `${x},${y}`;
      } while (occupiedPositions.has(position) || position === avoidPosition);

      occupiedPositions.add(position);

      return {
        x,
        y,
        id,
        name,
        image
      };
    });

    setPrizes(newPrizes);
  };

  const move = (dx: number, dy: number) => {
    setPosition((prev) => ({
      x: Math.max(0, Math.min(GRID_COL - 1, prev.x + dx)),
      y: Math.max(0, Math.min(GRID_COL - 1, prev.y + dy))
    }));

    setTotalSteps((prevState) => prevState + 1);
  };

  const moveForward = () => {
    switch (DIRECTIONS[direction]) {
      case 'N':
        move(0, -1);
        break;
      case 'E':
        move(1, 0);
        break;
      case 'S':
        move(0, 1);
        break;
      case 'W':
        move(-1, 0);
        break;
    }
  };

  const moveBackward = () => {
    switch (DIRECTIONS[direction]) {
      case 'N':
        move(0, 1);
        break;
      case 'E':
        move(-1, 0);
        break;
      case 'S':
        move(0, -1);
        break;
      case 'W':
        move(1, 0);
        break;
    }
  };

  const rotate = (clockwise = true) => {
    setDirection((prev) => (prev + (clockwise ? 1 : 3)) % 4);
  };

  const checkForPrize = () => {
    const prizeIndex = prizes.findIndex((prize) => prize.x === position.x && prize.y === position.y);
    if (prizeIndex !== -1) {
      const [collectedPrize] = prizes.splice(prizeIndex, 1);
      setPrizes([...prizes]);
      setCollectedPrizes((prev) => [...prev, collectedPrize]);
    }
  };

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

  const resetGame = () => {
    setPosition({ x: 2, y: 2 });
    setDirection(0);
    setPrizes([]);
    setCollectedPrizes([]);
    setTotalSteps(0);

    generatePrizes();
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

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameMode, position, direction, isCompleted]);

  useEffect(() => {
    checkForPrize();
  }, [position]);

  return (
    <section className="gameWrapper">
      <Message
        title="Congratulations!"
        message={`You've spent ${totalSteps} steps to complete the journey and collect all the gifts!`}
        show={isCompleted}
        onOk={resetGame}
        okText="Restart"
      />

      <div className="wrapper">
        <img className="gameWrapper--logo" src="/images/logo.svg" alt="Bellroy Jump" />
        <div className="gameWrapper__action">
          <div className="gameWrapper__action--mode">
            {MODE.map(({ id, title }) => (
              <div
                key={id}
                className={cx('gameWrapper__action--mode--item', {
                  active: id === gameMode
                })}
                onClick={() => setGameMode(id)}
              >
                {title}
              </div>
            ))}
          </div>
          {totalSteps !== 0 ? (
            <>
              <div className="gameWrapper__action--prizes">
                {collectedPrizes?.map(({ id, image, name }) => (
                  <div key={id} className="gameWrapper__action--prizes--item">
                    <img src={image} alt={name} />
                  </div>
                ))}
              </div>
              <div className="gameWrapper__action--total">
                {totalSteps} {totalSteps === 1 ? 'step' : 'steps'}
              </div>
            </>
          ) : (
            <div className="gameWrapper__action--instruction">
              <Instruction mode={gameMode} />
            </div>
          )}
        </div>
        <SwipeDetector onSwipe={handleSwipe}>
          <div className="gameWrapper__board">
            {[...Array(GRID_COL * GRID_COL)].map((_, index) => {
              const x = index % GRID_COL;
              const y = Math.floor(index / GRID_COL);
              const prize = prizes.find((p) => p.x === x && p.y === y);
              return (
                <div key={index} className="gameWrapper__board--item">
                  {prize && (
                    <div className="gameWrapper__board--item--gift">
                      <img className="gameWrapper__board--item--gift--image" src={prize.image} alt={prize.name} />
                    </div>
                  )}
                </div>
              );
            })}

            <div
              className="gameWrapper__board--arrow"
              style={{
                transform: `translate(calc(${position.x} * var(--gridSize)), calc(${position.y} * var(--gridSize))`
              }}
            >
              <div className="gameWrapper__board--arrow--icon" style={{ transform: `rotate(${direction * 90}deg)` }}>
                <img src="/images/owl.svg" alt="Bellroy Owl" />
                <img src="/images/arrow.svg" alt="Arrow" />
              </div>
            </div>
          </div>
        </SwipeDetector>
      </div>
    </section>
  );
};

export { Game };
