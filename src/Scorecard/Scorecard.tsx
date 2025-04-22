import './Scorecard.css';

export const Scorecard = (props: {
  gameScore: number;
  roundScore: number;
  selectedScore: number;
  totalTurns: number;
}) => {
  const { gameScore, roundScore, selectedScore, totalTurns } = props;

  return (
    <div className="scorecard">
      <div>Selected score: {selectedScore}</div>
      <div>Round total: {roundScore}</div>
      <div>Game score: {gameScore} / 4000</div>
      <br />
      <div>Total turns: {totalTurns}</div>
    </div>
  );
};
