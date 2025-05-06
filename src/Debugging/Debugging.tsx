import './Debugging.css';

export const Debug = (props: {
  setSelectedDice: (arg: []) => void;
  setRoundScore: (arg: number) => void;
  setGameScore: (arg: number[]) => void;
  createNewDice: () => void;
  setTotalTurns: (arg: number) => void;
  diceValues: number[];
}) => {
  const {
    setSelectedDice,
    setRoundScore,
    setGameScore,
    createNewDice,
    setTotalTurns,
    // diceValues,
  } = props;

  return (
    <div className="debugging-buttons">
      <br />
      <button onClick={() => createNewDice()}>Re-roll dice</button>
      <button
        onClick={() => {
          setSelectedDice([]);
          setRoundScore(0);
          setGameScore([0, 0]);
          setTotalTurns(0);
        }}
      >
        Reset all scores
      </button>
      <br />
      <br />

      {/* <label>
        Dice vals
        <input name="dice-values" value={diceValues.toString()} />
      </label> */}
    </div>
  );
};
