import React, { useState, useEffect } from 'react';

function CurrentDate({ dT }) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
    // Format date to display
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleString('en-US', options);
  };

  const [currentDateTime1, setCurrentDateTime1] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime1(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const formatDate1 = (date) => {
    // Format date and time to display
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleString('en-US', options);
  };

  return (
    <div>
      {dT ? (
        <p className='para'>{formatDate1(currentDateTime1)}</p>
      ) : (
        <p className='heading golden-color'>{formatDate(currentDateTime)}</p>
      )}
    </div>
  );
}

export default CurrentDate;
