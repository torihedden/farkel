import './Die.css';
import type { Die as D } from './Die';

export const Die = (props: {
  die: D;
  onClick: () => void;
  isSelected: boolean;
  isValid: boolean;
}) => {
  const { die, onClick, isSelected, isValid } = props;

  return (
    <div className={`die ${isSelected ? 'selected' : ''}`} onClick={onClick}>
      {die.number} | {isValid.toString()}
    </div>
  );
};
