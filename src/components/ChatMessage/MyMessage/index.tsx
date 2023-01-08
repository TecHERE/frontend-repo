import React from 'react';
import styles from './styles.module.scss';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

interface MyMessageProps {
  author: string;
  content: string;
  date: Date;
}

export default function MyMessage({ author, content, date }: MyMessageProps) {
  return (
    <div className={styles.container}>
      <h1>{author}</h1>
      <div className={styles.messageBox}>
        <p className={styles.time}>{dayjs(date).format('h:mm A')}</p>
        <div className={styles.message}>{content}</div>
      </div>
    </div>
  );
}
