import React, { useState } from "react";
import Board from "./Board";
import Dice from "./Dice";
import "./App.css";

const PLAYERS = ["RED", "GREEN", "YELLOW", "BLUE"];

const START_POSITIONS = {
  RED: 0,
  GREEN: 13,
  YELLOW: 26,
  BLUE: 39,
};

export default function App() {
  const [diceValue, setDiceValue] = useState(1);

  const [currentPlayer, setCurrentPlayer] =
    useState(0);

  const [selectedToken, setSelectedToken] =
    useState(0);

  const [tokens, setTokens] = useState({
    RED: [-1, -1, -1, -1],
    GREEN: [-1, -1, -1, -1],
    YELLOW: [-1, -1, -1, -1],
    BLUE: [-1, -1, -1, -1],
  });

  const rollDice = () => {
    const value =
      Math.floor(Math.random() * 6) + 1;

    setDiceValue(value);

    const player =
      PLAYERS[currentPlayer];

    setTokens((prev) => {
      const updated = { ...prev };

      const playerTokens = [
        ...updated[player],
      ];

      // Token Home मध्ये आहे
      if (
        playerTokens[selectedToken] === -1
      ) {
        if (value === 6) {
          playerTokens[selectedToken] =
            START_POSITIONS[player];
        }
      } else {
        const nextPos = Math.min(
          playerTokens[selectedToken] +
            value,
          51
        );

        playerTokens[selectedToken] =
          nextPos;

        // Winner
        if (nextPos === 51) {
          setTimeout(() => {
            alert(
              `🏆 ${player} Wins!`
            );
          }, 100);
        }

        // Kill Logic
        Object.keys(updated).forEach(
          (enemyPlayer) => {
            if (
              enemyPlayer === player
            )
              return;

            updated[enemyPlayer] =
              updated[
                enemyPlayer
              ].map((enemyPos) => {
                const safePositions =
                  [
                    0, 13, 26, 39,
                  ];

                if (
                  enemyPos ===
                    nextPos &&
                  !safePositions.includes(
                    nextPos
                  )
                ) {
                  return -1;
                }

                return enemyPos;
              });
          }
        );
      }

      updated[player] = playerTokens;

      return updated;
    });

    // Turn Change
    if (value !== 6) {
      setCurrentPlayer(
        (prev) => (prev + 1) % 4
      );
    }
  };

  return (
    <div className="app">
      <h1>🎲 Ludo Game</h1>

      <div className="turn-box">
        Current Player :
        <span
          style={{
            color:
              PLAYERS[
                currentPlayer
              ].toLowerCase(),
            marginLeft: "10px",
            fontWeight: "bold",
          }}
        >
          {PLAYERS[currentPlayer]}
        </span>
      </div>

      <div className="players-status">
        <h3>Players Status</h3>

        <p>
          🔴 RED :
          {tokens.RED.join(" | ")}
        </p>

        <p>
          🟢 GREEN :
          {tokens.GREEN.join(
            " | "
          )}
        </p>

        <p>
          🟡 YELLOW :
          {tokens.YELLOW.join(
            " | "
          )}
        </p>

        <p>
          🔵 BLUE :
          {tokens.BLUE.join(
            " | "
          )}
        </p>

        <h3>
          Selected Token :
          {selectedToken + 1}
        </h3>
      </div>

      <Board
        tokens={tokens}
        currentPlayer={
          PLAYERS[currentPlayer]
        }
        selectedToken={
          selectedToken
        }
        setSelectedToken={
          setSelectedToken
        }
      />

      <Dice
        value={diceValue}
        rollDice={rollDice}
      />
    </div>
  );
}