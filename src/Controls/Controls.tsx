import type { Die as D } from '../Die/Die.ts';
import './Controls.css';

export const Controls = (props: {
  noValidScoringCombo: boolean;
  hasValidScoringCombo: boolean;
  areSelectedDiceValid: boolean;
  rollableDice: D[];
  createNewFullDiceSet: () => void;
  scoreAndPass: () => void;
  rollAgain: () => void;
  isBust: boolean;
  passTurn: () => void;
}) => {
  const {
    noValidScoringCombo,
    hasValidScoringCombo,
    areSelectedDiceValid,
    rollableDice,
    createNewFullDiceSet,
    scoreAndPass,
    rollAgain,
    isBust,
    passTurn,
  } = props;

  return (
    <div className="buttons-wrapper">
      <button
        disabled={
          noValidScoringCombo || !hasValidScoringCombo || !areSelectedDiceValid
        }
        onClick={() => rollAgain()}
      >
        Roll again
      </button>

      {rollableDice.length === 0 && <>{createNewFullDiceSet()}</>}

      <button
        disabled={
          noValidScoringCombo || !hasValidScoringCombo || !areSelectedDiceValid
        }
        onClick={() => {
          setTimeout(() => {
            scoreAndPass();
          }, 500);
        }}
      >
        Score and pass
      </button>

      <button
        disabled={!isBust}
        onClick={() => {
          setTimeout(() => {
            passTurn();
          }, 500);
        }}
      >
        Pass turn
      </button>
    </div>
  );
};
