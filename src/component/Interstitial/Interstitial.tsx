import './Interstitial.scss';

import cx from 'classnames';

import { useGameStore } from '@/store/gameStore';

const Interstitial = () => {
  const isGameStarted = useGameStore((state) => state.isGameStarted);
  const startGame = useGameStore((state) => state.startGame);

  return (
    <section
      className={cx('interstitialWrapper', {
        isGameStarted: isGameStarted
      })}
    >
      <div className="interstitialWrapper__logoWrapper">
        <img className="interstitialWrapper__logoWrapper--logo logo" src="/images/bellroy.svg" alt="Bellroy Logo" />
        <img
          className="interstitialWrapper__logoWrapper--logo text"
          src="/images/collect.svg"
          alt="Bellroy Collect Text"
        />
      </div>
      <div className="interstitialWrapper__ctaWrapper">
        <button onClick={startGame} className="interstitialWrapper__ctaWrapper--cta btn">
          Enter
        </button>
      </div>
    </section>
  );
};

export { Interstitial };
