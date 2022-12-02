import { PuzzleInterface } from './PuzzleInterface';

export default abstract class Puzzle implements PuzzleInterface {
  protected dailyInput: string;
  public TDD: { input: string, output: unknown }[];

  constructor(input: string) {
    this.dailyInput = input;
  }

  public abstract solve(input?: string): string;
}
