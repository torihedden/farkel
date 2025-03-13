import { useState } from 'react';
import { scoreRound } from './Scoring/Scoring';

import './App.css';
import { Die } from './Die/Die';
import { initialDice, WINNING_SCORE } from './constants';

function App() {
  const [roundScore, setRoundScore] = useState(0);
  const [gameScore, setGameScore] = useState(0);

  const [dice, setDice] = useState<Array<Die>>(initialDice);
  // TODO: add third set, "ACTIVE DICE", instead of just subtracting held dice from all dice
  // const [activeDice, setActiveDice] = useState<Array<Die>>(initialDice);
  const [heldDice, setHeldDice] = useState<Array<string>>([]);
  const [scoredDice, setScoredDice] = useState<Array<string>>([]);

  const isInitialRoll =
    dice.every((d, _, arr) => d.number === arr[0].number) &&
    dice[0].number === 0;

  /** Takes one dice id and re-rolls the dice's (of that id) value */
  const rollDie = (id: string) => {
    const newDieValue = Math.floor(Math.random() * (6 - 1 + 1) + 1);

    setDice((dice) =>
      dice.map((die) =>
        die.id === id ? { ...die, number: newDieValue } : die,
      ),
    );
  };

  const rollDice = (ids: Array<string>) => {
    for (let i = 0; i < ids.length; i++) {
      rollDie(ids[i]);
    }
  };

  const addDieToHeldDice = (id: string) => {
    setHeldDice((dice) => [...dice, id]);
  };

  const removeDieFromHeldDice = (id: string) => {
    setHeldDice(heldDice.filter((i) => i !== id));
  };

  const addDieToScoredDice = (ids: Array<string>) =>
    ids.map((id) => setScoredDice((scoredDice) => [...scoredDice, id]));

  const getUnHeldDice = () => {
    return dice
      .filter((die) => !heldDice.includes(die.id))
      .filter((die) => !scoredDice.includes(die.id))
      .map((die) => die.id);
  };

  const getDie = (id: string) => dice.find((die) => die.id === id)!;

  const isBust = scoreRound(dice) === 0 && !isInitialRoll;

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

      <div className="dice-wrapper">
        {!isInitialRoll &&
          getUnHeldDice().map((id) => (
            <Die
              die={getDie(id)}
              onClick={() => (isBust ? () => undefined : addDieToHeldDice(id))}
              key={id}
            />
          ))}
      </div>
      <br />
      {isBust && <div>Bust! No viable scoring combinations.</div>}
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
            disabled={heldDice.length === 0}
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

      <div>
        There are many scoring and play variations of farkel. This version of
        farkel relies on the scoring rules{' '}
        <a href="https://kingdom-come-deliverance.fandom.com/wiki/Dice">
          found here
        </a>
        .
      </div>
    </>
  );
}

export default App;
