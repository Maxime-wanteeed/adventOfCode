import { existsSync, copyFileSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { parse } from 'node-html-parser';

import { AOC_SESSION_COOKIE } from '../../env';

/**
 * Creates the boilerplate code for a new puzzle
 * Usage: npm run init-day {dayNumber} i.e npm run 1
 * It will create a new folder under src/days/{dayNumber}
 * with the boilerplate code to build the solution, and an empty input .txt file.
 */
const main = async () => {
  const args = process.argv.slice(2);
  const day = args[0];

  if (!day) {
    return console.log('Please run with the day to bootstrap, i.e. npm run init-day 1');
  }

  console.log(`creating template for day ${day}`);
  const basePath = 'src/days';

  if (existsSync(`src/days/${day}`)) {
    return console.log(`day ${day} already exists`);
  }


  const newDayPath = `${basePath}/${day}`;
  const url = `https://adventofcode.com/2022/day/${day}`;

  const requestHeaders = { headers: { cookie: `session=${AOC_SESSION_COOKIE}` } };

  mkdirSync(newDayPath);
  const promptPromise = fetch(url, requestHeaders)
    .then((input: Response) => input.text())
    .then((txt: string) => {
      const parsed = parse(txt);
      const article = parsed.querySelectorAll('article');
      const rawTxt = article.map((e) => e.rawText).join('\n');
      return Promise.resolve(rawTxt);
    })
    .then((txt: string) => {
      const template = readFileSync(`${__dirname}/Puzzle.ts.tpl`).toString();
      writeFileSync(`${newDayPath}/Puzzle.ts`, `${template}\n\n/*\n${txt}\n*/\n`);
    });

  const inputPromise = fetch(`${url}/input`, requestHeaders)
    .then((input: Response) => input.text())
    .then((txt: string) => writeFileSync(`${newDayPath}/input.txt`, txt.trim()));


  Promise.all([inputPromise, promptPromise]).finally(() => console.log(`day ${day} initailized !`));

};

main();
