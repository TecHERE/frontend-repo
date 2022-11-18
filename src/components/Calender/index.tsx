import React, { useState } from 'react';

const Calendar = () => {
  //현재달
  const [currentMonth, setCurrentMonth] = useState(new Date());
  //선택된 날짜
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="calendar">
      <div className="header">Header</div>
      <div className="days">Days</div>
      <div className="body">Cells</div>
    </div>
  );
};

export default Calendar;
