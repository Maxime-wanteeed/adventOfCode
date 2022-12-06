import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { parse } from 'node-html-parser';
import * as moment from 'moment';

import { AOC_SESSION_COOKIE } from '../../env';

/**
 * Creates the boilerplate code for every puzzles that precedes the current day
 * Usage: npm run init-day
 * It will create new folders under src/days/{dayNumber}
 * with the boilerplate code to build the solution, and an empty input .txt file.
 */

const main = async () => {
  const limitDay = moment(new Date()).endOf('day');
  const daysToInitialize = [...Array(25)]
    .map((_, i) => i + 1)
    .filter((day: number) => moment(new Date(`December ${day}, 2022 12:00:00`)) <= limitDay);

  await Promise.all(daysToInitialize.map(async (day: number) => {
    const basePath = 'src/days';

    if (!existsSync(`${basePath}`)) {
      console.log(`creating days folder`);
      mkdirSync(basePath);
    }

    const dayFolderExists = existsSync(`${basePath}/${day}`);
    dayFolderExists
      ? console.log(`updating template for day ${day}`)
      : console.log(`creating template for day ${day}`);

    const newDayPath = `${basePath}/${day}`;
    const url = `https://adventofcode.com/2022/day/${day}`;

    const requestHeaders = { headers: { cookie: `session=${AOC_SESSION_COOKIE}` } };

    if (!dayFolderExists) {
      mkdirSync(newDayPath);
    }

    const promptPromise = fetch(url, requestHeaders)
      .then((input: Response) => input.text())
      .then((txt: string) => {
        const parsed = parse(txt, { lowerCaseTagName: true, parseNoneClosedTags: true });
        const article = parsed.querySelectorAll('article');
        const rawTxt = article.map((e) => e.rawText).join('\n\n');
        return Promise.resolve(rawTxt);
      })
      .then((txt: string) => {
        const puzzlePath = `${newDayPath}/Puzzle.ts`;

        const template = readFileSync(`${__dirname}/Puzzle.ts.tpl`).toString();
        const existingFile = dayFolderExists ? readFileSync(puzzlePath).toString() : '';

        writeFileSync(puzzlePath, `${existingFile.split(/(?<=EOF)/)[0] || template}\n\n/*\n${txt}\n*/\n`);
      });

    const inputPromise = dayFolderExists
      ? Promise.resolve()
      : fetch(`${url}/input`, requestHeaders)
        .then((input: Response) => input.text())
        .then((txt: string) => writeFileSync(`${newDayPath}/input.txt`, txt.trim()));


    await Promise.all([inputPromise, promptPromise]).finally(() => console.log(`day ${day} initialized !`));

  }));

  console.log(`finished initializing ${daysToInitialize.length} days`);
};

main();
