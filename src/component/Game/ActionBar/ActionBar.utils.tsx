import { MODE } from '@/component/Game/Game.constant';

const Instruction = ({ mode }: { mode: string }) => {
  switch (mode) {
    case MODE[0].id:
      return (
        <p>
          <span>
            <kbd>W</kbd>
            <kbd>↑</kbd>
            Forward
          </span>
          <span>
            <kbd>S</kbd>
            <kbd>↓</kbd>
            Backward
          </span>
          <span>
            <kbd>D</kbd>
            <kbd>→</kbd>
            Right
          </span>
          <span>
            <kbd>A</kbd>
            <kbd>←</kbd>
            Left
          </span>
        </p>
      );
    case MODE[1].id:
      return (
        <p>
          <span>
            <kbd>W</kbd>
            <kbd>↑</kbd>
            North
          </span>
          <span>
            <kbd>A</kbd>
            <kbd>←</kbd>
            West
          </span>
          <span>
            <kbd>S</kbd>
            <kbd>↓</kbd>
            South
          </span>
          <span>
            <kbd>D</kbd>
            <kbd>→</kbd>
            East
          </span>
        </p>
      );
    default:
      return (
        <p>
          <span>
            <kbd>W</kbd>
            <kbd>↑</kbd>
            Forward
          </span>
          <span>
            <kbd>S</kbd>
            <kbd>↓</kbd>
            Backward
          </span>
          <span>
            <kbd>D</kbd>
            <kbd>→</kbd>
            Right
          </span>
          <span>
            <kbd>A</kbd>
            <kbd>←</kbd>
            Left
          </span>
        </p>
      );
  }
};

export { Instruction };
