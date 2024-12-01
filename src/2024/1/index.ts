import { readInputFile } from "../../utils.js";

const input = readInputFile(2024, 1);

type Lists = {
  left: number[];
  right: number[];
};

const parseLists = (input: string): Lists => {
  const nums = input.split("\n").map((line) => line.split("   ").map(Number));

  return {
    left: nums.map(([leftNum]) => leftNum),
    right: nums.map(([, rightNum]) => rightNum),
  };
};

const lists = parseLists(input);

const solvePartOne = (lists: Lists): number => {
  const { left, right } = lists;

  const sortedLeft = left.toSorted((a, b) => a - b);
  const sortedRight = right.toSorted((a, b) => a - b);

  return sortedLeft
    .map((_, i: number) => Math.abs(sortedLeft[i] - sortedRight[i]))
    .reduce((acc, cur) => acc + cur, 0);
};

const solvePartTwo = (lists: Lists): number => {
  const { left, right } = lists;

  const rightCounts = right.reduce<Record<number, number>>(
    (acc, num) => ({
      ...acc,
      [num]: (acc[num] || 0) + 1,
    }),
    {}
  );

  return left
    .map((num) => num * (rightCounts[num] || 0))
    .reduce((acc, cur) => acc + cur, 0);
};

const answers = {
  1: solvePartOne(lists),
  2: solvePartTwo(lists),
};

console.log(answers);
