import { describe, it, expect } from 'vitest';
import { scoreDice } from './Scoring';
import {
  FULL_STRAIGHT,
  PARTIAL_STRAIGHT_1,
  PARTIAL_STRAIGHT_2,
} from './TestRolls';

describe('round scoring', () => {
  it('should score 100 on a single 1', () => {
    expect(scoreDice([{ id: 'A', number: 1 }])).toBe(100);
  });

  it('should score 50 on a single 5', () => {
    expect(scoreDice([{ id: 'A', number: 5 }])).toBe(50);
  });

  it('should score 500 with a partial straight led by 1', () => {
    expect(scoreDice(PARTIAL_STRAIGHT_1)).toBe(500);
  });

  it('should score 750 with a partial straight led by 2', () => {
    expect(scoreDice(PARTIAL_STRAIGHT_2)).toBe(750);
  });

  it('should score 1500 with a straight', () => {
    expect(scoreDice(FULL_STRAIGHT)).toBe(1500);
  });

  it('should score 1000 with three 1s', () => {
    expect(
      scoreDice([
        { id: 'A', number: 1 },
        { id: 'B', number: 1 },
        { id: 'C', number: 1 },
      ]),
    ).toBe(1000);
  });

  it('should score 200 with three 2s', () => {
    expect(
      scoreDice([
        { id: 'A', number: 2 },
        { id: 'B', number: 2 },
        { id: 'C', number: 2 },
      ]),
    ).toBe(200);
  });

  it('should score 300 with three 3s', () => {
    expect(
      scoreDice([
        { id: 'A', number: 3 },
        { id: 'B', number: 3 },
        { id: 'C', number: 3 },
      ]),
    ).toBe(300);
  });

  it('should score 900 with three 4s and three 5s', () => {
    expect(
      scoreDice([
        { id: 'A', number: 4 },
        { id: 'B', number: 4 },
        { id: 'C', number: 4 },
        { id: 'D', number: 5 },
        { id: 'E', number: 5 },
        { id: 'F', number: 5 },
      ]),
    ).toBe(900);
  });

  it('should score 600 with three 6s', () => {
    expect(
      scoreDice([
        { id: 'A', number: 6 },
        { id: 'B', number: 6 },
        { id: 'C', number: 6 },
      ]),
    ).toBe(600);
  });

  it('should score 600 with a partial straight led by 1 and one 1', () => {
    expect(
      scoreDice(PARTIAL_STRAIGHT_1.concat([{ id: 'F', number: 1 }])),
    ).toBe(600);
  });

  it('should score 550 with a partial straight led by 1 and one 5', () => {
    expect(
      scoreDice(PARTIAL_STRAIGHT_1.concat([{ id: 'F', number: 5 }])),
    ).toBe(550);
  });

  it('should score 800 with a partial straight led by 2 and one 5', () => {
    expect(
      scoreDice(PARTIAL_STRAIGHT_2.concat([{ id: 'F', number: 5 }])),
    ).toBe(800);
  });

  it('should score 200 with two 1s', () => {
    expect(
      scoreDice([
        { id: 'A', number: 1 },
        { id: 'B', number: 1 },
      ]),
    ).toBe(200);
  });

  it('should score 200 with one 1 and two 5s', () => {
    expect(
      scoreDice([
        { id: 'A', number: 1 },
        { id: 'B', number: 5 },
        { id: 'C', number: 5 },
      ]),
    ).toBe(200);
  });

  it('should score 2000 with four 1s', () => {
    expect(
      scoreDice([
        { id: 'A', number: 1 },
        { id: 'B', number: 1 },
        { id: 'C', number: 1 },
        { id: 'D', number: 1 },
      ]),
    ).toBe(2000);
  });

  it('should score 900 with four 4s and one 1', () => {
    expect(
      scoreDice([
        { id: 'A', number: 4 },
        { id: 'B', number: 4 },
        { id: 'C', number: 4 },
        { id: 'D', number: 4 },
        { id: 'E', number: 1 },
      ]),
    ).toBe(900);
  });
});
