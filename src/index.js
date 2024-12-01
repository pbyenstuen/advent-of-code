import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const [dayArg, yearArg] = process.argv.slice(2);

const now = new Date();
const currentDay = now.getUTCDate();
const currentMonth = now.getUTCMonth();
const currentYear = now.getUTCFullYear();

const validateDay = (day) => {
  const parsedDay = parseInt(day, 10);

  if (isNaN(parsedDay) || parsedDay < 1 || parsedDay > 24) {
    console.error(
      "Invalid day. Please provide a day between 1 and 24 (npm start <1-24>)."
    );
    process.exit(1);
  }

  return parsedDay.toString();
};

const validateYear = (year) => {
  const parsedYear = parseInt(year, 10);

  if (isNaN(parsedYear) || parsedYear > currentYear) {
    console.error(
      `Invalid year. Please provide a year before ${currentYear} (npm start <day> <year>).`
    );
    process.exit(1);
  }

  return parsedYear.toString();
};

if (!dayArg && (currentMonth !== 11 || currentDay > 24)) {
  console.error(
    "It is currently not Advent season. Please specify a day within Advent season (npm start <1-24>)."
  );

  process.exit(1);
}

const day = dayArg ? validateDay(dayArg) : currentDay.toString();
const year = yearArg ? validateYear(yearArg) : currentYear.toString();

const currentModulePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentModulePath);

const folderPath = path.join(currentDir, year, day);
const inputPath = path.join(folderPath, "input.txt");
const indexPath = path.join(folderPath, "index.js");

try {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });

    const indexBoilerplate = `import { readInputFile } from "../../utils.js";

const input = readInputFile(import.meta.url);
`;

    fs.writeFileSync(inputPath, "");
    fs.writeFileSync(indexPath, indexBoilerplate);
    console.log(`Created boilerplate for day ${day} of ${year}`);
  } else {
    console.log(`Running day ${day} of ${year}`);
    execSync(`node src/${year}/${day}`, { stdio: "inherit" });
  }
} catch (error) {
  console.error("Error creating or running folder:", error);
  process.exit(1);
}
