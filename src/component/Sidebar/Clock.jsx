import React from 'react';
import './Clock.css';

const Clock = () => {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  const hourDeg = ((hours % 12) + minutes / 60) * 30;
  const minuteDeg = (minutes + seconds / 60) * 6;
  const secondDeg = seconds * 6;

  return (
    <div className="clock">
      <div className="hour" style={{ transform: `rotate(${hourDeg}deg)` }}></div>
      <div className="minute" style={{ transform: `rotate(${minuteDeg}deg)` }}></div>
      <div className="second" style={{ transform: `rotate(${secondDeg}deg)` }}></div>
    </div>
  );
};

export default Clock;
