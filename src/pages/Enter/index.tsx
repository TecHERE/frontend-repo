import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

export default function Enter() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [roomId, setRoomId] = useState('');
  const onNicknameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const onRoomIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  };
  const onEnter = () => {
    navigate(`/room/${roomId}`, {
      state: {
        nickname,
      },
    });
    setNickname('');
    setRoomId('');
  };
  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <div className={styles.inputBox}>
          <label className={styles.label} htmlFor="nickname">
            NickName
          </label>
          <input
            className={styles.input}
            onChange={onNicknameInput}
            value={nickname}
            id="nickname"
            type="text"
          />
        </div>
        <div className={styles.inputBox}>
          <label className={styles.label} htmlFor="roomId">
            Room No.
          </label>
          <input
            className={styles.input}
            onChange={onRoomIdInput}
            value={roomId}
            id="roomId"
            type="text"
          />
        </div>
        <button className={styles.button} onClick={onEnter}>
          입장
        </button>
      </div>
    </div>
  );
}
