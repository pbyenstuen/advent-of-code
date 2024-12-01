import { input } from "./input.js";

const stringsArr = input.split('\n');

const spelledNumsMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

// Is not actually replacing, but inserting the corresponding number at index 1 in the spelled number
const replaceSpelledNums = (str) => {
  for (const [spelling, num] of Object.entries(spelledNumsMap)) {
    let index = str.indexOf(spelling);

    while (index !== -1) {
      str = [str.slice(0, index + 1), num, str.slice(index + 1)].join('');
      index = str.indexOf(spelling, index);
    }
  }

  return str;
}

const getNumsInString = (str) => str
  .split('')
  .map(char => parseInt(char))
  .filter(num => !isNaN(num));

const getFirstAndLastNumInString = (str) => {
  const nums = getNumsInString(str);

  const firstNum = nums.at(0);
  const lastNum = nums.at(-1);

  return parseInt([firstNum, lastNum].join(''));
}

const solve = (stringsArr, replaceSpelled = false) => {
  const numsArr = stringsArr.map(str =>
    getFirstAndLastNumInString(
      replaceSpelled ? replaceSpelledNums(str) : str)
  );

  return numsArr.reduce((sum, cur) => sum + cur, 0);
};

const answers = {
  1: solve(stringsArr),
  2: solve(stringsArr, true),
}

console.log(answers);