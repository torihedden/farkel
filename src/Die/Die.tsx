import './Die.css';

export type ValidId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export type Die = {
  id: ValidId;
  number: number;
};

export const Die = (props: { die: Die; onClick: () => void }) => {
  const { die, onClick } = props;

  return (
    <div className="die" onClick={onClick}>
      {die.number}
    </div>
  );
};
