import { Die } from './Die/Die';

const findDuplicates = (dice: Array<Die>, dupeNumber: number) => {
  let counts = 0;

  for (let i = 0; i < dice.length; i++) {
    if (dice[i].number === dupeNumber) {
      counts += 1;
    }
  }
  //   console.log(`There are ${counts} instances of ${dupeNumber}`);
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

export const scoreRound = (dice: Array<Die>) => {
  const sorted = sortDice(dice);
  console.log({ sorted });

  let score = 0;

  //   if (
  //     sorted.includes(1) &&
  //     sorted.includes(2) &&
  //     sorted.includes(3) &&
  //     sorted.includes(4) &&
  //     sorted.includes(5) &&
  //     sorted.includes(6)
  //   ) {
  //     return (score += 1500);
  //   }

  if (findDuplicates(sorted, 1) === 3) {
    // setScore(1000);
    score += 1000;
  }

  if (findDuplicates(sorted, 2) === 3) {
    // setScore(200);
    score += 200;
  }

  if (findDuplicates(sorted, 3) === 3) {
    // setScore(300);
    score += 300;
  }

  if (findDuplicates(sorted, 4) === 3) {
    // setScore(400);
    score += 400;
  }

  if (findDuplicates(sorted, 5) === 3) {
    // setScore(500);
    score += 500;
  }

  if (findDuplicates(sorted, 6) === 3) {
    // setScore(600);
    score += 600;
  }

  sorted.map((die) => {
    if (die.number === 1 && findDuplicates(sorted, 1) < 3) score += 100;
    if (die.number === 5 && findDuplicates(sorted, 5) < 3) score += 50;
  });

  return score;
};
