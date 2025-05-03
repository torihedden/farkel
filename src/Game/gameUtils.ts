import type { Die as D } from '../Die/Die.ts';
import { scoreDice } from '../Scoring/Scoring.ts';

export const flattenDiceToNumbers = (dice: Array<D>): number[] => {
    const nums: number[] = [];

    dice.map((d) => {
      nums.push(d.number);
    });

    return nums;
};

export const removeDice = (dice: D[], diceToRemove: D[]): D[] => {
    return dice.filter((die) => !diceToRemove.find((d) => die.id === d.id));
};

export const isDieInScoringCombo = (dice: D[], die: D): boolean => {
    return (
      scoreDice(flattenDiceToNumbers(dice.filter((d) => d.id !== die.id))) <
      scoreDice(flattenDiceToNumbers(dice))
    );
};