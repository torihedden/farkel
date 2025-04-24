import './Die.css';
import type { Die as D } from './Die';
import one from '../assets/dice/1.svg';
import two from '../assets/dice/2.svg';
import three from '../assets/dice/3.svg';
import four from '../assets/dice/4.svg';
import five from '../assets/dice/5.svg';
import six from '../assets/dice/6.svg';

const DICE_PIPS = {
  1: one,
  2: two,
  3: three,
  4: four,
  5: five,
  6: six,
};

export const Die = (props: {
  die: D;
  onClick: () => void;
  isSelected: boolean;
  isDisabled: boolean;
}) => {
  const { die, onClick, isSelected, isDisabled } = props;

  const dieClasses =
    `die ${isSelected ? 'selected' : ''}` +
    `${isDisabled ? 'not-selectable' : ''}`;

  return (
    <div>
      <div className={dieClasses} onClick={onClick}>
        <img src={DICE_PIPS[die.number]} />
      </div>
      <div>{die.id}</div>
    </div>
  );
};
