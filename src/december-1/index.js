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

const replaceSpelledNums = (str) => {
  let result = str;

  for (const [spelling, num] of Object.entries(spelledNumsMap)) {
    let index = result.indexOf(spelling);

    while (index !== -1) {
      result = [result.slice(0, index + 1), num, result.slice(index + 1)].join('');
      index = result.indexOf(spelling, index);
    }
  }

  return result;
}

const getSum = (numsArr) => numsArr.reduce((sum, cur) => sum + cur);

const solve = (stringsArr) => {
  const numsArr = stringsArr.map(str => {
    const replacedStr = replaceSpelledNums(str);
    const nums = [];

    for (const char of replacedStr) {
      const parsedChar = parseInt(char);

      if (!isNaN(parsedChar)) {
        nums.push(parsedChar);
      }
    }

    const firstNum = nums.at(0);
    const lastNum = nums.at(-1);

    return parseInt([firstNum, lastNum].join(''));
  });

  return getSum(numsArr);
}

const answer = solve(stringsArr);

console.log(answer);