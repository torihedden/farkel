export const Win = (props: {
  setRoundScore: (arg: number) => void;
  setGameScore: (arg: number) => void;
  createNewDice: () => void;
}) => {
  const { setRoundScore, setGameScore, createNewDice } = props;

  return (
    <>
      <div>
        <p>Congrats, you won!</p>
        <div>
          <button
            onClick={() => {
              setRoundScore(0);
              setGameScore(0);
              createNewDice();
            }}
          >
            Start new game
          </button>
        </div>
      </div>
    </>
  );
};
