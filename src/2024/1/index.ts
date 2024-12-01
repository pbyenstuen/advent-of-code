import { readInputFile } from "../../utils.js";

const input = readInputFile(2024, 1);

type Lists = {
  left: number[];
  right: number[];
};

const parseLists = (input: string): Lists => {
  const numbers = input
    .split("\n")
    .map((str) => str.split("   "))
    .flat()
    .map((str) => parseInt(str, 10));

  return numbers.reduce<{ left: number[]; right: number[] }>(
    (acc, cur, index) =>
      index % 2 === 0
        ? { ...acc, left: [...acc.left, cur] }
        : { ...acc, right: [...acc.right, cur] },
    { left: [], right: [] }
  );
};

const lists = parseLists(input);

const solvePartOne = (lists: Lists): number => {
  const { left, right } = lists;

  const sortedLeft = left.toSorted((a, b) => a - b);
  const sortedRight = right.toSorted((a, b) => a - b);

  const distances = sortedLeft.map((_, index: number) =>
    Math.abs(sortedLeft[index] - sortedRight[index])
  );

  return distances.reduce((acc, cur) => acc + cur, 0);
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
