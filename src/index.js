import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const specificDate = process.argv[2];
const now = new Date();

if (!specificDate && (now.getMonth() !== 11 || now.getDate() > 24)) {
  console.log('It is currently not Advent season. Please specify a date within Advent season (npm start <1-24>)');
  process.exit(1);
}

if (specificDate && !isNaN(specificDate) && (specificDate < 1 || specificDate > 24)) {
  console.log('Please provide a date within the Advent season (npm start <1-24>)');
  process.exit(1);
}

if (specificDate && isNaN(specificDate)) {
  console.log('Please provide a date within the Advent season (npm start <1-24>)');
  process.exit(1);
}

const currentModulePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentModulePath);

const date = specificDate
  ? specificDate
  : now.getDate();

const folderName = `december-${date}`;
const folderPath = path.join(currentDir, folderName);
const indexPath = path.join(folderPath, 'index.js');
const inputPath = path.join(folderPath, 'input.js');

if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
  fs.writeFileSync(indexPath, '');
  fs.writeFileSync(inputPath, '');
} else {
  console.log(`Running ${folderName}`)
  execSync(`node src/${folderName}`, { stdio: 'inherit' });
}