import React from 'react';
import style from './style.module.scss';
import dayjs from 'dayjs';

interface ChatMessage {
  nickname: string;
  message: string;
  date: Date;
}

const MessageBox = ({ nickname, message, date }: ChatMessage) => {
  return (
    <div className={style.container}>
      <h1>{nickname}</h1>
      <div className={style.messageBox}>
        <div className={style.message}>{message}</div>
        <p className={style.time}>{dayjs(date).format('h:mm A')}</p>
      </div>
    </div>
  );
};

export default MessageBox;
