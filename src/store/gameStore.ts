import { create } from 'zustand';

import { DIRECTIONS, GRID_COL, MODE, PRIZES, STARTING_POSITION } from '@/component/Game/Game.constant';
import { PrizeType } from '@/component/Game/Game.type';

interface GameState {
  isGameStarted: boolean;
  startGame: () => void;
  position: { x: number; y: number };
  direction: number;
  prizes: PrizeType[];
  collectedPrizes: PrizeType[];
  gameMode: string;
  totalSteps: number;
  isCompleted: boolean;
  setPosition: (x: number, y: number) => void;
  setDirection: (direction: number) => void;
  setPrizes: (prizes: PrizeType[]) => void;
  setCollectedPrizes: (prizes: PrizeType[]) => void;
  setGameMode: (mode: string) => void;
  setTotalSteps: (steps: number) => void;
  move: (dx: number, dy: number) => void;
  moveForward: () => void;
  moveBackward: () => void;
  rotate: (clockwise: boolean) => void;
  checkForPrize: () => void;
  resetGame: () => void;
  generatePrizes: () => void;
}

const useGameStore = create<GameState>((set, get) => ({
  isGameStarted: false,
  startGame: () =>
    set(() => ({
      isGameStarted: true
    })),
  position: { x: STARTING_POSITION[0], y: STARTING_POSITION[1] },
  direction: 0,
  prizes: [],
  collectedPrizes: [],
  gameMode: MODE[0].id,
  totalSteps: 0,
  isCompleted: false,
  setPosition: (x, y) => set({ position: { x, y } }),
  setDirection: (direction) => set({ direction }),
  setPrizes: (prizes) => set({ prizes }),
  setCollectedPrizes: (prizes) => set({ collectedPrizes: prizes }),
  setGameMode: (mode) => set({ gameMode: mode }),
  setTotalSteps: (steps) => set({ totalSteps: steps }),
  move: (dx, dy) => {
    const { checkForPrize, position, totalSteps } = get();
    const newX = Math.max(0, Math.min(GRID_COL - 1, position.x + dx));
    const newY = Math.max(0, Math.min(GRID_COL - 1, position.y + dy));

    set({
      position: { x: newX, y: newY }
    });

    if (newX !== position.x || newY !== position.y) {
      set({
        totalSteps: totalSteps + 1
      });
    }

    checkForPrize();
  },
  moveForward: () => {
    const { direction } = get();
    switch (DIRECTIONS[direction]) {
      case 'N':
        get().move(0, -1);
        break;
      case 'E':
        get().move(1, 0);
        break;
      case 'S':
        get().move(0, 1);
        break;
      case 'W':
        get().move(-1, 0);
        break;
    }
  },
  moveBackward: () => {
    const { direction } = get();
    switch (DIRECTIONS[direction]) {
      case 'N':
        get().move(0, 1);
        break;
      case 'E':
        get().move(-1, 0);
        break;
      case 'S':
        get().move(0, -1);
        break;
      case 'W':
        get().move(1, 0);
        break;
    }
  },
  rotate: (clockwise) => set((state) => ({ direction: (state.direction + (clockwise ? 1 : 3)) % 4 })),
  checkForPrize: () => {
    const { position, prizes, collectedPrizes } = get();
    const prizeIndex = prizes.findIndex((prize) => prize.x === position.x && prize.y === position.y);
    if (prizeIndex !== -1) {
      const [collectedPrize] = prizes.splice(prizeIndex, 1);
      set({
        prizes: [...prizes],
        collectedPrizes: [...collectedPrizes, collectedPrize],
        isCompleted: collectedPrizes.length + 1 === PRIZES.length
      });
    }
  },
  resetGame: () => {
    set({
      position: { x: STARTING_POSITION[0], y: STARTING_POSITION[1] },
      direction: 0,
      prizes: [],
      collectedPrizes: [],
      totalSteps: 0,
      isCompleted: false
    });
    get().generatePrizes();
  },
  generatePrizes: () => {
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
      return { x, y, id, name, image };
    });
    set({ prizes: newPrizes });
  }
}));

export { useGameStore };
