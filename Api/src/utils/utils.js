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

export const transformReview = (review) => {
  const { game, user, ...simpleReview } = review;
  const { id, name, image } = user;
  return { ...simpleReview, user: { id, name, image }, game: transformGame(game) };
}
