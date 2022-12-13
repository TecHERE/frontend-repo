import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import { ChatMessage } from '@/types';
import MyMessage from '@/components/ChatMessage/MyMessage';
import OthersMessage from '@/components/ChatMessage/OthersMessage';

const DUMMY_CHAT: ChatMessage[] = [
  {
    nickname: '상민',
    message: '안녕하세요',
    date: new Date('2022-11-20 22:12'),
  },
  {
    nickname: '승환',
    message: '안녕하세요~~~!!',
    date: new Date('2022-11-20 22:14'),
  },
  {
    nickname: '호병',
    message: '안녕하십니까 !!',
    date: new Date('2022-11-20 22:29'),
  },
  {
    nickname: '상민',
    message: '반가워요 !',
    date: new Date('2022-11-20 23:34'),
  },
];

export default function RoomPage() {
  const { roomId } = useParams();
  const { nickname } = useLocation().state;
  const chatListRef = useRef<HTMLUListElement>(null);
  const [chatList, setChatList] = useState(DUMMY_CHAT);
  const [message, setMessage] = useState('');
  const onChatInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  const onKeyDownEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      e.currentTarget.value.length !== 0 &&
      e.key === 'Enter' &&
      !e.shiftKey &&
      e.nativeEvent.isComposing === false
    ) {
      e.preventDefault();
      onSubmit();
    }
  };
  const onSubmit = () => {
    const data = {
      nickname,
      message,
      date: new Date(),
    };
    setChatList((prev) => [...prev, data]);
    setMessage('');
  };
  const scrollToBottom = () => {
    chatListRef.current?.scrollTo({
      top: chatListRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatList]);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Room No. {roomId}</h1>
      <div className={styles.chatBox}>
        <ul ref={chatListRef} className={styles.chatList}>
          {chatList.map((chat, idx) => (
            <li key={idx}>
              {chat.nickname === nickname ? (
                <MyMessage
                  nickname={chat.nickname}
                  message={chat.message}
                  date={chat.date}
                />
              ) : (
                <OthersMessage
                  nickname={chat.nickname}
                  message={chat.message}
                  date={chat.date}
                />
              )}
            </li>
          ))}
        </ul>
        <div className={styles.messageInput}>
          <textarea
            className={styles.chatInput}
            value={message}
            onChange={onChatInput}
            onKeyDown={onKeyDownEnter}
          />
          <button className={styles.chatSubmit} onClick={onSubmit}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
