import { useState } from 'react';
import { scoreRound } from './Scoring';

import './App.css';
import { Die } from './Die/Die';

const initialDice = [
  { id: 'A', number: 0 },
  { id: 'B', number: 0 },
  { id: 'C', number: 0 },
  { id: 'D', number: 0 },
  { id: 'E', number: 0 },
  { id: 'F', number: 0 },
];

function App() {
  const [gameScore, setGameScore] = useState(0);
  // const [roundScore, setRoundScore] = useState(0);

  const [dice, setDice] = useState<Array<Die>>(initialDice);
  // TODO: add third set, "ACTIVE DICE", instead of just subtracting held dice from all dice
  // const [activeDice, setActiveDice] = useState<Array<Die>>(initialDice);
  const [heldDice, setHeldDice] = useState<Array<string>>([]);
  const [scoredDice, setScoredDice] = useState<Array<string>>([]);

  const isInitialGameRoll =
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

    // setDice(currentDice);
    // return currentDice;
  };

  const getHeldDice = () => {
    return heldDice;
  };

  const addDieToHeldDice = (id: string) => {
    setHeldDice((dice) => [...dice, id]);
  };

  const removeDieFromHeldDice = (id: string) => {
    setHeldDice(heldDice.filter((i) => i !== id));
  };

  const addDieToScoredDice = (ids: Array<string>) => {
    // setScoredDice((dice) => [...dice, id]);
    setScoredDice(ids);
  };

  const getUnHeldDice = () => {
    return dice
      .filter((die) => !heldDice.includes(die.id))
      .filter((die) => !scoredDice.includes(die.id))
      .map((die) => die.id);
  };

  const getDie = (id: string) => dice.find((die) => die.id === id)!;

  return (
    <>
      <div className="wrapper">
        <button onClick={() => rollDice(getUnHeldDice())}>Roll</button>
      </div>

      <div className="dice-wrapper">
        {!isInitialGameRoll &&
          getUnHeldDice().map((id) => (
            <Die die={getDie(id)} onClick={() => addDieToHeldDice(id)} />
          ))}
      </div>
      <br />
      <hr />
      <div className="dice-wrapper">
        {getHeldDice().map((id) => (
          <Die die={getDie(id)} onClick={() => removeDieFromHeldDice(id)} />
        ))}
      </div>
      <div className="wrapper">
        <br />
        <div>
          <button
            onClick={() => {
              setGameScore(scoreRound(dice));
              addDieToScoredDice(heldDice);
              setHeldDice([]);
            }}
          >
            Score selected dice
          </button>
        </div>
        <br />
        <div>total game score: {gameScore}</div>
        <br />
        <div>scored/ineligible for further rolls dice:</div>
        <div className="dice-wrapper">
          {scoredDice.map((id) => (
            <Die die={getDie(id)} onClick={() => console.log('scored die')} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
