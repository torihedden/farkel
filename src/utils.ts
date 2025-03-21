import { DiceNumber } from "./Die/Die"

// export const isInitialRoll = (dice: Array<Die>) => {
//     return dice.every(
//         (d: Die, _: number, arr: { number: number }[]) => d.number === arr[0].number,
//     ) && dice[0].number === 0
// }

export const rollDie = (): DiceNumber => {
    return Math.floor(Math.random() * (6 - 1 + 1) + 1) as DiceNumber
}
