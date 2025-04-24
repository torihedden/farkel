import { useState } from 'react';

import { initialDice, WINNING_SCORE } from './constants';
import { rollDie } from './utils.ts';
import { scoreDice } from './Scoring/Scoring.ts';
import type { Die as D } from './Die/Die.ts';

import { Die } from './Die/Die.tsx';
import { Footer } from './Footer';
import { Scorecard } from './Scorecard/Scorecard';

import './App.css';
import { Bust } from './Bust.tsx';

const App = () => {
  const [roundScore, setRoundScore] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [totalTurns, setTotalTurns] = useState(0);

  const [rollableDice, setRollableDice] = useState(initialDice);
  const [selectedDice, setSelectedDice] = useState<D[]>([]);

  const [isGameStarted, setIsGameStarted] = useState(false);

  const isGameWon = gameScore >= WINNING_SCORE;

  const toggleSelectDie = (die: D) => {
    if (!selectedDice.includes(die)) {
      setSelectedDice([...selectedDice, die]);
    } else {
      setSelectedDice(selectedDice.filter((d) => d.id !== die.id));
    }
  };

  const flattenDiceToNumbers = (dice: Array<D>): number[] => {
    const nums: number[] = [];

    dice.map((d) => {
      nums.push(d.number);
    });

    return nums;
  };

  const removeDice = (dice: D[], diceToRemove: D[]): D[] => {
    return dice.filter((die) => !diceToRemove.find((d) => die.id === d.id));
  };

  const isDieInScoringCombo = (dice: D[], die: D): boolean => {
    return (
      scoreDice(flattenDiceToNumbers(dice.filter((d) => d.id !== die.id))) <
      scoreDice(flattenDiceToNumbers(dice))
    );
  };

  const selectedScore: number = scoreDice(flattenDiceToNumbers(selectedDice));
  const noValidScoringCombo: boolean =
    scoreDice(flattenDiceToNumbers(rollableDice)) === 0;
  const hasValidScoringCombo: boolean = selectedScore !== 0;
  const areSelectedDiceValid: boolean = selectedDice.every((d) =>
    isDieInScoringCombo(selectedDice, d),
  );
  const isBust: boolean =
    noValidScoringCombo && isGameStarted && rollableDice.length !== 0;

  const createNewFullDiceSet = () =>
    setRollableDice(
      initialDice.map((die) => ({ id: die.id, number: rollDie() })),
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
            );
            // Test roll for debugging
            // [
            //   { id: 'A', number: 2 },
            //   { id: 'B', number: 2 },
            //   { id: 'C', number: 3 },
            //   { id: 'D', number: 3 },
            //   { id: 'E', number: 4 },
            //   { id: 'F', number: 4 },
            // ],
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
              onClick={isBust ? () => {} : () => toggleSelectDie(d)}
              isSelected={selectedDice.includes(d)}
              isSelectable={!isBust}
              key={`${d.id}-${rollableDice.length}`}
            />
          ))}
        </div>
      )}

      {isBust && <Bust />}

      {isGameWon && (
        <div>
          <p>Congrats, you won!</p>
          <div>
            <button
              onClick={() => {
                setRoundScore(0);
                setGameScore(0);
                createNewFullDiceSet();
              }}
            >
              Start new game
            </button>
          </div>
        </div>
      )}

      {isGameStarted && (
        <div className="buttons-wrapper">
          <button
            disabled={
              noValidScoringCombo ||
              !hasValidScoringCombo ||
              !areSelectedDiceValid
            }
            onClick={() => {
              // TODO: if score validly all 6 dice, get 6 new dice and continue rolling/scoring

              // TODO: if bust, set round score to 0

              // if (isBust) setRoundScore(0)

              setRoundScore(roundScore + selectedScore);

              setRollableDice((d) => removeDice(d, selectedDice));

              setRollableDice((d) =>
                d.map((die) => ({ id: die.id, number: rollDie() })),
              );

              setSelectedDice([]);
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
            onClick={() => {
              setTotalTurns(totalTurns + 1);
              setGameScore(gameScore + roundScore + selectedScore);

              setSelectedDice([]);
              setRoundScore(0);

              createNewFullDiceSet();
            }}
          >
            Score and pass
          </button>

          <button
            disabled={!isBust}
            onClick={() => {
              setRoundScore(0);
              setSelectedDice([]);
              createNewFullDiceSet();
            }}
          >
            Pass turn
          </button>
        </div>
      )}

      {isGameStarted && (
        <Scorecard
          gameScore={gameScore}
          roundScore={roundScore}
          selectedScore={selectedScore}
          totalTurns={totalTurns}
        />
      )}

      {isGameStarted && (
        <div>
          <br />
          <button onClick={() => createNewFullDiceSet()}>
            Reset dice for debug/test
          </button>
        </div>
      )}

      <Footer />
    </>
  );
};

export default App;
