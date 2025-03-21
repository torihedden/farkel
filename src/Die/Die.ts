export type ValidId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export type DiceNumber = 1 | 2 | 3 | 4 | 5 | 6

export type Die = {
  id: ValidId;
  number: DiceNumber;
};