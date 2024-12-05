import React, { useState } from "react";
import "./calculator.css";
import buttonConfig from "./buttons.json";

export const CalculatorWidget: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const handleInput = (value: string) => {
    setInput((prev) => prev + value);
  };

  const clearInput = () => {
    setInput("");
    setResult("");
  };

  const calculateResult = () => {
    try {
      // Safely evaluate the input expression
      setResult(eval(input).toString());
    } catch (error) {
      setResult("Error");
    }
  };

  return (
    <div className="calculator-widget">
      <h3>Calculator</h3>
      <div className="calculator-display">
        <input type="text" value={input} readOnly />
        <input type="text" value={result} readOnly placeholder="Result" />
      </div>
      <div className="calculator-buttons">
        {buttonConfig.buttons.map((button) => (
          <button
            key={button}
            onClick={() =>
              button === "=" ? calculateResult() : handleInput(button)
            }
          >
            {button}
          </button>
        ))}
        <button className="clear-button" onClick={clearInput}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default CalculatorWidget;
