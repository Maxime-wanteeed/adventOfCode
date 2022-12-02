import kleur = require('kleur');
import PuzzleFactory from './utils/PuzzleFactory';

const log = (...args: unknown[]) => console.log('\t', ...args);

const args = process.argv.slice(2);
const dayToSolve = args[0];

if (!dayToSolve) {
    console.error('No day specified run with npm run dev {day}');
    process.exit(1);
}

log(`Solving Day #${dayToSolve}`);

(async () => {
    const puzzle = await PuzzleFactory.getPuzzle(dayToSolve);
    for (const { input, output } of puzzle.TDD) {
        const testResult = puzzle.solve(input);
        if (testResult !== output) {
            log(kleur.yellow(`your code does not pass every provided tests\nexpected ${output}\nrecieved ${testResult}. please try again`));
            return;
        }
    }
    const dailyResult = puzzle.solve();
    if (!dailyResult) {
        log(kleur.red(`you code must give an answer`));
        return;
    }
    log(kleur.green(`try your luck with this answer : ${dailyResult}`));
})();
