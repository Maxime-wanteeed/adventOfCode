import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  constructor(input: string) {
    super(input);
    this.TDD = [{ input: '', output: '' }]; // fill here the value(s) provided by the daily prompt
  }
  
  public solve(input: string): string {
    // --- your code here ---
    return input;
  }
}

// do not remove the next comment, it is used to auto populate the daily prompt
// EOF
