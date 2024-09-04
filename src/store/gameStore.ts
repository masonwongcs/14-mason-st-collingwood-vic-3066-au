import { create } from 'zustand';

interface GameState {
  isGameStarted: boolean;
  startGame: () => void;
}

const useGameStore = create<GameState>((set) => ({
  isGameStarted: false,
  startGame: () =>
    set(() => ({
      isGameStarted: true
    }))
}));

export { useGameStore };
