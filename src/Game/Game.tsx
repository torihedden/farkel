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
import { Bust } from '../Bust/Bust.tsx';
import { Win } from '../Win/Win.tsx';
import { Debug } from '../Debugging/Debugging.tsx';
import { Controls } from '../Controls/Controls.tsx';

import './Game.css';
import { Instructions } from '../Instructions/Instructions.tsx';

export const Game = (props: {
  currentPlayer: number;
  setCurrentPlayer: (arg: number) => void;
  multiGameScore: number[];
  setMultiGameScore: (arg: number[]) => void;
}) => {
  const { currentPlayer, setCurrentPlayer, multiGameScore, setMultiGameScore } =
    props;
  const [roundScore, setRoundScore] = useState(0);

  const [totalTurns, setTotalTurns] = useState(0);
  const [rollableDice, setRollableDice] = useState(initialDice);
  const [selectedDice, setSelectedDice] = useState<D[]>([]);

  const [showInstructions, setShowInstructions] = useState(false);

  const isGameWon =
    multiGameScore[
      multiGameScore.findIndex((score) => score >= WINNING_SCORE)
    ] >= WINNING_SCORE;

  const toggleSelectDie = (die: D) => {
    if (!selectedDice.includes(die)) {
      setSelectedDice([...selectedDice, die]);
    } else {
      setSelectedDice(selectedDice.filter((d) => d.id !== die.id));
    }
  };

  const changePlayer = (player: number) => {
    return player === 0 ? 1 : 0;
  };

  const updateGameScore = (
    player: number,
    score: number,
    prevScore: number,
  ) => {
    const updatedScores = multiGameScore.map((s, i) => {
      if (player === i) {
        return prevScore + score;
      } else return s;
    });

    return updatedScores;
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
      <h2>
        Player{' '}
        {isGameWon
          ? multiGameScore.findIndex((score) => score >= WINNING_SCORE) + 1
          : currentPlayer + 1}
      </h2>

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
              isValidDie={isDieInScoringCombo(selectedDice, d)}
            />
          ))}
        </div>
      )}

      {isBust ? <Bust /> : <div className="placeholder">.</div>}

      {isGameWon && (
        <Win
          resetGame={() => {
            setRoundScore(0);
            setMultiGameScore([0, 0]);
            createNewFullDiceSet();
            setCurrentPlayer(0);
          }}
        />
      )}

      {!isGameWon && (
        <Controls
          noValidScoringCombo={noValidScoringCombo}
          hasValidScoringCombo={hasValidScoringCombo}
          areSelectedDiceValid={areSelectedDiceValid}
          rollableDice={rollableDice}
          createNewFullDiceSet={() => createNewFullDiceSet()}
          rollAgain={() => {
            setRoundScore(roundScore + selectedScore);
            setRollableDice((d) => removeDice(d, selectedDice));
            setRollableDice((d) =>
              d.map((die) => ({ id: die.id, number: rollDie() })),
            );
            setSelectedDice([]);
          }}
          scoreAndPass={() => {
            setTotalTurns(totalTurns + 1);
            setMultiGameScore(
              updateGameScore(
                currentPlayer,
                roundScore + selectedScore,
                multiGameScore[currentPlayer],
              ),
            );

            setSelectedDice([]);
            setRoundScore(0);

            createNewFullDiceSet();
            setCurrentPlayer(changePlayer(currentPlayer));
          }}
          isBust={isBust}
          passTurn={() => {
            setTotalTurns(totalTurns + 1);
            setRoundScore(0);
            setSelectedDice([]);
            createNewFullDiceSet();
            setCurrentPlayer(changePlayer(currentPlayer));
          }}
        />
      )}

      <Scorecard
        gameScore={multiGameScore}
        roundScore={isBust ? 0 : roundScore}
        selectedScore={selectedScore}
      />

      {showInstructions && (
        <Instructions closeModal={() => setShowInstructions(false)} />
      )}

      {import.meta.env.VITE_TITLE === 'DEV' && (
        <Debug
          setSelectedDice={setSelectedDice}
          setRoundScore={setRoundScore}
          setGameScore={setMultiGameScore}
          createNewDice={createNewFullDiceSet}
          setTotalTurns={setTotalTurns}
        />
      )}

      <button onClick={() => setShowInstructions(true)}>Instructions</button>
      <Footer />
    </>
  );
};
