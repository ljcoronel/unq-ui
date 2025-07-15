import { HEADER } from "../constants.js";
import { transformGame } from "../utils/utils.js";
import {
  loginBodySchema,
  registerBodySchema,
} from "../validators/user.validators.js";

class UserController {
  constructor(service, tokenController) {
    this.service = service;
    this.tokenController = tokenController;
  }

  userTransform = (user) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    image: user.image,
    backgroundImage: user.backgroundImage,
    games: user.games.map((game) => ({
      id: game.id,
      name: game.name,
      mainImage: game.mainImage.url,
      tags: game.tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
        image: {
          src: tag.image.src,
        },
      })),
      price: {
        amount: game.price.amount,
        currency: game.price.currency,
      },
    })),
  });

  userTransformWithReviews = (user) => ({
    ...this.userTransform(user),
    reviews: this.service.getUserReviews(user.id).map((review) => ({
      id: review.id,
      isRecommended: review.isRecommended,
      text: review.text,
      game: {
        id: review.game.id,
        name: review.game.name,
        mainImage: review.game.mainImage.url,
      }, 
    })),
  });

  login = async (req, res, next) => {
    try {
      const { email, password } = await loginBodySchema.validate(req.body);

      const user = this.service.users.find(
        (user) => user.email === email && user.password === password
      ); 
 
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const token = this.tokenController.generateToken(user.id);

      return res
        .status(200)
        .header(HEADER, token)
        .json(this.userTransform(user));
    } catch (error) {
      next(error);
    }
  };

  register = async (req, res, next) => {
    try {
      const newUser = await registerBodySchema.validate(req.body);
 
      const user = this.service.addNewUser(newUser);

      const token = this.tokenController.generateToken(user.id);

      return res
        .status(201)
        .header(HEADER, token)
        .json(this.userTransform(user));
    } catch (error) {
      next(error);
    }
  };

  getCurrentUser = async (req, res) => {
    const { id } = req.user;
    const user = this.service.users.find((user) => user.id === id);

    return res.status(200).json(this.userTransform(user));
  };

  getCurrentCart = async (req, res) => {
    const { id } = req.user;
    const { games } = await this.service.getCart(id);
    const user = this.service.users.find((user) => user.id === id);
    return res.status(200).json({
      games: games.map((game) => transformGame(game)),
      user: {
        id,
        name: user.name,
        image: user.image,
      },
    });
  };

  getUserById = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await this.service.getUser(userId);
      return res.status(200).json(this.userTransformWithReviews(user));
    } catch (error) {
      next(error);
    }
  };

  getFriendsOfUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
      const user = await this.service.getUser(userId);
      const friends = user.friends.map((userFriend) =>
        this.userTransform(userFriend)
      );

      return res.status(200).json(friends);
    } catch (error) {
      next(error);
    }
  };

  addOrRemoveUserFriend = async (req, res, next) => {
    const { id } = req.user;
    const loggedUserId = id;
    const { userId } = req.params;

    try {
      const newUser = await this.service.addOrRemoveFriend(
        loggedUserId,
        userId
      );
      const simpleFriends = newUser.friends.map((user) =>
        this.userTransform(user)
      );

      return res.status(200).json(simpleFriends);
    } catch (error) {
     next(error);
    }
  };
}

export default UserController;
