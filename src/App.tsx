import './App.css';
import { Link } from 'react-router';
import { Footer } from './Footer/Footer';

const App = () => {
  return (
    <>
      <img className="border" src="src/assets/border.png" />
      <div className="content">
        <h1>Farkel</h1>
        <Link to="/play">
          <button>Begin game</button>
        </Link>
        <Link to="instructions">
          <button>How to Play</button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default App;
