import Me from '@/components/ChatMessage/Me';
import OtherPerson from '@/components/ChatMessage/OtherPerson';
import { chat } from '@/type';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import style from './style.module.scss';
const ChatRoom = () => {
  const { id } = useParams();
  const { nick } = useLocation().state;
  const [chat, setChat] = useState('');
  const inputRef = useRef<any>();
  const bodyRef = useRef<any>();
  const [chatList, setChatList] = useState<chat[]>([
    {
      name: '승환',
      chat: '안녕하세용',
      date: new Date('2022-11-20 22:14'),
    },
    {
      name: '상대방',
      chat: '안녕하세용',
      date: new Date('2022-11-20 22:14'),
    },
    {
      name: '승환',
      chat: '뭐하세용',
      date: new Date('2022-11-20 22:15'),
    },
    {
      name: '상대방',
      chat: '자는중',
      date: new Date('2022-11-20 22:15'),
    },
  ]);

  const changeChat = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChat(e.target.value);
  };

  const sendClickChat = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (inputRef.current.value == '') return;

    setChatList([
      ...chatList,
      {
        name: nick,
        chat: inputRef.current.value,
        date: new Date(),
      },
    ]);
    inputRef.current.focus();
    setChat('');
    inputRef.current.value = '';

    bodyRef.current.scrollTo({
      top: bodyRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  const sendPressChat = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code != 'Enter' || e.key == 'Enter') {
      return;
    }
    if (inputRef.current.value == '') return;
    setChatList([
      ...chatList,
      {
        name: nick,
        chat: inputRef.current.value,
        date: new Date(),
      },
    ]);
    inputRef.current.focus();
    setChat('');

    bodyRef.current.scrollTo({
      top: bodyRef.current.scrollHeight,
      behavior: 'smooth',
    });

    inputRef.current.value = '';
  };

  return (
    <div className={style.ChatBox}>
      <div className={style.ChatRoom_Title}>Room No. {id}</div>
      <div ref={bodyRef} className={style.ChatRoom_Body}>
        <div>
          {chatList.map((v, i) => {
            return v.name == '승환' ? (
              <Me key={i} name={v.name} chat={v.chat} date={v.date} />
            ) : (
              <OtherPerson key={i} name={v.name} chat={v.chat} date={v.date} />
            );
          })}
        </div>
        <div className={style.ChatRoom_Body_Input}>
          <input
            onKeyDown={sendPressChat}
            ref={inputRef}
            onChange={changeChat}
          ></input>
          <button onClick={sendClickChat}>전송</button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
