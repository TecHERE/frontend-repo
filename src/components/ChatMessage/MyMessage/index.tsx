import React from 'react';
import styles from './styles.module.scss';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

interface MyMessageProps {
  nickname: string;
  message: string;
  date: Date;
}

export default function MyMessage({ nickname, message, date }: MyMessageProps) {
  return (
    <div className={styles.container}>
      <h1>{nickname}</h1>
      <div className={styles.messageBox}>
        <p className={styles.time}>{dayjs(date).format('h:mm A')}</p>
        <div className={styles.message}>{message}</div>
      </div>
    </div>
  );
}
