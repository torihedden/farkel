import { useState } from 'react';
import './App.css';
import { Dice } from './Dice';

export type Die = {
  id: string;
  number: number;
  held: boolean;
};

function App() {
  const [dice, setDice] = useState<Array<Die>>([]);

  // let score = 0;

  const rollDie: () => number = () =>
    Math.floor(Math.random() * (6 - 1 + 1) + 1);

  const rollDice = (numberOfDice: number) => {
    // setDice([]);
    const currentDice = [
      { id: 'A', number: 0, held: false },
      { id: 'B', number: 0, held: false },
      { id: 'C', number: 0, held: false },
      { id: 'D', number: 0, held: false },
      { id: 'E', number: 0, held: false },
      { id: 'F', number: 0, held: false },
    ];

    for (let i = 0; i < numberOfDice; i++) {
      // currentDice.push(rollDie());
      currentDice[i].number = rollDie();
    }

    console.log(currentDice);
    setDice(currentDice);
    return currentDice;
  };

  const setHeld = (id: string, val: boolean) => {
    // dice[index].held = val;
    // setDice([
    //   ...dice.slice(0, index),
    //   { number: dice[index].number, held: val },
    //   ...dice.slice(index + 1, dice.length),
    // ]);
    //

    // find die of given id and change held value to given value
    setDice(dice.map((die) => (die.id === id ? { ...die, held: val } : die)));
  };

  return (
    <>
      <h1>Farkel</h1>
      <div className="card">
        <Dice dice={dice} test={4000} setHeld={setHeld} />
      </div>
      <button onClick={() => rollDice(6)}>Roll</button>
    </>
  );
}

export default App;
