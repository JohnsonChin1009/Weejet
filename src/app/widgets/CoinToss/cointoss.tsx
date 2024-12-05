import { useState } from "react";

export default function CoinToss() {
  const [choice, setChoice] = useState("");
  const [result, setResult] = useState("");

  const truthQuestions = [
    "what's your biggest fear?",
    "what's the most embarrassing thing you've ever done?",
    "have you ever lied to your best friend?",
    "what's the deepest secret that no one knows about you?",
    "name one thing that you hate about your life.",
    "what’s the biggest secret you’ve kept from your parents?",
    "what’s the most embarrassing music you listen to?",
    "what's your biggest pet peeve?",
  ];

  const dareChallenges = [
    "do 20 push-ups.",
    "sing a song out loud.",
    "text the first person in your contacts 'I love pineapple pizza!'",
    "call your crush and tell her you love her.",
    "call your girlfriend and tell her that you are breaking up with her.",
    "smell another player's armpit.",
    "call a friend, pretend it's their birthday, and sing them Happy Birthday to You.",
    "do your sassiest runway walk.",
  ];

  const getRandomQuestion = (questions: string[]): string => {
    const index = Math.floor(Math.random() * questions.length);
    return questions[index];
  };

  const tossCoin = () => {
    if (choice !== "truth" && choice !== "dare") {
      setResult("Please enter 'truth' or 'dare'.");
      return;
    }

    const tossResult = Math.random() < 0.5 ? "truth" : "dare";

    if (choice === tossResult) {
      setResult(
        `You got ${tossResult}! ${getRandomQuestion(
          tossResult === "truth" ? truthQuestions : dareChallenges
        )}`
      );
    } else {
      setResult(`You got ${tossResult}, not ${choice}. Try again!`);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial, sans-serif" }}>
      <h1>CoinToss</h1>
      <label htmlFor="choice">Choose (truth/dare): </label>
      <input
        id="choice"
        type="text"
        placeholder="truth or dare"
        value={choice}
        onChange={(e) => setChoice(e.target.value.toLowerCase().trim())}
        style={{ marginLeft: "10px", padding: "5px", borderRadius: "4px", border: "1px solid #ccc" }}
      />
      <div
        onClick={tossCoin}
        style={{
          width: "100px",
          height: "100px",
          background: "linear-gradient(to bottom, #f9d423, #ff4e50)",
          borderRadius: "50%",
          margin: "20px auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        }}
      >
        Toss
      </div>
      <div style={{ marginTop: "20px", fontSize: "1.2rem", color: "#333" }}>{result}</div>
    </div>
  );
}
