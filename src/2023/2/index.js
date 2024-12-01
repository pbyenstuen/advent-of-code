import { input } from "./input.js";

const gameStrings = input.split('\n');

const parseGames = gameStrings => {
  return gameStrings.map(gameStr => {
    const nr = parseInt(gameStr.split(':')[0].replace('Game ', ''));
    const setStrings = gameStr.split(': ')[1].split('; ');

    const sets = setStrings.map(setStr => {
      const colorCountMaps =
        setStr.split(', ').map(setStr => setStr.split(' '));

      return colorCountMaps.reduce((set, [count, color]) =>
        Object.assign(set, { [color]: parseInt(count) }), {});
    });

    return { nr, sets };
  })
}

const getSum = numbers =>
  numbers.reduce((sum, num) => sum + num);

const getProduct = numbers =>
  numbers.reduce((product, num) => product * num);

const isSetPossible = (set, bagOfCubes) =>
  Object.entries(set).every(([color, count]) =>
    bagOfCubes[color] >= count);

const isGamePossible = (game, bagOfCubes) =>
  game.sets.every(set => isSetPossible(set, bagOfCubes));

const getPossibleGames = (games, bagOfCubes) => games
  .filter(game => isGamePossible(game, bagOfCubes))
  .map(game => game.nr);

const getMinPossibleBagOfCubes = game => {
  return game.sets.reduce((bag, set) => {
    Object.entries(set).forEach(([color, count]) => {
      bag[color] = Math.max(bag[color], parseInt(count));
    });

    return bag;
  }, {
    red: 0,
    green: 0,
    blue: 0,
  });
};

const solvePartOne = gameStrings => {
  const bagOfCubes = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const games = parseGames(gameStrings);
  const possibleGames = getPossibleGames(games, bagOfCubes);

  return getSum(possibleGames);
}

const solvePartTwo = gameStrings => {
  const games = parseGames(gameStrings);
  const minBags = games.map(game =>
    getMinPossibleBagOfCubes(game));

  return getSum(minBags.map(bag =>
    getProduct(Object.values(bag))));
};

const answers = {
  1: solvePartOne(gameStrings),
  2: solvePartTwo(gameStrings),
};

console.log(answers);