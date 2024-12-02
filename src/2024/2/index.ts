import { readInputFile } from "../../utils.js";

const input = readInputFile(2024, 2);

const parseReports = (input: string): number[][] =>
  input.split("\n").map((line) => line.split(" ").map(Number));

const reports = parseReports(input);

const isMonotonic = (report: number[], increasing: boolean): boolean =>
  report.every((level, index) =>
    index === 0
      ? true
      : increasing
      ? level > report[index - 1]
      : level < report[index - 1]
  );

const hasLargeLevelDifference = (report: number[]): boolean =>
  report.some(
    (level, index) => index > 0 && Math.abs(level - report[index - 1]) > 3
  );

const isReportSafe = (report: number[]): boolean =>
  (isMonotonic(report, true) || isMonotonic(report, false)) &&
  !hasLargeLevelDifference(report);

const removeAtIndex = (array: number[], index: number): number[] => [
  ...array.slice(0, index),
  ...array.slice(index + 1),
];

const solvePartOne = (reports: number[][]): number =>
  reports.filter(isReportSafe).length;

const solvePartTwo = (reports: number[][]): number =>
  reports.filter((report) =>
    report.some((_, index) => isReportSafe(removeAtIndex(report, index)))
  ).length;

const answers = {
  1: solvePartOne(reports),
  2: solvePartTwo(reports),
};

console.log(answers);
