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

const diceNumbers = (dice: Array<Die>): number[] => {
  const nums: number[] = []
  
  dice.map((d) => {nums.push(d.number)})

  return nums
}

export const scoreDice = (dice: Array<Die>) => {
  const numbers = diceNumbers(dice)
  let score = 0;

  if (
    numbers.includes(1) &&
    numbers.includes(2) &&
    numbers.includes(3) &&
    numbers.includes(4) &&
    numbers.includes(5) &&
    numbers.includes(6)
  ) {
    return (score += 1500);
  }

  if (
    numbers.includes(1) &&
    numbers.includes(2) &&
    numbers.includes(3) &&
    numbers.includes(4) &&
    numbers.includes(5) &&
    findDuplicates(dice, 1) === 2
  ) {
    return (score += 600);
  }

  if (
    numbers.includes(1) &&
    numbers.includes(2) &&
    numbers.includes(3) &&
    numbers.includes(4) &&
    numbers.includes(5) &&
    findDuplicates(dice, 5) === 2
  ) {
    return (score += 550);
  }

  if (
    numbers.includes(1) &&
    numbers.includes(2) &&
    numbers.includes(3) &&
    numbers.includes(4) &&
    numbers.includes(5)
  ) {
    return (score += 500);
  }

  if (
    numbers.includes(2) &&
    numbers.includes(3) &&
    numbers.includes(4) &&
    numbers.includes(5) &&
    numbers.includes(6) &&
    findDuplicates(dice, 5) === 2
  ) {
    return (score += 800);
  }

  if (
    numbers.includes(2) &&
    numbers.includes(3) &&
    numbers.includes(4) &&
    numbers.includes(5) &&
    numbers.includes(6) &&
    findDuplicates(dice, 5) !== 2
  ) {
    return (score += 750);
  }

  /** Score 4-or-more-of-a-kinds */
  if (findDuplicates(dice, 1) >= 4) {
    score += 2000;
  }

  if (findDuplicates(dice, 2) >= 4) {
    score += 400;
  }

  if (findDuplicates(dice, 3) >= 4) {
    score += 600;
  }

  if (findDuplicates(dice, 4) >= 4) {
    score += 800;
  }

  if (findDuplicates(dice, 5) >= 4) {
    score += 1000;
  }

  if (findDuplicates(dice, 6) >= 4) {
    score += 1200;
  }

  /** Score 3-of-a-kinds */
  if (findDuplicates(dice, 1) === 3) {
    score += 1000;
  }

  if (findDuplicates(dice, 2) === 3) {
    score += 200;
  }

  if (findDuplicates(dice, 3) === 3) {
    score += 300;
  }

  if (findDuplicates(dice, 4) === 3) {
    score += 400;
  }

  if (findDuplicates(dice, 5) === 3) {
    score += 500;
  }

  if (findDuplicates(dice, 6) === 3) {
    score += 600;
  }

  dice.map((die: Die) => {
    if (die.number === 1 && findDuplicates(dice, 1) < 3) score += 100;
    if (die.number === 5 && findDuplicates(dice, 5) < 3) score += 50;
  });

  return score;
};
