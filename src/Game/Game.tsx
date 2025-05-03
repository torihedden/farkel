import { useEffect, useState } from 'react';
import { initialDice, WINNING_SCORE } from '../constants';
import { rollDie } from '../utils.ts';
import {
  flattenDiceToNumbers,
  isDieInScoringCombo,
  removeDice,
} from './gameUtils.ts';
import { scoreDice } from '../Scoring/Scoring.ts';
import type { Die as D } from '../Die/Die.ts';

import { Die } from '../Die/Die.tsx';
import { Footer } from '../Footer/Footer';
import { Scorecard } from '../Scorecard/Scorecard';
import { Bust } from '../Bust';
import { Win } from '../Win/Win.tsx';

export const Game = () => {
  const [roundScore, setRoundScore] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [totalTurns, setTotalTurns] = useState(0);

  const [rollableDice, setRollableDice] = useState(initialDice);
  const [selectedDice, setSelectedDice] = useState<D[]>([]);

  const isGameWon = gameScore >= WINNING_SCORE;

  const toggleSelectDie = (die: D) => {
    if (!selectedDice.includes(die)) {
      setSelectedDice([...selectedDice, die]);
    } else {
      setSelectedDice(selectedDice.filter((d) => d.id !== die.id));
    }
  };

  const selectedScore: number = scoreDice(flattenDiceToNumbers(selectedDice));
  const noValidScoringCombo: boolean =
    scoreDice(flattenDiceToNumbers(rollableDice)) === 0;
  const hasValidScoringCombo: boolean = selectedScore !== 0;
  const areSelectedDiceValid: boolean = selectedDice.every((d) =>
    isDieInScoringCombo(selectedDice, d),
  );
  const isBust: boolean = noValidScoringCombo && rollableDice.length !== 0;

  const createNewFullDiceSet = () => {
    setRollableDice(
      initialDice.map((die) => ({ id: die.id, number: rollDie() })),
    );
  };

  useEffect(() => {
    setRollableDice(
      rollableDice.map((die) => ({ id: die.id, number: rollDie() })),
    );
  }, []);

  return (
    <>
      {!isGameWon && (
        <div className="dice-wrapper">
          {rollableDice.map((d) => (
            <Die
              die={d}
              onClick={
                isBust || isGameWon ? () => {} : () => toggleSelectDie(d)
              }
              isSelected={selectedDice.includes(d)}
              isDisabled={isGameWon || isBust}
              key={`${d.id}-${rollableDice.length}-${totalTurns}`}
            />
          ))}
        </div>
      )}

      {isBust && <Bust />}

      {isGameWon && (
        <Win
          setRoundScore={setRoundScore}
          setGameScore={setGameScore}
          createNewDice={createNewFullDiceSet}
        />
      )}

      <div className="buttons-wrapper">
        <button
          disabled={
            noValidScoringCombo ||
            !hasValidScoringCombo ||
            !areSelectedDiceValid
          }
          onClick={() => {
            setRoundScore(roundScore + selectedScore);

            setRollableDice((d) => removeDice(d, selectedDice));

            setRollableDice((d) =>
              d.map((die) => ({ id: die.id, number: rollDie() })),
            );

            setSelectedDice([]);
          }}
        >
          Roll again
        </button>

        {rollableDice.length === 0 && <>{createNewFullDiceSet()}</>}

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
            setTotalTurns(totalTurns + 1);
            setRoundScore(0);
            setSelectedDice([]);
            createNewFullDiceSet();
          }}
        >
          Pass turn
        </button>
      </div>

      <Scorecard
        gameScore={gameScore}
        roundScore={isBust ? 0 : roundScore}
        selectedScore={selectedScore}
        totalTurns={totalTurns}
      />

      <div className="debugging-buttons">
        <br />
        <button onClick={() => createNewFullDiceSet()}>Reset dice</button>
        <button
          onClick={() => {
            setSelectedDice([]);
            setRoundScore(0);
            setGameScore(0);
            setTotalTurns(0);
          }}
        >
          Reset all scores
        </button>
      </div>

      <Footer />
    </>
  );
};
