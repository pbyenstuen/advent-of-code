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

const solvePartOne = (input: string): number => {
  const { left, right } = parseLists(input);

  const sortedLeft = left.toSorted((a, b) => a - b);
  const sortedRight = right.toSorted((a, b) => a - b);

  const distances = sortedLeft.map((_, index: number) =>
    Math.abs(sortedLeft[index] - sortedRight[index])
  );

  return distances.reduce((acc, cur) => acc + cur);
};

const answers = {
  1: solvePartOne(input),
  2: null,
};

console.log(answers);
