import MessageBox from '@/components/MessageBox';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import style from './style.module.scss';

interface ChatMessage {
  nickname: string;
  message: string;
  date: Date;
}

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

const ChatRoom = () => {
  const { nickname } = useLocation().state;
  const [chatList, setChatList] = useState(DUMMY_CHAT);

  console.log(nickname, 'chatRoom');
  return (
    <div className={style.container}>
      <div className={style.chatBox}>
        <ul className={style.chatList}>
          {chatList.map((chat, idx) => (
            <li key={idx}>
              <MessageBox
                nickname={chat.nickname}
                message={chat.message}
                date={chat.date}
              />
            </li>
          ))}
        </ul>
        <div className={style.chatInputBox}>
          <textarea className={style.chatInput} />
          <button className={style.chatSubmit}>전송</button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
