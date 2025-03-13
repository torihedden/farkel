import { Die } from "./Die/Die"

export const isInitialRoll = (dice: Array<Die>) => {
    return dice.every(
        (d: Die, _: number, arr: { number: number }[]) => d.number === arr[0].number,
    ) && dice[0].number === 0
}
