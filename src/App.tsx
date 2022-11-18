import './reset.scss';
import Calendar from '@/components/Calender';
import Router from './Router';
import NavBar from './components/Nav';

export default function App() {
  return (
    <div>
      <NavBar />
      <Calendar />
    </div>
  );
}
