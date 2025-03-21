import type { Die } from '../Die/Die';

const findDuplicates = (dice: Array<Die>, dupeNumber: number) => {
  let counts = 0;

  for (let i = 0; i < dice.length; i++) {
    if (dice[i].number === dupeNumber) {
      counts += 1;
    }
  }

  return counts;
};

const sortDice = (dice: Array<Die>) => {
  dice.sort((a, b) => {
    if (a.number < b.number) {
      return -1;
    } else if (a.number > b.number) {
      return 1;
    } else return 0;
  });

  return dice;
};

// TODO: using greedy algorithm concept,
// score all valid scoring combos in a given set of dice
export const scoreDice = (dice: Array<Die>) => {
  const sorted = sortDice(dice);

  const sortedScores = sortDice(dice).map((d) => d.number);

  let score = 0;

  if (
    sortedScores.includes(1) &&
    sortedScores.includes(2) &&
    sortedScores.includes(3) &&
    sortedScores.includes(4) &&
    sortedScores.includes(5) &&
    sortedScores.includes(6)
  ) {
    return (score += 1500);
  }

  if (
    sortedScores.includes(1) &&
    sortedScores.includes(2) &&
    sortedScores.includes(3) &&
    sortedScores.includes(4) &&
    sortedScores.includes(5) &&
    findDuplicates(sorted, 1) === 2
  ) {
    return (score += 600);
  }

  if (
    sortedScores.includes(1) &&
    sortedScores.includes(2) &&
    sortedScores.includes(3) &&
    sortedScores.includes(4) &&
    sortedScores.includes(5) &&
    findDuplicates(sorted, 5) === 2
  ) {
    return (score += 550);
  }

  if (
    sortedScores.includes(1) &&
    sortedScores.includes(2) &&
    sortedScores.includes(3) &&
    sortedScores.includes(4) &&
    sortedScores.includes(5)
  ) {
    return (score += 500);
  }

  if (
    sortedScores.includes(2) &&
    sortedScores.includes(3) &&
    sortedScores.includes(4) &&
    sortedScores.includes(5) &&
    sortedScores.includes(6) &&
    findDuplicates(sorted, 5) === 2
  ) {
    return (score += 800);
  }

  if (
    sortedScores.includes(2) &&
    sortedScores.includes(3) &&
    sortedScores.includes(4) &&
    sortedScores.includes(5) &&
    sortedScores.includes(6) &&
    findDuplicates(sorted, 5) !== 2
  ) {
    return (score += 750);
  }

  /** Score 4-or-more-of-a-kinds */
  if (findDuplicates(sorted, 1) >= 4) {
    score += 2000;
  }

  if (findDuplicates(sorted, 2) >= 4) {
    score += 400;
  }

  if (findDuplicates(sorted, 3) >= 4) {
    score += 600;
  }

  if (findDuplicates(sorted, 4) >= 4) {
    score += 800;
  }

  if (findDuplicates(sorted, 5) >= 4) {
    score += 1000;
  }

  if (findDuplicates(sorted, 6) >= 4) {
    score += 1200;
  }

  /** Score 3-of-a-kinds */
  if (findDuplicates(sorted, 1) === 3) {
    score += 1000;
  }

  if (findDuplicates(sorted, 2) === 3) {
    score += 200;
  }

  if (findDuplicates(sorted, 3) === 3) {
    score += 300;
  }

  if (findDuplicates(sorted, 4) === 3) {
    score += 400;
  }

  if (findDuplicates(sorted, 5) === 3) {
    score += 500;
  }

  if (findDuplicates(sorted, 6) === 3) {
    score += 600;
  }

  sorted.map((die) => {
    if (die.number === 1 && findDuplicates(sorted, 1) < 3) score += 100;
    if (die.number === 5 && findDuplicates(sorted, 5) < 3) score += 50;
  });

  return score;
};
