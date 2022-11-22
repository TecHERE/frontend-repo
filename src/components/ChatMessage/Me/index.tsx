import React from 'react';
import style from './style.module.scss';
import dayjs from 'dayjs';
import { chat } from '@/type';

const Me = ({ name, chat, date }: chat) => {
  return (
    <div className={style.ChatRoom_Body_Me}>
      <p>{name}</p>
      <div>
        <span>{dayjs(date).format('HH:mm')} PM</span>
        <span>{chat}</span>
      </div>
    </div>
  );
};

export default Me;
