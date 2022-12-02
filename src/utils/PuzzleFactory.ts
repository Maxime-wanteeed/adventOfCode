import Puzzle from '../types/AbstractPuzzle';
import readFile from './readFile';

class PuzzleFactory {
  public async getPuzzle(puzzleName: string): Promise<Puzzle> {
    const puzzlePath = `src/days/${puzzleName}`;
    let dailyInput = '';
    try {
      dailyInput = await readFile(`${puzzlePath}/input.txt`);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }

    const puzzleModule: { default: { new(input: string): Puzzle } } = await import(`../days/${puzzleName}/Puzzle`);

    const { default: PuzzleClass } = puzzleModule;
    const puzzle = new PuzzleClass(dailyInput);
    return puzzle;
  }
}

export default new PuzzleFactory();
