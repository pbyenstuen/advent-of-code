import { readInputFile } from "../../utils.js";

const input = readInputFile(2024, 5);

const parseData = (data: "rules" | "updates", input: string): number[][] =>
  input
    .split("\n\n")
    [data === "rules" ? 0 : 1].split("\n")
    .map((str) => str.split(data === "rules" ? "|" : ","))
    .map((str) => str.map(Number));

const rules = parseData("rules", input);
const updates = parseData("updates", input);

const getMustBeBeforePages = (page: number): number[] =>
  rules.filter((rule) => page === rule[1]).map((rule) => rule[0]);

const getPagesAfter = (pageIndex: number, update: number[]): number[] =>
  update.filter((_, index) => index > pageIndex);

const getWronglyPositionedPages = (
  pages: number[],
  mustBeBeforePages: number[]
): number[] => pages.filter((page) => mustBeBeforePages.includes(page));

const updateUpdate = (
  update: number[],
  pageIndex: number,
  wronglyPositionedPages: number[]
): number[] => {
  const filteredUpdate = update.filter(
    (page) => !wronglyPositionedPages.includes(page)
  );

  return [
    ...filteredUpdate.slice(0, pageIndex),
    ...wronglyPositionedPages,
    ...filteredUpdate.slice(pageIndex),
  ];
};

const add = (nums: number[]) => nums.reduce((sum, cur) => sum + cur, 0);

const solvePartOne = (updates: number[][]): number => {
  const validUpdates = updates.filter(
    (update) =>
      !update.some(
        (page, pageIndex) =>
          getWronglyPositionedPages(
            getPagesAfter(pageIndex, update),
            getMustBeBeforePages(page)
          ).length
      )
  );

  return add(validUpdates.map((update) => update[(update.length - 1) / 2]));
};

const solvePartTwo = (updates: number[][]): number => {
  const invalidUpdates = updates.filter((update) =>
    update.some(
      (page, pageIndex) =>
        getWronglyPositionedPages(
          getPagesAfter(pageIndex, update),
          getMustBeBeforePages(page)
        ).length
    )
  );

  const fixedUpdates = invalidUpdates.map((originalUpdate) =>
    originalUpdate.reduce((update, page) => {
      const pageIndex = update.indexOf(page);
      const pagesAfter = getPagesAfter(pageIndex, update);
      const mustBeBeforePages = getMustBeBeforePages(page);

      const wrongPages = getWronglyPositionedPages(
        pagesAfter,
        mustBeBeforePages
      );

      return wrongPages.length
        ? updateUpdate(update, pageIndex, wrongPages)
        : update;
    }, originalUpdate)
  );

  return add(fixedUpdates.map((update) => update[(update.length - 1) / 2]));
};

const answers = {
  1: solvePartOne(updates),
  2: solvePartTwo(updates),
};

console.log(answers);
