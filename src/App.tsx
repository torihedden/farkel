import './App.css';
import { Link } from 'react-router';

const App = () => {
  return (
    <>
      <h1>Farkel</h1>
      <Link to="/play">
        <button>Begin game</button>
      </Link>
      <Link to="instructions">
        <button>How to Play</button>
      </Link>
    </>
  );
};

export default App;
