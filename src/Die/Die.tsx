import './Die.css';
import type { Die as D } from './Die';

export const Die = (props: {
  die: D;
  onClick: () => void;
  isSelected: boolean;
}) => {
  const { die, onClick, isSelected } = props;

  return (
    <div className={`die ${isSelected ? 'selected' : ''}`} onClick={onClick}>
      {die.number}
    </div>
  );
};
