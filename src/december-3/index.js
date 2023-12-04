import { input } from "./input.js";

const getCharsWithCoords = (input) => {
  const lines = input.split('\n');

  const numbersWithCoords = [];
  const symbolsWithCoords = [];

  for (let y = 0; y < lines.length; y++) {
    let currentNumWitchCoords = [];

    for (let x = 0; x < lines[y].length; x++) {
      const char = lines[y][x];

      if (!isNaN(char)) {
        currentNumWitchCoords.push({ digit: char, x, y });

        if (x === lines[y].length - 1) {
          numbersWithCoords.push(currentNumWitchCoords);
          currentNumWitchCoords = [];
        }

      } else {
        if (currentNumWitchCoords.length) {
          numbersWithCoords.push(currentNumWitchCoords);
          currentNumWitchCoords = [];
        }
      }

      if (isNaN(char) && char !== '.') {
        symbolsWithCoords.push({ symbol: char, x, y })
      }
    }
  }

  return {
    numbers: numbersWithCoords,
    symbols: symbolsWithCoords,
  }
}

const createRange = (start, end) => {
  const range = [];

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  return range;
}

const createNumber = (numberWithCoords) =>
  parseInt(numberWithCoords.map(({ digit }) => digit).join(''));

const isOnTheSameLineAsNum = (symbol, digit) => symbol.y === digit.y;
const isAboveNum = (symbol, digit) => symbol.y === digit.y - 1;
const isBelowNum = (symbol, digit) => symbol.y === digit.y + 1;

const isWithinNumRange = (symbol, firstDigit, lastDigit) =>
  createRange(firstDigit.x - 1, lastDigit.x + 1).includes(symbol.x);

const isNextToNum = (symbol, firstDigit, lastDigit) =>
  symbol.x === firstDigit.x - 1 || symbol.x === lastDigit.x + 1;

const solvePartOne = (numbersWithCoords, symbolsWithCoords) => {
  const partNumbers = [];

  for (const numberWithCoords of numbersWithCoords) {
    const firstDigit = numberWithCoords.at(0);
    const lastDigit = numberWithCoords.at(-1);

    for (const symbol of symbolsWithCoords) {
      if (
        isOnTheSameLineAsNum(symbol, firstDigit) &&
        isNextToNum(symbol, firstDigit, lastDigit)
      ) {
        partNumbers.push(createNumber(numberWithCoords));
      }

      if (
        (isAboveNum(symbol, firstDigit) || isBelowNum(symbol, firstDigit)) &&
        isWithinNumRange(symbol, firstDigit, lastDigit)
      ) {
        partNumbers.push(createNumber(numberWithCoords))
      }
    }
  }

  return partNumbers.reduce((sum, cur) => sum + cur);
}

const solvePartTwo = (numbersWithCoords, symbolsWithCoords) => {
  const gears = symbolsWithCoords.filter(({ symbol }) => symbol === '*');

  const gearPartNumberPairs = gears.map(gear => {
    const partNumbers = [];

    for (const numberWithCoords of numbersWithCoords) {
      const firstDigit = numberWithCoords.at(0);
      const lastDigit = numberWithCoords.at(-1);

      if (
        isOnTheSameLineAsNum(gear, firstDigit) &&
        isNextToNum(gear, firstDigit, lastDigit)
      ) {
        partNumbers.push(createNumber(numberWithCoords))
      }

      if (
        isBelowNum(gear, firstDigit) &&
        isWithinNumRange(gear, firstDigit, lastDigit)
      ) {
        partNumbers.push(createNumber(numberWithCoords))
      }

      if (
        isAboveNum(gear, firstDigit) &&
        isWithinNumRange(gear, firstDigit, lastDigit)
      ) {
        partNumbers.push(createNumber(numberWithCoords))
      }
    }

    return partNumbers.length === 2 ? partNumbers : null;
  }).filter(partNumbers => partNumbers);

  const gearRatios = gearPartNumberPairs.map(partNumberPair =>
    partNumberPair.reduce((product, cur) => product * cur)
  );

  return gearRatios.reduce((sum, cur) => sum + cur);
}

const { numbers, symbols } = getCharsWithCoords(input);

const answers = {
  1: solvePartOne(numbers, symbols),
  2: solvePartTwo(numbers, symbols),
};

console.log(answers);