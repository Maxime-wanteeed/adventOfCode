# 🎄 AdventOfCode-typescript-template 🎄

This is a TypeScript boilerplate for Advent of Code.

## 👷‍♂️ Project structure

the project has the following structure:

```
src
- days: contains the solutions for the puzzles
- scripts: utility scripts for development lifecycle
- types: types and interfaces
- utils: utility scripts used for development and problem solving (i.e read an input file)
```

## 🚀 Getting started

install all required dependencies with `npm i`
add a new file `env.ts` into the `src` folder, containing the following
```typescript
export const AOC_SESSION_COOKIE = 'YOUR_SESSION_COOKIE';
```
Your session cookie can be found by going to the [AOC website](https://adventofcode.com/2022) 
Then, using the [editThisCookie](https://chrome.google.com/webstore/detail/editthiscookie/fngmhnnpilhplaeedifhccceomclgfbg?hl=fr) extension,
you can see and copy the `session` cookie

## 🔧 Development

To start developping for the current day, run the following command
```bash
npm run dev {day}
```
where {day} is the day you are working on, i.e. `npm run dev 1` will run the puzzle class for day 1.

If the specified day does not exist, the `init-day` command will be automatically executed and the missing day will be added

TODO
The file for the current day will then be opened in your main code pane (see the structure below) and the standard input will be in watch mode

All the tests will be run and when they all pass, your solution will be run against the daily input

The only thing left for you to do is go back and paste the answer in your browser

## 🎄 Manually adding a new puzzle

You can also manually generate the daily files when the new AoC puzzle is available by runing `npm run init-day`

This command will create a new directory in the `days` folder  for every day preceding the current one, with the following content

- `Puzzle.ts`: the boilerplate class with the placeholder methods for solving both daily puzzles, also containing the daily prompt
- `index.txt`: the input file containing your own daily input (if you have set your session cookie)

you can access the daily input from within the Puzzle Class by accessing `this.dailyInput`

## 🧪 Testing

You can run test for all puzzles against their expected output with `npm run test`. this will test all the solutions in the `days` folder

Note that when you run `npm run dev {day}` the same tests will be run in your console, although not through Jest's framework

Also note that you can monitor your tests status if you have the `Test explorer UI` extension from your side tabs

## 🛫 Contributing

Every contribution is welcome. Just fork this repo and open a MR with your changes, and don't forget to add your name to the contributors section of this README.

## 👨👩 Contributors

[Francesco Maida](https://edge33.github.io)
