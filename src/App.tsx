import './App.css';
import { Link } from 'react-router';

const App = () => {
  return (
    <>
      <h1>Farkel</h1>
      <Link to="/game">
        <button>Begin game</button>
      </Link>
      <button>How to Play</button>
    </>
  );
};

export default App;
