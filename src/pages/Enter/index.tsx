import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './style.module.scss';

const Enter = () => {
  const navigate = useNavigate();
  const [roomID, setRoomID] = useState('');
  const [nickname, setNickname] = useState('');

  const onEnterToRoom = () => {
    navigate(`/room/${roomID}`, {
      state: {
        nickname,
      },
    });
  };

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const handleRoomID = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomID(e.target.value);
  };

  return (
    <div className={style.container}>
      <h1 className={style.h1}>Techere</h1>
      <div className={style.inputContainer}>
        <label className={style.labelStyle}>Nickname</label>
        <input className={style.inputBox} onChange={handleNickname} />
        <label className={style.labelStyle}>Room No.</label>
        <input className={style.inputBox} onChange={handleRoomID} />
      </div>
      <button className={style.button} onClick={onEnterToRoom}>
        전송
      </button>
    </div>
  );
};

export default Enter;
