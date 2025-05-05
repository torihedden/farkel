export const Win = (props: { resetGame: () => void }) => {
  const { resetGame } = props;

  return (
    <>
      <div>
        <p>Congrats, you won!</p>
        <div>
          <button onClick={() => resetGame()}>Start new game</button>
        </div>
      </div>
    </>
  );
};
