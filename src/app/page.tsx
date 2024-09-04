'use client';

import { Game } from '@/component/Game';
import { Interstitial } from '@/component/Interstitial';
import { useGameStore } from '@/store/gameStore';

export default function Home() {
  const isGameStarted = useGameStore((state) => state.isGameStarted);
  return (
    <main>
      <Interstitial />
      {isGameStarted && <Game />}
    </main>
  );
}
