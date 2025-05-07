import { useState } from 'react';
import { Link } from 'react-router';
import './App.css';
import border from './assets/border.png';
import { Instructions } from './Instructions/Instructions';
import { Footer } from './Footer/Footer';

const App = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <>
      <img className="border" src={border} />
      <div className="content">
        <h1>Farkel</h1>
        <Link to="/play">
          <button>Begin game</button>
        </Link>
        <button onClick={() => setShowInstructions(true)}>How to Play</button>
        {showInstructions && (
          <Instructions closeModal={() => setShowInstructions(false)} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default App;
