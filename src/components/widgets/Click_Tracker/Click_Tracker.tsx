// pages/click-tracker.js
import { useState } from 'react';

export default function ClickTracker() {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(clickCount + 1);
  };

  return (
    <div style={styles.container}>
      <div style={styles.counterDisplay}>
        Clicks: <span>{clickCount}</span>
      </div>
      <button style={styles.button} onClick={handleClick}>
        Click Me
      </button>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    marginTop: '50px',
  },
  counterDisplay: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
};
