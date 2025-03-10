import './Die.css';

export type Die = {
  id: string;
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
