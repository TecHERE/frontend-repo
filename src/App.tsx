import './reset.scss';
import Calendar from '@/components/Calender';
import Router from './Router';
import NavBar from './components/Nav';
import TodoList from './components/TodoList';
import Timer from './components/Timer';
import './styles.scss';
export default function App() {
  return (
    <div>
      <NavBar />
      <div className="Body">
        <div className="Body_left">
          <Calendar />
          <Timer />
        </div>
        <div className="Body_right">
          <TodoList />
        </div>
      </div>
    </div>
  );
}
