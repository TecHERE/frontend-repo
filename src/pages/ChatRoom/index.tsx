import React from 'react';
import style from './style.module.scss';

const ChatRoom = () => {
  return (
    <div className={style.container}>
      <div className={style.chatBox}>
        <ul className={style.chatList}>
          <li key="1">sa</li>
          <li key="1">sa</li>
          <li key="1">sa</li>
          <li key="1">sa</li>
          <li key="1">sa</li>
          <li key="1">sa</li>
          <li key="1">sa</li>
          <li key="1">sa</li>
          <li key="1">sa</li>
          <li key="1">sa</li>
          <li key="1">sa</li>
        </ul>
        <div className={style.messageInput}>
          <textarea className={style.chatInput} />
          <button className={style.chatSubmit}>전송</button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
