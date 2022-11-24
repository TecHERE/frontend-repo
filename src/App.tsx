import './reset.scss';
import Enter from '@/pages/Enter';
import ChatRoom from '@/pages/ChatRoom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Enter />} />
        <Route path="/room" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}
