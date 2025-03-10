// import { useEffect } from 'react';
// import { useState } from 'react';
import './Dice.css';

export const Dice = () =>
  // dice: Array<Die>;
  // setHeld: (id: string, val: boolean) => void;
  {
    // const {
    //   dice,
    //   // setHeld
    // } = props;

    // const diceInPlay = dice.filter((die) => !die.held);
    // const heldDice = dice.filter((die) => die.held);

    //   const [roundDie, setRoundDie] = useState<Array<Die>>(dice);

    return (
      <div>
        {/* <div className="dice-wrapper">
        {diceInPlay.map((die) => (
          <div
            className="die"
            key={die.id}
            onClick={() => {
              // setHeld(die.id, !die.held);
            }}
          >
            {die.number}
          </div>
        ))}
      </div> */}

        <div>
          {/* <div className="dice-wrapper">
          {heldDice.map((die) => (
            <div
              className={'die held'}
              key={die.id}
              onClick={() => {
                // setHeld(die.id, !die.held);
              }}
            >
              {die.number}
            </div>
          ))}
        </div> */}
        </div>
        {/* <div>Scored dice</div> */}
      </div>
    );
  };
