import { readInputFile } from "../../utils.js";

const input = readInputFile(2024, 4);

const lines = input.split("\n");

const XMAS = "XMAS";
const MAS = "MAS";

const isCorrectString = (str: string, correctStr: string): boolean =>
  str === correctStr || str.split("").toReversed().join("") === correctStr;

const solvePartOne = (lines: string[]): number => {
  const vertical = (y: number, x: number, up = true): string => {
    const chars = XMAS.split("").map((_, index) => {
      const line = up ? lines[y - index] : lines[y + index];
      return line ? line[x] : "";
    });

    return chars.join("");
  };

  const horizontal = (y: number, x: number, right = true): string =>
    right ? lines[y].slice(x, x + 4) : lines[y].slice(x - 3, x + 1);

  const diagonal = (
    y: number,
    x: number,
    vertDir: "up" | "down",
    horizDir: "left" | "right"
  ): string => {
    const chars = XMAS.split("").map((_, index) => {
      const line = vertDir === "up" ? lines[y - index] : lines[y + index];
      return line
        ? horizDir === "right"
          ? line[x + index]
          : line[x - index]
        : "";
    });

    return chars.join("");
  };

  return lines.flatMap((line, y) =>
    line.split("").flatMap((char, x) => {
      if (char !== "X") return [];
      return Object.values({
        right: horizontal(y, x),
        left: horizontal(y, x, false),
        up: vertical(y, x),
        down: vertical(y, x, false),
        upLeft: diagonal(y, x, "up", "left"),
        upRight: diagonal(y, x, "up", "right"),
        downLeft: diagonal(y, x, "down", "left"),
        downRight: diagonal(y, x, "down", "right"),
      }).filter((substr) => isCorrectString(substr, XMAS));
    })
  ).length;
};

const solvePartTwo = (lines: string[]): number => {
  const diagonal = (y: number, x: number, right = true): string[] => {
    const getChar = (line: string | undefined, offset: number): string =>
      line ? line[x + offset] : "";

    const aboveChar = getChar(lines[y - 1], right ? 1 : -1);
    const belowChar = getChar(lines[y + 1], right ? -1 : 1);

    return [aboveChar, belowChar];
  };

  const isXmasCross = (y: number, x: number): boolean => {
    const [rightAbove, rightBelow] = diagonal(y, x, true);
    const [leftAbove, leftBelow] = diagonal(y, x, false);

    const rightDiagonalSubstr = [rightAbove, "A", rightBelow].join("");
    const leftDiagonalSubstr = [leftAbove, "A", leftBelow].join("");

    return (
      isCorrectString(rightDiagonalSubstr, MAS) &&
      isCorrectString(leftDiagonalSubstr, MAS)
    );
  };

  const getXmasCrossCount = (line: string, y: number): number =>
    line
      .split("")
      .reduce(
        (count, char, x) =>
          char === "A" ? count + (isXmasCross(y, x) ? 1 : 0) : count,
        0
      );

  return lines.reduce(
    (count, line, y) => count + getXmasCrossCount(line, y),
    0
  );
};

const answers = {
  1: solvePartOne(lines),
  2: solvePartTwo(lines),
};

console.log(answers);
