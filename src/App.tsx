import { useState } from 'react';

import { initialDice } from './constants';
import { rollDie } from './utils.ts';
import { scoreDice } from './Scoring/Scoring.ts';
import type { Die as D } from './Die/Die.ts';

import { Die } from './Die/Die.tsx';
import { Footer } from './Footer';
// import { Scorecard } from './Scorecard/Scorecard';

import './App.css';

const App = () => {
  const [selectedScore, setSelectedScore] = useState(0);
  // const [roundScore, setRoundScore] = useState(0);
  // const [gameScore, setGameScore] = useState(0);

  const [rollableDice, setRollableDice] = useState(initialDice);
  const [selectedDice, setSelectedDice] = useState<D[]>([]);

  const [isGameStarted, setIsGameStarted] = useState(false);

  const toggleSelectDie = (die: D) => {
    if (!selectedDice.includes(die)) {
      setSelectedDice([...selectedDice, die]);
    } else {
      setSelectedDice(selectedDice.filter((d) => d.id !== die.id));
    }
  };

  const noValidScoringCombo: boolean = scoreDice(rollableDice) === 0;

  const hasValidScoreButNotSelectedYet: boolean =
    scoreDice(rollableDice) !== 0 && selectedDice.length === 0;

  // const hasValidScoreButInvalidDieSelected: boolean =
  //   scoreDice(selectedDice) === 0 && selectedDice.length > 0;

  // TODO: detect if an extraneous/non-scoring die has been selected
  // even if there are otherwise valid scoring sets in the selection
  // and disabled SARA & SAP buttons

  return (
    <>
      <h1>Farkel</h1>

      {!isGameStarted && (
        <button
          onClick={() => {
            setIsGameStarted(true);
            setRollableDice(
              rollableDice.map((die) => ({ id: die.id, number: rollDie() })),

              // Test roll for debugging
              // [
              //   { id: 'A', number: 2 },
              //   { id: 'B', number: 2 },
              //   { id: 'C', number: 3 },
              //   { id: 'D', number: 3 },
              //   { id: 'E', number: 4 },
              //   { id: 'F', number: 4 },
              // ],
            );
          }}
        >
          Begin game
        </button>
      )}

      {noValidScoringCombo && isGameStarted && (
        <div>Bust! No valid scoring combinations.</div>
      )}

      {isGameStarted && (
        <div className="dice-wrapper">
          {rollableDice.map((d) => (
            <Die
              die={d}
              onClick={() => {
                // TODO: make non-selectable when a bust
                toggleSelectDie(d);
                setSelectedScore(scoreDice(selectedDice));
              }}
              isSelected={selectedDice.includes(d)}
              key={d.id}
            />
          ))}
        </div>
      )}

      {isGameStarted && (
        <div>
          <button
            disabled={noValidScoringCombo || hasValidScoreButNotSelectedYet}
          >
            Score and roll again
          </button>
          <button
            disabled={noValidScoringCombo || hasValidScoreButNotSelectedYet}
          >
            Score and pass
          </button>
        </div>
      )}

      <div>Selected score: {isGameStarted && selectedScore}</div>

      {/* <Scorecard /> */}

      <Footer />
    </>
  );
};

export default App;
