import React, { useState, useEffect } from "react";

interface Event {
  id: number;
  title: string;
  date: string; // Use ISO format (e.g., "2024-12-25")
}

const Countdown: React.FC = () => {
  const events: Event[] = [
    { id: 1, title: "Christmas", date: "2024-12-25" },
    { id: 2, title: "New Year", date: "2025-01-01" },
    { id: 3, title: "My Birthday", date: "2025-03-15" },
  ];

  const calculateDaysLeft = (eventDate: string): number => {
    const now = new Date();
    const event = new Date(eventDate);
    const difference = event.getTime() - now.getTime();
    return Math.ceil(difference / (1000 * 60 * 60 * 24));
  };

  const [countdownData, setCountdownData] = useState(
    events.map(event => ({
      ...event,
      daysLeft: calculateDaysLeft(event.date),
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdownData(prevData =>
        prevData.map(event => ({
          ...event,
          daysLeft: calculateDaysLeft(event.date),
        }))
      );
    }, 1000 * 60 * 60 * 24);

    return () => clearInterval(interval);
  }, [events]);

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      textAlign: "center" as const,
      padding: "20px",
      backgroundColor: "#f4f4f9",
      minHeight: "100vh",
    },
    title: {
      fontSize: "2.5rem",
      color: "#333",
      marginBottom: "20px",
    },
    list: {
      listStyleType: "none" as const,
      padding: 0,
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
    },
    listItem: {
      backgroundColor: "#ffffff",
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "15px 20px",
      margin: "10px 0",
      width: "90%",
      maxWidth: "400px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
    listItemHover: {
      transform: "scale(1.05)",
      boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
    },
    eventTitle: {
      fontSize: "1.5rem",
      color: "#555",
      marginBottom: "5px",
    },
    eventDays: {
      fontSize: "1rem",
      color: "#888",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Event Countdown</h1>
      <ul style={styles.list}>
        {countdownData.map(event => (
          <li
            key={event.id}
            style={styles.listItem}
            onMouseEnter={e =>
              (e.currentTarget.style.transform = styles.listItemHover.transform!)
            }
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={styles.eventTitle}>{event.title}</h3>
            <p style={styles.eventDays}>
              {event.daysLeft > 0
                ? `${event.daysLeft} day(s) left`
                : event.daysLeft === 0
                ? "Today!"
                : "Event has passed"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Countdown;
