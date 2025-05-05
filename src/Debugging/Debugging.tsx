import './Debugging.css';

export const Debug = (props: {
  setSelectedDice: (arg: []) => void;
  setRoundScore: (arg: number) => void;
  setGameScore: (arg: number) => void;
  createNewDice: () => void;
  setTotalTurns: (arg: number) => void;
}) => {
  const {
    setSelectedDice,
    setRoundScore,
    setGameScore,
    createNewDice,
    setTotalTurns,
  } = props;

  return (
    <div className="debugging-buttons">
      <br />
      <button onClick={() => createNewDice()}>Reset dice</button>
      <button
        onClick={() => {
          setSelectedDice([]);
          setRoundScore(0);
          setGameScore(0);
          setTotalTurns(0);
        }}
      >
        Reset all scores
      </button>
    </div>
  );
};
