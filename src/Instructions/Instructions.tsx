import { Link } from 'react-router';
import './Instructions.css';
import { WINNING_SCORE } from '../constants';

export const Instructions = () => {
  //

  return (
    <>
      <h1>Farkel</h1>
      <h2>How to Play</h2>
      <ol>
        <li>
          Select at least one die to score from each roll (see scoring table).
        </li>
        <li>
          Scored dice are removed from play. To re-roll remaining dice for the
          chance to score more points on your turn, click "Roll again".
        </li>
        <li>
          If you bust on any roll (no viable scoring combinations), you lose all
          points for that round, and must pass your turn.
        </li>
        <li>
          If you want to end your scoring round and keep your points, click
          "Score and pass".
        </li>
        <li>First player to {WINNING_SCORE} wins. Good fate be with you!</li>
      </ol>

      <table>
        <tbody>
          <tr>
            <th>Combination</th>
            <th>Points</th>
          </tr>
          <tr>
            <td>1</td>
            <td>100</td>
          </tr>
          <tr>
            <td>5</td>
            <td>50</td>
          </tr>
          <tr>
            <td>1, 2, 3, 4, 5</td>
            <td>500</td>
          </tr>
          <tr>
            <td>2, 3, 4, 5, 6</td>
            <td>750</td>
          </tr>
          <tr>
            <td>1, 2, 3, 4, 5, 6</td>
            <td>1,500</td>
          </tr>
          <tr>
            <td>1, 1, 1</td>
            <td>1,000</td>
          </tr>
          <tr>
            <td>2, 2, 2</td>
            <td>200</td>
          </tr>
          <tr>
            <td>3, 3, 3</td>
            <td>300</td>
          </tr>
          <tr>
            <td>4, 4, 4</td>
            <td>400</td>
          </tr>
          <tr>
            <td>5, 5, 5</td>
            <td>500</td>
          </tr>
          <tr>
            <td>6, 6, 6</td>
            <td>600</td>
          </tr>
          <tr>
            <td>Four of a kind</td>
            <td>2x the points of three of a kind</td>
          </tr>
          <tr>
            <td>Five of a kind</td>
            <td>4x the points of three of a kind</td>
          </tr>
          <tr>
            <td>Six of a kind</td>
            <td>8x the points of three of a kind</td>
          </tr>
        </tbody>
      </table>

      <Link to="/">
        <button>Back</button>
      </Link>
    </>
  );
};
