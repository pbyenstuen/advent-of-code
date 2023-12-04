import { input } from "./input.js";

const cardStrings = input.split('\n');

const removeEmptyStrings = stringsArr =>
  stringsArr.filter(str => str !== '');

const parseStrings = stringsArr =>
  stringsArr.map(str => parseInt(str));

const parseCards = cardStrings => {
  return cardStrings.map(cardString => {
    const nr = cardString.split(':')[0].split(' ')[1];
    const numbersString = cardString.split(':')[1];
    const winningNumbers = numbersString.split('|')[0].split(' ');
    const myNumbers = numbersString.split('|')[1].split(' ');

    return {
      nr: parseInt(nr),
      winningNumbers: parseStrings(removeEmptyStrings(winningNumbers)),
      myNumbers: parseStrings(removeEmptyStrings(myNumbers)),
    }
  })
}

const calculateCardValue = ({ winningNumbers, myNumbers }) => {
  return myNumbers.reduce((value, num) => {
    if (winningNumbers.includes(num)) {
      return value === 0 ? 1 : value * 2;
    } else {
      return value;
    }
  }, 0)
}

const solvePartOne = cardStrings => {
  const cards = parseCards(cardStrings);
  const cardValues = cards.map(card => calculateCardValue(card))

  return cardValues.reduce((sum, cur) => sum + cur);
}

const answers = {
  1: solvePartOne(cardStrings),
}

console.log(answers);