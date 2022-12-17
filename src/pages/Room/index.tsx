import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import { ChatMessage } from '@/types';
import MyMessage from '@/components/ChatMessage/MyMessage';
import OthersMessage from '@/components/ChatMessage/OthersMessage';
import useStomp from '@/hooks/useStomp';
import { Client, IMessage } from '@stomp/stompjs';
import useInput from '@/hooks/useInput';

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

export default function Room() {
  const { roomId } = useParams();
  const { nickname } = useLocation().state;
  const chatListRef = useRef<HTMLUListElement>(null);

  /** 채팅 히스토리 리스트를 담을 state */
  const [chatList, setChatList] = useState(DUMMY_CHAT);
  const [message, onChatInput, setMessage] = useInput('');

  /** 엔터 버튼을 통한 채팅 보내기 함수 */
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

  /** useRef() 훅을 사용해 속성 값이 변경돼도 재렌더링하지 않고, 다시 렌더링하더라도 값이 유실되지 않도록 클라이언트를 current 속성에 만든다. */
  const client = useRef<Client>();

  /** 응답받은 body를 채팅 목록 배열에 push */
  const handleSub = (body: IMessage) => {
    const json_body = JSON.parse(body.body);
    setChatList((_chat_list: ChatMessage[]) => [..._chat_list, json_body]);
  };

  /** 채팅 데이터를 destination에 publish */
  const handlePub = () => {
    if (!client.current?.connected) return;
    client.current.publish({
      destination: '/pub/chat',
      body: JSON.stringify({
        nickname: '상민',
        message,
        date: new Date().getTime(),
      }),
    });
    setMessage('');
  };

  const [connect, disconnect] = useStomp(client, 'sub_destination', handleSub);

  useEffect(() => {
    connect();
    /* 
      chatList 받아와서 setChatList 하는 로직 작성
    */
    return () => disconnect();
  }, []);

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
