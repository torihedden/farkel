import { WINNING_SCORE } from '../constants';
import './Scorecard.css';

export const Scorecard = (props: {
  gameScore: number[];
  roundScore: number;
  selectedScore: number;
}) => {
  const { gameScore, roundScore, selectedScore } = props;

  return (
    <div className="scorecard">
      <div>Selected score- {selectedScore}</div>
      <div>Round total- {roundScore}</div>
      <br />
      <>
        {gameScore.map((s, i) => (
          <div key={i}>
            Player {i + 1}: {s} / {WINNING_SCORE}
          </div>
        ))}
      </>
    </div>
  );
};
