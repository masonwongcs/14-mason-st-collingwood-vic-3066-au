import { ReactNode, TouchEvent, useCallback, useState } from 'react';

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

const SwipeDetector = ({ onSwipe, children }: { onSwipe: (direction: string) => void; children: ReactNode }) => {
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });

  const minSwipeDistance = 50;

  const onTouchStart = useCallback((e: TouchEvent) => {
    setTouchEnd({ x: 0, y: 0 }); // Reset touchEnd
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart.x || !touchEnd.x) return;

    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          onSwipe('right');
        } else {
          onSwipe('left');
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > minSwipeDistance) {
        if (deltaY > 0) {
          onSwipe('down');
        } else {
          onSwipe('up');
        }
      }
    }
  }, [touchStart, touchEnd, onSwipe]);

  return (
    <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} style={{ touchAction: 'none' }}>
      {children}
    </div>
  );
};

export { Instruction, SwipeDetector };
