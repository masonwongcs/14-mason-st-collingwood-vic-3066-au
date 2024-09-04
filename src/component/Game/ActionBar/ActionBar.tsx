import './ActionBar.scss';

import cx from 'classnames';

import { Instruction } from '@/component/Game/ActionBar/ActionBar.utils';
import { MODE } from '@/component/Game/Game.constant';
import { useGameStore } from '@/store/gameStore';

const ActionBar = () => {
  const { collectedPrizes, gameMode, totalSteps, setGameMode } = useGameStore();

  return (
    <div className="actionBarWrapper">
      <div className="actionBarWrapper--mode">
        {MODE.map(({ id, title }) => (
          <div
            key={id}
            className={cx('actionBarWrapper--mode--item', { active: id === gameMode })}
            onClick={() => setGameMode(id)}
          >
            {title}
          </div>
        ))}
      </div>
      {totalSteps !== 0 ? (
        <>
          <div className="actionBarWrapper--prizes">
            {collectedPrizes?.map(({ id, image, name }) => (
              <div key={id} className="actionBarWrapper--prizes--item">
                <img src={image} alt={name} />
              </div>
            ))}
          </div>
          <div className="actionBarWrapper--total">
            {totalSteps} {totalSteps === 1 ? 'step' : 'steps'}
          </div>
        </>
      ) : (
        <div className="actionBarWrapper--instruction">
          <Instruction mode={gameMode} />
        </div>
      )}
    </div>
  );
};

export { ActionBar };
