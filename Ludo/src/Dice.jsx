import React from "react";

export default function Dice({
  value,
  rollDice,
  rolling,
}) {
  return (
    <div className="dice-wrapper">
      <div
        className={`dice ${
          rolling ? "rolling" : ""
        }`}
      >
        {value}
      </div>

      <button
        onClick={rollDice}
        disabled={rolling}
      >
        {rolling
          ? "Rolling..."
          : "Roll Dice"}
      </button>
    </div>
  );
}