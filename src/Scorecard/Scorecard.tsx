import { WINNING_SCORE } from '../constants';
import './Scorecard.css';

export const Scorecard = (props: {
  gameScore: number;
  roundScore: number;
  selectedScore: number;
  totalTurns: number;
  bestScore: string;
}) => {
  const { gameScore, roundScore, selectedScore, totalTurns, bestScore } = props;

  return (
    <div className="scorecard">
      <div>Selected score: {selectedScore}</div>
      <div>Round total: {roundScore}</div>
      <br />
      <div>
        Game score: {gameScore} / {WINNING_SCORE}
      </div>
      <br />
      <div>Total turns: {totalTurns}</div>
      <br />
      <div>Best of all time: {bestScore}</div>
    </div>
  );
};
