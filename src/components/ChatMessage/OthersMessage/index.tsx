import React from 'react';
import styles from './styles.module.scss';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

interface OthersMessageProps {
  nickname: string;
  message: string;
  date: Date;
}

export default function OthersMessage({
  nickname,
  message,
  date,
}: OthersMessageProps) {
  return (
    <div className={styles.container}>
      <h1>{nickname}</h1>
      <div className={styles.messageBox}>
        <div className={styles.message}>{message}</div>
        <p className={styles.time}>{dayjs(date).format('h:mm A')}</p>
      </div>
    </div>
  );
}
