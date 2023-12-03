import { input } from "./input.js";

const gamesArr = input.split('\n');

const getSum = (numsArr) => numsArr.reduce((sum, cur) => sum + cur);
const getProduct = (numsArr) => numsArr.reduce((product, cur) => product * cur);

const solvePartOne = (gamesArr) => {
  const bag = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const possibleGames = gamesArr.map(game => {
    const id = parseInt(game.split(':')[0].replace('Game ', ''));
    const sets = game.split(': ')[1];
    const colorPicks = sets.replaceAll(';', ',').split(', ');

    const isPossible = colorPicks.every(pick => {
      const [count, color] = pick.split(' ');

      return bag[color] >= count;
    })

    return isPossible ? id : null;
  }).filter(id => id);

  return getSum(possibleGames);
}

const solvePartTwo = (gamesArr) => {
  const minBags = gamesArr.map(game => {
    const sets = game.split(': ')[1];
    const colorPicks = sets.replaceAll(';', ',').split(', ');

    const minBag = {
      red: 0,
      green: 0,
      blue: 0,
    };

    colorPicks.forEach(pick => {
      const [count, color] = pick.split(' ');
      const parsedCount = parseInt(count);

      if (minBag[color] < parsedCount) {
        minBag[color] = parsedCount;
      }
    });

    return minBag;
  });

  const powers = minBags.map(bag => getProduct(Object.values(bag)));

  return getSum(powers);
}

const answers = {
  1: solvePartOne(gamesArr),
  2: solvePartTwo(gamesArr),
};

console.log(answers);