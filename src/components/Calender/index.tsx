import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays } from 'date-fns';
import './style.scss';
const RenderHeader = ({ currentMonth, prevMonth, nextMonth }: any) => {
  return (
    <div className="header">
      <div className="header_left">
        <span className="header_left_text">
          <span className=" year"> {format(currentMonth, 'yyyy')}년</span>
          <span className=" month">{format(currentMonth, 'M')}월</span>
        </span>
      </div>
      <div className="header_right">
        <div onClick={prevMonth}>
          <img src="img/왼쪽.png"></img>
        </div>
        <div onClick={nextMonth}>
          <img src="img/오른쪽.png"></img>
        </div>
      </div>
    </div>
  );
};

const RenderDays = () => {
  const days = [];
  const date = ['일', '월', '화', '수', '목', '금', '토'];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col" key={i}>
        {date[i]}
      </div>,
    );
  }

  return <div className="days">{days}</div>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick }: any) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days: any = [];
  let day: any = startDate;
  let formattedDate: any = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      const cloneDay: any = day;
      days.push(
        <div>
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? 'disabled'
                : isSameDay(day, selectedDate)
                ? 'selected'
                : format(currentMonth, 'M') !== format(day, 'M')
                ? 'not-valid'
                : 'valid'
            }`}
            key={day}
            onClick={() => onDateClick(cloneDay)}
          ></div>
          <div
            className={`
            ${
              !isSameMonth(day, monthStart)
                ? 'disabled'
                : format(currentMonth, 'M') !== format(day, 'M')
                ? 'text not-valid'
                : 'text'
            }
            `}
          >
            {formattedDate}
          </div>
        </div>,
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>,
    );
    days = [];
  }
  return <div className="body">{rows}</div>;
};

const Calender = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day) => {
    day = JSON.parse(day);
    setSelectedDate(day);
  };
  return (
    <div className="calendar">
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <RenderDays />
      <RenderCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
      />
    </div>
  );
};
export default Calender;
