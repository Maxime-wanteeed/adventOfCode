import { readdirSync } from 'fs';
import Puzzle from './types/AbstractPuzzle';
import PuzzleFactory from './utils/PuzzleFactory';

describe('AoC test runner', () => {
  const dirs = readdirSync('./src/days', { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const day of dirs) {
    it(`Tests day ${day}`, async () => {
      const puzzle: Puzzle = await PuzzleFactory.getPuzzle(day);
      puzzle?.TDD?.forEach(testCase => expect(puzzle.solve(testCase.input)).toEqual(testCase.output));
    });
  }
});
