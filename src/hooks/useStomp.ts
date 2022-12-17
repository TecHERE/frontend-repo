import { Client, messageCallbackType } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';

const useStomp = (
  client: React.MutableRefObject<Client | undefined>,
  destination: string,
  callback: messageCallbackType,
) => {
  const connect = () => {
    client.current = new Client({
      /**
        sock.js 모듈로 stomp protocol을 연결하는 코드
        핸드쉐이크할 endpoint를 webpack-dev-server의 proxy 서버 target값과 일치시켜 요청하도록 셋팅
       */
      // webSocketFactory: () =>
      //   new SockJS(
      //     '/ws-stomp',
      //     {},
      //     {
      //       transports: ['xhr-polling'], // 서버에서 websocket이 사용이 불가할 경우 대체하여 통신에 쓰일 프로토콜을 http long polling으로 설정
      //     },
      //   ),
      brokerURL: 'ws://브로커URL',
      reconnectDelay: 200000,
      heartbeatIncoming: 16000,
      heartbeatOutgoing: 16000,
      onConnect: () => {
        console.error('0 stomp onConnect : ');
        client.current?.subscribe(destination, callback);
      },
      onStompError: (frame) => {
        console.error('1 stomp error : ', frame);
      },
      onDisconnect: (frame) => {
        console.error('2 disconnect : ', frame);
      },
      onWebSocketClose: (frame) => {
        console.log('3 Stomp WebSocket Closed', frame);
      },
      debug: function (str) {
        console.error('4 debug : ', str);
      },
      onUnhandledMessage: (msg) => {
        console.log('5 unhandled Message', msg);
      },
    });

    client.current?.activate();
  };

  const disconnect = () => {
    client.current?.deactivate();
  };

  return [connect, disconnect];
};

export default useStomp;
