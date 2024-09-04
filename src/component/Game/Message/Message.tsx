import './Message.scss';

import { FC } from 'react';

import cx from 'classnames';

import { MessageProps } from '@/component/Game/Message/Message.type';

const Message: FC<MessageProps> = ({ title, message, onOk, okText, show }) => {
  return (
    <div
      className={cx('messageWrapper', {
        show
      })}
    >
      <div className="messageWrapper--content">
        <h2 className="messageWrapper--content--title">{title}</h2>
        {message && <p className="messageWrapper--content--text">{message}</p>}
        <button className="btn" onClick={onOk}>
          {okText ? okText : 'Ok'}
        </button>
      </div>
    </div>
  );
};

export { Message };
