import { useState } from 'react';
import './App.css';
import { Dice } from './Dice';
import { scoreRound } from './Scoring';

export type Die = {
  id: string;
  number: number;
  held: boolean;
};

function App() {
  const [gameScore, setGameScore] = useState(0);
  // const [roundScore, setRoundScore] = useState(0);
  const [dice, setDice] = useState<Array<Die>>([]);
  // const [heldDice, setHeldDice] = useState<Array<number>>([]);

  const setHeld = (id: string, val: boolean) => {
    setDice(dice.map((die) => (die.id === id ? { ...die, held: val } : die)));
  };

  const rollDie: () => number = () =>
    Math.floor(Math.random() * (6 - 1 + 1) + 1);

  const rollDice = (numberOfDice: number) => {
    const currentDice = [
      { id: 'A', number: 0, held: false },
      { id: 'B', number: 0, held: false },
      { id: 'C', number: 0, held: false },
      { id: 'D', number: 0, held: false },
      { id: 'E', number: 0, held: false },
      { id: 'F', number: 0, held: false },
    ];

    for (let i = 0; i < numberOfDice; i++) {
      currentDice[i].number = rollDie();
    }

    // console.log(currentDice);
    setDice(currentDice);
    return currentDice;
  };

  return (
    <>
      <div className="wrapper">
        <button onClick={() => rollDice(6)}>Roll</button>
      </div>
      <Dice dice={dice} setHeld={setHeld}></Dice>
      <div className="wrapper">
        {/* selected score: */}
        {/* TODO: show score of selecte4d dice */}
        <br />
        <div>
          <button
            onClick={() => {
              setGameScore(scoreRound(dice));
              // setScoredDice([]);
            }}
          >
            Score selected dice
          </button>
        </div>
        <div>total game score: {gameScore}</div>
      </div>
    </>
  );

  // const [scoredDice, setScoredDice] = useState<Array<Die>>([]);

  // const [score, setScore] = useState(0);

  // // find die of given id and change held value to given value
  // const setHeld = (id: string, val: boolean) => {
  //   setDice(dice.map((die) => (die.id === id ? { ...die, held: val } : die)));
  // };

  // return (
  //   <>
  //     <button disabled>Score and roll again</button>
  //     <button
  //       onClick={() => {
  //         setScore(scoreRound(dice));
  //         setScoredDice([]);
  //       }}
  //     >
  //       Score and end turn
  //     </button>
  //     <hr />
  //     total game score: {score}
  //   </>
  // );
}

export default App;
