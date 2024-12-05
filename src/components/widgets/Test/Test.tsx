import React, { useEffect, useState } from 'react';

const RealTimeClock: React.FC = () => {
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div style={{ textAlign: 'center', fontSize: '2em', marginTop: '20px' }}>
      <h2>Real-Time Clock</h2>
      <p>{time}</p>
    </div>
  );
};

export default RealTimeClock;
