import { input } from "./input.js";

const cardStrings = input.split('\n');

const removeEmptyStrings = stringsArr =>
  stringsArr.filter(str => str !== '');

const parseStrings = stringsArr =>
  stringsArr.map(str => parseInt(str));

const parseCards = cardStrings => {
  return cardStrings.map(cardStr => {
    const nr = cardStr.split(':')[0].split('Card')[1].trim();
    const numbersString = cardStr.split(':')[1];
    const winningNumbers = numbersString.split('|')[0].split(' ');
    const myNumbers = numbersString.split('|')[1].split(' ');

    return {
      nr: parseInt(nr),
      winningNumbers: parseStrings(removeEmptyStrings(winningNumbers)),
      myNumbers: parseStrings(removeEmptyStrings(myNumbers)),
    }
  })
}
const calculateCardValue = card =>
  card.myNumbers.reduce((value, num) =>
    card.winningNumbers.includes(num) ? (value === 0 ? 1 : value * 2) : value, 0);

const getMatchingNumbersCount = card =>
  card.myNumbers.reduce((count, num) =>
    card.winningNumbers.includes(num) ? count + 1 : count, 0)

const createRange = (start, length) => {
  const range = [];

  for (let i = 0; i < length; i++) {
    range.push(start + i);
  }

  return range;
}

const solvePartOne = cardStrings => {
  const cards = parseCards(cardStrings);
  const cardValues = cards.map(card =>
    calculateCardValue(card))

  return cardValues.reduce((sum, num) => sum + num);
}

const solvePartTwo = cardStrings => {
  const parsedCards = parseCards(cardStrings);
  let cards = [...parsedCards];
  let cardsCount = cards.length;

  while (cards.length) {
    const wonCards = [];

    for (const card of cards) {
      const wonCardNrs = createRange(card.nr + 1, getMatchingNumbersCount(card));
      wonCards.push(...parsedCards.filter(card => wonCardNrs.includes(card.nr)));
    }

    cards = wonCards;
    cardsCount += cards.length;
  }

  return cardsCount;
}

const answers = {
  1: solvePartOne(cardStrings),
  2: solvePartTwo(cardStrings),
}

console.log(answers);