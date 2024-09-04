'use client';

import './Game.scss';

import { ActionBar } from '@/component/Game/ActionBar';
import { Board } from '@/component/Game/Board';
import { Message } from '@/component/Game/Message';
import { useGameStore } from '@/store/gameStore';

const Game = () => {
  const { totalSteps, isCompleted, resetGame } = useGameStore();

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
        <ActionBar />
        <Board />
      </div>
    </section>
  );
};

export { Game };
