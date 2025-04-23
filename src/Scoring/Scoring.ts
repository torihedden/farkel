const findDuplicates = (dice: number[], dupeNumber: number) => {
  let counts = 0;

  for (let i = 0; i < dice.length; i++) {
    if (dice[i] === dupeNumber) {
      counts += 1;
    }
  }

  return counts;
};

export const scoreDice = (dice: number[]) => {
 
  let score = 0;

  if (
    dice.includes(1) &&
    dice.includes(2) &&
    dice.includes(3) &&
    dice.includes(4) &&
    dice.includes(5) &&
    dice.includes(6)
  ) {
    return (score += 1500);
  }

  if (
    dice.includes(1) &&
    dice.includes(2) &&
    dice.includes(3) &&
    dice.includes(4) &&
    dice.includes(5) &&
    findDuplicates(dice, 1) === 2
  ) {
    return (score += 600);
  }

  if (
    dice.includes(1) &&
    dice.includes(2) &&
    dice.includes(3) &&
    dice.includes(4) &&
    dice.includes(5) &&
    findDuplicates(dice, 5) === 2
  ) {
    return (score += 550);
  }

  if (
    dice.includes(1) &&
    dice.includes(2) &&
    dice.includes(3) &&
    dice.includes(4) &&
    dice.includes(5)
  ) {
    return (score += 500);
  }

  if (
    dice.includes(2) &&
    dice.includes(3) &&
    dice.includes(4) &&
    dice.includes(5) &&
    dice.includes(6) &&
    findDuplicates(dice, 5) === 2
  ) {
    return (score += 800);
  }

  if (
    dice.includes(2) &&
    dice.includes(3) &&
    dice.includes(4) &&
    dice.includes(5) &&
    dice.includes(6) &&
    findDuplicates(dice, 5) !== 2
  ) {
    return (score += 750);
  }

  /** Score 6-of-a-kinds */
  if (findDuplicates(dice, 1) === 6) {
    return score += 8000;
  }

  if (findDuplicates(dice, 2) === 6) {
    return score += 1600;
  }

  if (findDuplicates(dice, 3) === 6) {
    return score += 2400;
  }

  if (findDuplicates(dice, 4) === 6) {
    return score += 3200;
  }

  if (findDuplicates(dice, 5) === 6) {
    return score += 4000;
  }

  if (findDuplicates(dice, 6) === 6) {
    return score += 4800;
  }

  /** Score 5-of-a-kinds */
  if (findDuplicates(dice, 1) === 5) {
    score += 4000;
  }

  if (findDuplicates(dice, 2) === 5) {
    score += 800;
  }

  if (findDuplicates(dice, 3) === 5) {
    score += 1200;
  }

  if (findDuplicates(dice, 4) === 5) {
    score += 1600;
  }

  if (findDuplicates(dice, 5) === 5) {
    score += 2000;
  }

  if (findDuplicates(dice, 6) === 5) {
    score += 2400;
  }

  /** Score 4-of-a-kinds */
  if (findDuplicates(dice, 1) === 4) {
    score += 2000;
  }

  if (findDuplicates(dice, 2) === 4) {
    score += 400;
  }

  if (findDuplicates(dice, 3) === 4) {
    score += 600;
  }

  if (findDuplicates(dice, 4) === 4) {
    score += 800;
  }

  if (findDuplicates(dice, 5) === 4) {
    score += 1000;
  }

  if (findDuplicates(dice, 6) === 4) {
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

  dice.map((die: number) => {
    if (die === 1 && findDuplicates(dice, 1) < 3) score += 100;
    if (die === 5 && findDuplicates(dice, 5) < 3) score += 50;
  });

  return score;
};
