import { readInputFile } from "../../utils.js";

const input = readInputFile(2024, 3);

const extractNumPairs = (str: string): number[][] =>
  str
    .split("mul(")
    .map((substr) => substr.split(")")[0])
    .filter((substr) => substr.length <= 7)
    .map((substr) =>
      substr.split(",").map((substrPair) => parseInt(substrPair, 10))
    )
    .filter((numPair) => numPair.length === 2);

const sum = (numPairs: number[][]) =>
  numPairs.reduce((sum, cur) => sum + cur[0] * cur[1], 0);

const getIndices = (str: string, substr: string): number[] => {
  const indices = [];
  let index = str.indexOf(substr);

  while (index !== -1) {
    indices.push(index);
    index = str.indexOf(substr, index + 1);
  }

  return indices;
};

const solvePartOne = (input: string): number => sum(extractNumPairs(input));

const solvePartTwo = (input: string): number => {
  const instructions = ["do()", "don't()"];

  const indexedInstrs: Array<{
    index: number;
    instruction: string;
  }> = instructions
    .flatMap((instruction) =>
      getIndices(input, instruction).map((index) => ({
        index,
        instruction,
      }))
    )
    .sort((a, b) => a.index - b.index);

  const substrs = [
    input.slice(0, indexedInstrs.at(0)?.index), // Before first 'do()'
    input.slice(indexedInstrs.at(-1)?.index), // After last 'do()'
  ];

  let curIndexedInstr = indexedInstrs[0];

  for (let i = 0; i < indexedInstrs.length - 1; i++) {
    const { index: curIndex, instruction: curInstruction } = curIndexedInstr;
    const { index: nextIndex, instruction: nextInstruction } =
      indexedInstrs[i + 1];

    if (
      (curInstruction === "do()" && nextInstruction === "don't()") ||
      (curInstruction === "don't()" && nextInstruction === "do()")
    ) {
      if (curInstruction === "do()") {
        substrs.push(input.slice(curIndex, nextIndex));
      }

      curIndexedInstr = indexedInstrs[i + 1];
    }
  }

  return sum(extractNumPairs(substrs.join()));
};

const answers = {
  1: solvePartOne(input),
  2: solvePartTwo(input),
};

console.log(answers);
