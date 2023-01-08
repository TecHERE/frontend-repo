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
    author: '상민',
    content: '안녕하세요',
    date: new Date('2022-11-20 22:12'),
  },
  {
    author: '승환',
    content: '안녕하세요~~~!!',
    date: new Date('2022-11-20 22:14'),
  },
  {
    author: '호병',
    content: '안녕하십니까 !!',
    date: new Date('2022-11-20 22:29'),
  },
  {
    author: '상민',
    content: '반가워요 !',
    date: new Date('2022-11-20 23:34'),
  },
];

export default function Room() {
  const { VITE_PUBLISH_URL, VITE_SUBSCRIBE_URL } = import.meta.env;
  const { roomId } = useParams();
  const { author } = useLocation().state;
  const chatListRef = useRef<HTMLUListElement>(null);

  /** 채팅 히스토리 리스트를 담을 state */
  const [chatList, setChatList] = useState(DUMMY_CHAT);
  const [content, onChatInput, setContent] = useInput('');

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
      destination: VITE_PUBLISH_URL,
      body: JSON.stringify({
        author: '상민',
        content,
        // date: new Date().getTime(),
      }),
    });
    setContent('');
  };

  const [connect, disconnect] = useStomp(client, VITE_SUBSCRIBE_URL, handleSub);

  useEffect(() => {
    connect();
    /* 
      TODO: chatList 받아와서 setChatList 하는 로직 작성
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
              {chat.author === author ? (
                <MyMessage
                  author={chat.author}
                  content={chat.content}
                  date={chat.date || new Date()}
                />
              ) : (
                <OthersMessage
                  author={chat.author}
                  content={chat.content}
                  date={chat.date || new Date()}
                />
              )}
            </li>
          ))}
        </ul>
        <div className={styles.messageInput}>
          <textarea
            className={styles.chatInput}
            value={content}
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
