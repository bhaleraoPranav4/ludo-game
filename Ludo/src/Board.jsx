import React from "react";
import "./Board.css";
import PATH from "./path.js";

export default function Board({
  tokens,
  currentPlayer,
  selectedToken,
  setSelectedToken,
}) {
  const safeCells = [
    "6-1",
    "1-8",
    "8-13",
    "13-6",
  ];

  const playerColors = {
    RED: "red",
    GREEN: "green",
    YELLOW: "yellow",
    BLUE: "blue",
  };

  const cells = [];

  for (let row = 0; row < 15; row++) {
    for (let col = 0; col < 15; col++) {
      let className = "cell";

      // Home Areas
      if (row < 6 && col < 6) {
        className += " red-home";
      } else if (row < 6 && col > 8) {
        className += " green-home";
      } else if (row > 8 && col < 6) {
        className += " blue-home";
      } else if (row > 8 && col > 8) {
        className += " yellow-home";
      } else if (
        row >= 6 &&
        row <= 8 &&
        col >= 6 &&
        col <= 8
      ) {
        className += " center-home";
      }

      // Path Cells
      const isPathCell = PATH.some(
        (p) => p.row === row && p.col === col
      );

      if (isPathCell) {
        className += " path-cell";
      }

      // Safe Cells
      if (safeCells.includes(`${row}-${col}`)) {
        className += " safe-cell";
      }

      cells.push(
        <div
          key={`${row}-${col}`}
          className={className}
        >
          {/* RED HOME TOKENS */}
          {tokens.RED[0] === -1 &&
            row === 2 &&
            col === 2 && (
              <div className="token red"></div>
            )}

          {tokens.RED[1] === -1 &&
            row === 2 &&
            col === 4 && (
              <div className="token red"></div>
            )}

          {tokens.RED[2] === -1 &&
            row === 4 &&
            col === 2 && (
              <div className="token red"></div>
            )}

          {tokens.RED[3] === -1 &&
            row === 4 &&
            col === 4 && (
              <div className="token red"></div>
            )}

          {/* GREEN HOME TOKENS */}
          {tokens.GREEN[0] === -1 &&
            row === 2 &&
            col === 10 && (
              <div className="token green"></div>
            )}

          {tokens.GREEN[1] === -1 &&
            row === 2 &&
            col === 12 && (
              <div className="token green"></div>
            )}

          {tokens.GREEN[2] === -1 &&
            row === 4 &&
            col === 10 && (
              <div className="token green"></div>
            )}

          {tokens.GREEN[3] === -1 &&
            row === 4 &&
            col === 12 && (
              <div className="token green"></div>
            )}

          {/* BLUE HOME TOKENS */}
          {tokens.BLUE[0] === -1 &&
            row === 10 &&
            col === 2 && (
              <div className="token blue"></div>
            )}

          {tokens.BLUE[1] === -1 &&
            row === 10 &&
            col === 4 && (
              <div className="token blue"></div>
            )}

          {tokens.BLUE[2] === -1 &&
            row === 12 &&
            col === 2 && (
              <div className="token blue"></div>
            )}

          {tokens.BLUE[3] === -1 &&
            row === 12 &&
            col === 4 && (
              <div className="token blue"></div>
            )}

          {/* YELLOW HOME TOKENS */}
          {tokens.YELLOW[0] === -1 &&
            row === 10 &&
            col === 10 && (
              <div className="token yellow"></div>
            )}

          {tokens.YELLOW[1] === -1 &&
            row === 10 &&
            col === 12 && (
              <div className="token yellow"></div>
            )}

          {tokens.YELLOW[2] === -1 &&
            row === 12 &&
            col === 10 && (
              <div className="token yellow"></div>
            )}

          {tokens.YELLOW[3] === -1 &&
            row === 12 &&
            col === 12 && (
              <div className="token yellow"></div>
            )}

          {/* MOVING TOKENS */}
          {Object.keys(tokens).map((player) =>
            tokens[player].map((pos, index) => {
              if (
                pos >= 0 &&
                PATH[pos] &&
                PATH[pos].row === row &&
                PATH[pos].col === col
              ) {
                return (
                  <div
                    key={`${player}-${index}`}
                    className={`token ${
                      playerColors[player]
                    } ${
                      player === currentPlayer &&
                      selectedToken === index
                        ? "selected-token"
                        : ""
                    }`}
                    onClick={() => {
                      if (
                        player === currentPlayer
                      ) {
                        setSelectedToken(index);
                      }
                    }}
                  />
                );
              }

              return null;
            })
          )}

          {/* CENTER STAR */}
          {row === 7 && col === 7 && (
            <div className="center-star">
              ★
            </div>
          )}
        </div>
      );
    }
  }

  return (
    <div className="board">
      {cells}
    </div>
  );
}