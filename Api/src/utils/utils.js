export const transformGame = (game) => {
  const {
    description,
    multimedia,
    requirement,
    relatedGames,
    developer,
    releaseDate,
    reviews,
    esrb,
    website,
    ...simpleGame
  } = game;

  return { ...simpleGame, mainImage: simpleGame.mainImage.url };
};
