import React from 'react';
import style from './style.module.scss';
import dayjs from 'dayjs';
import { chat } from '@/type';
const OtherPerson = ({ name, chat, date }: chat) => {
  return (
    <div className={style.ChatRoom_Body_OtherPerson}>
      <p>{name}</p>
      <div>
        <span>{chat}</span> <span>{dayjs(date).format('HH:mm')}PM</span>
      </div>
    </div>
  );
};

export default OtherPerson;
