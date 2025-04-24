import { DiceNumber } from "./Die/Die"

export const rollDie = (): DiceNumber => {
    return Math.floor(Math.random() * (6 - 1 + 1) + 1) as DiceNumber
}
