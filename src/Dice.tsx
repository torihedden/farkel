// import { useEffect } from 'react';
// import { useState } from 'react';
import { Die } from './App';
import './Dice.css';

export const Dice = (props: {
  dice: Array<Die>;
  test: number;
  setHeld: (id: string, val: boolean) => void;
}) => {
  const { dice, test, setHeld } = props;

  //   const [diceCopy, setDiceCopy] = useState<Array<Die>>(dice);

  const diceInPlay = dice.filter((die) => !die.held);
  const heldDice = dice.filter((die) => die.held);

  //   const [roundDie, setRoundDie] = useState<Array<Die>>(dice);

  //   useEffect(() => {
  //     console.log('copy: ', diceCopy);
  //     setDiceCopy(dice);
  //   }, [dice, diceCopy]);

  //   const [heldDice, setHeldDice] = useState<Array<number>>([]);

  return (
    <div>
      Winning score is: {test}
      <hr />
      {/* <div>{dice.join(' ')}</div> */}
      <div className="dice-wrapper">
        {diceInPlay.map((die, index) => (
          <div
            className="die"
            key={die.id}
            onClick={() => {
              setHeld(die.id, !die.held);
            }}
          >
            {die.number} + [{index}]
          </div>
        ))}
      </div>
      <hr />
      <div>
        <div className="dice-wrapper">
          {heldDice.map((die, index) => (
            <div
              className="die"
              key={die.id}
              onClick={() => {
                setHeld(die.id, !die.held);
              }}
            >
              {die.number} + {index}
            </div>
          ))}
        </div>
        {/* {roundDie.map((die, index) => (
          <div key={`${die}-${index}`}>{die.held}</div>
        ))}  */}
      </div>
    </div>
  );
};
