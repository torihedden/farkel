import { useState } from 'react';

import { initialDice } from './constants';
import { rollDie } from './utils.ts';
import { scoreDice } from './Scoring/Scoring.ts';
import type { Die as D } from './Die/Die.ts';

import { Die } from './Die/Die.tsx';
import { Footer } from './Footer';
import { Scorecard } from './Scorecard/Scorecard';

import './App.css';
import { Bust } from './Bust.tsx';

const App = () => {
  // const [roundScore, setRoundScore] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [totalTurns, setTotalTurns] = useState(0);

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

  const removeDice = (dice: D[], diceToRemove: D[]): D[] => {
    return dice.filter((die) => !diceToRemove.find((d) => die.id === d.id));
  };

  const isDieInScoringCombo = (dice: D[], die: D): boolean => {
    return scoreDice(dice.filter((d) => d.id !== die.id)) < scoreDice(dice);
  };

  const selectedScore = scoreDice(selectedDice);
  const noValidScoringCombo: boolean = scoreDice(rollableDice) === 0;
  const hasValidScoringCombo: boolean = selectedScore !== 0;
  const areSelectedDiceValid: boolean = selectedDice.every((d) =>
    isDieInScoringCombo(selectedDice, d),
  );

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

      {isGameStarted && (
        <div className="dice-wrapper">
          {rollableDice.map((d) => (
            <Die
              die={d}
              onClick={() => {
                // TODO: make non-selectable when a bust
                toggleSelectDie(d);
              }}
              isSelected={selectedDice.includes(d)}
              key={d.id}
            />
          ))}
        </div>
      )}

      {noValidScoringCombo && isGameStarted && <Bust />}

      {isGameStarted && (
        <div className="buttons-wrapper">
          <button
            disabled={
              noValidScoringCombo ||
              !hasValidScoringCombo ||
              !areSelectedDiceValid
            }
            onClick={() => {
              setGameScore(gameScore + selectedScore);
              setRollableDice(removeDice(rollableDice, selectedDice));
              setSelectedDice([]);

              // setRollableDice(
              //   rollableDice.map((die) => ({ id: die.id, number: rollDie() })),
              // );

              console.log(rollableDice);
            }}
          >
            Score and roll again
          </button>
          <button
            disabled={
              noValidScoringCombo ||
              !hasValidScoringCombo ||
              !areSelectedDiceValid
            }
            onClick={() => setTotalTurns(totalTurns + 1)}
          >
            Score and pass
          </button>

          <button disabled>Pass turn</button>
        </div>
      )}

      {isGameStarted && (
        <Scorecard
          gameScore={gameScore}
          scoreRound={999}
          selectedScore={selectedScore}
          totalTurns={totalTurns}
        />
      )}

      <Footer />
    </>
  );
};

export default App;
