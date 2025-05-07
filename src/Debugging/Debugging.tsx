import { useState } from 'react';
import './Debugging.css';

export const Debug = (props: {
  setSelectedDice: (arg: []) => void;
  setRoundScore: (arg: number) => void;
  setGameScore: (arg: number[]) => void;
  createNewDice: () => void;
  setTotalTurns: (arg: number) => void;
}) => {
  const {
    setSelectedDice,
    setRoundScore,
    setGameScore,
    createNewDice,
    setTotalTurns,
  } = props;

  const [showDebug, setShowDebug] = useState(false);

  return (
    <div>
      <label>
        Show debugging
        <input
          type="checkbox"
          checked={showDebug}
          onChange={() => setShowDebug(!showDebug)}
        />
      </label>
      {showDebug && (
        <div className="debugging-buttons">
          <button onClick={() => createNewDice()}>Re-roll dice</button>
          <button
            onClick={() => {
              setSelectedDice([]);
              setRoundScore(0);
              setGameScore([0, 0]);
              setTotalTurns(0);
            }}
          >
            Reset all scores
          </button>
        </div>
      )}
      <br />
      <br />
    </div>
  );
};
