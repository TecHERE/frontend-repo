import './reset.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Enter from './pages/Enter';
import Room from './pages/Room';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Enter />} />
        <Route path="/room/:roomId" element={<Room />} />
      </Routes>
    </BrowserRouter>
  );
}
