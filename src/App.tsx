import './App.css';
import { Link } from 'react-router';
import { Footer } from './Footer/Footer';
import border from './assets/border.png';

const App = () => {
  return (
    <>
      <img className="border" src={border} />
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
