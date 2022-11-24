import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './style.module.scss';

const Enter = () => {
  const navigate = useNavigate();

  const onEnterToRoom = () => {
    navigate(`/room`);
  };
  return (
    <div className={style.container}>
      <h1 className={style.h1}>Techere</h1>
      <div className={style.inputContainer}>
        <label className={style.labelStyle}>Nickname</label>
        <input className={style.inputBox} />
        <label className={style.labelStyle}>Room No.</label>
        <input className={style.inputBox} />
      </div>
      <button className={style.button} onClick={onEnterToRoom}>
        전송
      </button>
    </div>
  );
};

export default Enter;
