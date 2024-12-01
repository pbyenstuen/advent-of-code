import fs from "fs";
import path from "path";

/**
 * Reads the content of the `input.txt` file for a given year and day.
 * The file is expected to be located under the `src/{year}/{day}/input.txt` directory.
 *
 * @param {number} year - The year (e.g., 2024) of the Advent day folder.
 * @param {number} day - The day (e.g., 1) of the Advent season, within the year folder.
 * @returns {string|null} The content of the `input.txt` file, or empty string if the file doesn't exist or an error occurs.
 */
export const readInputFile = (year: number, day: number): string => {
  const inputFilePath = path.join("src", `${year}`, `${day}`, "input.txt");

  try {
    return fs.readFileSync(inputFilePath, "utf-8");
  } catch (error) {
    console.error("Error reading input.txt:", error);
    return "";
  }
};
