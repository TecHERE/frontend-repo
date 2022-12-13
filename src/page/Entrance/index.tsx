import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.scss';
const Entrance = () => {
  const [room, setRoom] = useState('');
  const [nick, setNick] = useState('');

  const changeNick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNick(e.target.value);
  };

  const changeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom(e.target.value);
  };

  return (
    <div className={style.Entra_Box}>
      <div className={style.Entra_Input}>
        <label htmlFor="Nick">NickName</label>
        <input onChange={changeNick} id="Nick"></input>
      </div>
      <div className={style.Entra_Input}>
        <label htmlFor="RoomNum">Room No.</label>
        <input onChange={changeId} id="RoomNum"></input>
      </div>
      <button className={style.Button} type="submit">
        <Link
          style={{ textDecoration: 'none' }}
          state={{ nick }}
          to={`/${room}`}
        >
          입장
        </Link>
      </button>
    </div>
  );
};

export default Entrance;
