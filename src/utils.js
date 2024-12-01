import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

/**
 * Reads the content of the input.txt file in the same directory as the calling file.
 * @param {string} callerModuleUrl - The `import.meta.url` of the calling script.
 * @returns {string|null} Content of the input file or null if the file doesn't exist.
 */
export const readInputFile = (callerModuleUrl) => {
  const callerDir = path.dirname(fileURLToPath(callerModuleUrl));
  const inputFilePath = path.join(callerDir, "input.txt");

  try {
    return fs.readFileSync(inputFilePath, "utf-8");
  } catch (error) {
    console.error("Error reading input.txt:", error.message);
    return null;
  }
};
