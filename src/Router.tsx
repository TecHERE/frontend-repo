import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Calendar from './components/Calender';
import ChatRoom from './page/ChatRoom';
import Entrance from './page/Entrance';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Entrance />}></Route>
        <Route path="/:id" element={<ChatRoom />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
