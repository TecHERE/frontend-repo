import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import { ChatMessage } from '@/types';
import MyMessage from '@/components/ChatMessage/MyMessage';
import OthersMessage from '@/components/ChatMessage/OthersMessage';
import * as SockJS from 'socketjs-client';
import * as StompJS from '@stomp/stompjs';
import { disconnect } from 'process';
import { Client, IMessage } from '@stomp/stompjs';
import axios from 'axios';
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

// //생성한 client 객체로 연결됐을떄 실행될 함수
// client.onConnect = function (frame) {};

// //생성한 client 객체로 연결되지 않았을떄 실행될 함수
// client.onStompError = function (frame) {
//   console.log('Broker reported error: ' + frame.headers['message']);
//   console.log('Additional details: ' + frame.body);
// };

// //client 연결시도
// client.activate();

// //client 연결중지
// client.deactivate();

export default function RoomPage() {
  /** 
   상태값이 변할떄 불필요한 리렌더링이 안되게 만들기위해서
   client를 useRef으로 선언
   */
  const client = useRef<Client>();

  /** 채팅방의 채팅 내역을 가지고있는 state */
  const [chatList, setChatList] = useState(DUMMY_CHAT);

  //채팅방에 들어오면 채팅방의 채팅 내역을 서버에서 불러온다.
  //  useEffect(()=>{
  //try axios.get
  //setChatList(()=>result)
  //  },[])

  /** input의 채팅을 모니터링 */
  const [message, setMessage] = useState('');

  /** 연결시도 */
  const connect = () => {
    client.current = new StompJS.Client({
      brokerURL: 'baseUrl 주소',
      connectHeaders: {
        //유저객체가 들어갈듯
      },
      debug: function (str) {
        console.log(str);
      },
      onConnect: () => {
        handleSub(); //client가 연결을 시도한다면 채팅방으로도 연결을 해준다.
      },
    });

    client.current?.activate(); // 연결시도 시켜주는 함수
  };

  //채팅방과 연결시켜주고 연결후 어떤일을 할지 정해주는 함수
  const handleSub = () => {
    if (!client.current?.connected) return;

    client.current?.subscribe('채팅방 url', (msg: IMessage) => {
      const newMessage = JSON.parse(msg?.body).message;
      setChatList((pre) => [...pre, newMessage]);
    });
  };

  //내가 친 채팅을 서버중개인에게 보내주는 함수
  const handlePub = () => {
    if (!client.current?.connected) return;

    client.current?.publish({
      destination: '서버중개인 주소', //서버 중개인 주소
      //이걸 보내주세요
      body: JSON.stringify({
        message: message,
      }),
    });
    //보냈다면 message(input)을 비워준다.
    setMessage('');
  };

  useEffect(() => {
    connect(); //페이지에 들어왔을떄 연결시도해주는 함수
    return () => disconnect(); //페이지를 떠났을떄 연결을 끊어주는 함수
  });

  const disConnect = () => {
    if (client.current?.connected) client.current.deactivate();
  };

  const { roomId } = useParams();
  const { nickname } = useLocation().state;
  const chatListRef = useRef<HTMLUListElement>(null);

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
      handlePub();
    }
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
          <button className={styles.chatSubmit} onClick={handlePub}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
