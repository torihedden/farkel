import { useState } from 'react';
import { scoreRound } from './Scoring/Scoring';

import './App.css';
import { Die, ValidId } from './Die/Die';
import { initialDice, WINNING_SCORE } from './constants';
import { Bust } from './Bust';
import { Footer } from './Footer';
import { isInitialRoll } from './utils';

const App = () => {
  const [roundScore, setRoundScore] = useState(0);
  const [gameScore, setGameScore] = useState(0);

  const [dice, setDice] = useState<Array<Die>>(initialDice);
  const [heldDice, setHeldDice] = useState<Array<ValidId>>([]);
  const [scoredDice, setScoredDice] = useState<Array<ValidId>>([]);

  const getUnHeldDice = () => {
    return dice
      .filter((die) => !heldDice.includes(die.id))
      .filter((die) => !scoredDice.includes(die.id))
      .map((die) => die.id);
  };

  const activeDice = getUnHeldDice();

  /** Takes one dice id and re-rolls the dice's (of that id) value */
  const rollDie = (id: ValidId) => {
    const newDieValue = Math.floor(Math.random() * (6 - 1 + 1) + 1);

    setDice((dice) =>
      dice.map((die) =>
        die.id === id ? { ...die, number: newDieValue } : die,
      ),
    );
  };

  // TODO: add handling for special/loaded/ability dice

  const rollDice = (ids: Array<ValidId>) => {
    for (let i = 0; i < ids.length; i++) {
      rollDie(ids[i]);
    }
  };

  const addDieToHeldDice = (id: ValidId) => {
    setHeldDice((dice) => [...dice, id]);
  };

  const removeDieFromHeldDice = (id: ValidId) => {
    setHeldDice(heldDice.filter((i) => i !== id));
  };

  const addDieToScoredDice = (ids: Array<ValidId>) =>
    ids.map((id) => setScoredDice((scoredDice) => [...scoredDice, id]));

  const getDie = (id: ValidId) => dice.find((die) => die.id === id)!;

  const isBust =
    scoreRound(activeDice.map((d) => getDie(d))) === 0 &&
    heldDice.length === 0 &&
    !isInitialRoll(dice);

  // TODO: add game flow where if at any point you bust,
  // the round score is set to 0 and your turn is over

  // TODO: consider splitting out active, held, and scored into sep components and move dedicated/salient logic to each one
  return (
    <>
      <div className="wrapper">
        <button
          onClick={() => {
            rollDice(getUnHeldDice());
          }}
          disabled={heldDice.length > 0}
        >
          Roll
        </button>
      </div>
      active dice below:
      <div className="dice-wrapper">
        {!isInitialRoll(dice) &&
          activeDice.map((id) => (
            <Die
              die={getDie(id)}
              onClick={() => (isBust ? () => undefined : addDieToHeldDice(id))}
              key={id}
            />
          ))}
      </div>
      <div className="wrapper">{isBust && <Bust />}</div>
      <hr />
      <div className="dice-wrapper">
        {heldDice.map((id) => (
          <Die
            die={getDie(id)}
            onClick={() => removeDieFromHeldDice(id)}
            key={id}
          />
        ))}
      </div>
      <div className="wrapper">
        <br />
        <div>
          <button
            onClick={() => {
              setRoundScore(scoreRound(heldDice.map((d) => getDie(d))));
              addDieToScoredDice(heldDice);
              setHeldDice([]);
            }}
            disabled={
              heldDice.length === 0 ||
              scoreRound(heldDice.map((d) => getDie(d))) === 0
            }
          >
            Score selected dice
          </button>
        </div>
        <br />
        <hr />
        <div>round score: {roundScore}</div>
        <br />
        <div className="dice-wrapper">
          {scoredDice.map((id) => (
            <Die die={getDie(id)} onClick={() => undefined} key={id} />
          ))}
        </div>
        <br />

        {/* TODO: separate out each turn's rolls so it's more clear
          which set of selected/held die is which */}
        <button
          onClick={() => {
            setGameScore(gameScore + roundScore);
            setDice(initialDice);
            setHeldDice([]);
            setScoredDice([]);
            setRoundScore(0);
          }}
          disabled={roundScore === 0}
        >
          End turn and score
        </button>
        <br />
        <br />
        <div>
          game score: {gameScore} / {WINNING_SCORE}
        </div>
      </div>
      <br />
      <Footer />
    </>
  );
};

export default App;
