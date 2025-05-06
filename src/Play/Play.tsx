import { useState } from 'react';
import { Game } from '../Game/Game';

export const Play = () => {
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [multiGameScore, setMultiGameScore] = useState([0, 0]);

  return (
    <>
      <Game
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        multiGameScore={multiGameScore}
        setMultiGameScore={setMultiGameScore}
      />
    </>
  );
};
