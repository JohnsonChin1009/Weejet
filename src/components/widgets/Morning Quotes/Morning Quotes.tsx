import { useState } from "react";

const quotes: string[] = [
  "Good morning! Start your day with a smile.",
  "Rise and shine, it's a beautiful morning!",
  "Every morning is a new beginning.",
  "A positive mindset is the key to a good day.",
  "Today is your opportunity to shine!",
  "Smile at the mirror each morning. It's contagious!",
  "Morning is a gift. Use it wisely.",
  "With the rising sun comes new hope.",
  "A cup of positivity is the best way to start your day.",
  "Don't wait for inspiration; create it this morning!",
  "Your potential is limitless every morning.",
  "Good things come to those who wake up early!",
  "Each sunrise is an invitation to brighten someone's day.",
  "Let gratitude be your wake-up call today.",
  "Start today with a grateful heart.",
  "Seize the morning, seize the day!",
  "Mornings are life's way of saying 'try again.'",
  "Think big, act bigger—good morning!",
  "Sunshine fuels your soul; let it in.",
  "Wishing you a productive and happy morning!",
];

export default function MorningQuotes() {
  const [quote, setQuote] = useState("Click the button for a random morning quote!");

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  return (
    <div style={styles.body}>
      <div style={styles.widget}>
        <div style={styles.quoteText}>{quote}</div>
        <button style={styles.button} onClick={getRandomQuote}>
          Get a Quote
        </button>
      </div>
    </div>
  );
}

const styles = {
  body: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center" as "center",
    margin: 0,
    padding: 0,
    backgroundColor: "#f0f8ff",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  widget: {
    padding: "20px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    width: "80%",
    maxWidth: "400px",
    textAlign: "center" as "center",
  },
  quoteText: {
    fontSize: "1.2rem",
    marginBottom: "20px",
    color: "#333",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
