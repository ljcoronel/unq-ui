import { object, string } from "yup";

import { HEADER } from "../constants.js";
import { transformGame } from "../utils/utils.js";

const registerBodySchema = object({
  name: string().required(),
  email: string().email().required(),
  password: string().required(),
  image: string().url().required(),
  backgroundImage: string().url().required(),
})
  .noUnknown(true)
  .strict();

const loginBodySchema = object({
  email: string().email().required(),
  password: string().required(),
})
  .noUnknown(true)
  .strict();

class UserController {
  constructor(service, tokenController) {
    this.service = service;
    this.tokenController = tokenController;
  }

  loggedUserTransform = (user) => ({
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

  login = async (req, res) => {
    const { email, password } = await loginBodySchema.validate(req.body);

    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const user = this.service.users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = this.tokenController.generateToken(user.id);

    res.status(201).header(HEADER, token).json(this.loggedUserTransform(user));
  };

  register = async (req, res) => {
    try {
      const newUser = await registerBodySchema.validate(req.body);
      const user = this.service.addNewUser(newUser);
      const token = this.tokenController.generateToken(user.id);
      res
        .status(201)
        .header(HEADER, token)
        .json(this.loggedUserTransform(user));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getCurrentUser = async (req, res) => {
    const { id } = req.user;
    const user = this.service.users.find((user) => user.id === id);

    res.json(this.loggedUserTransform(user));
  };

  getCurrentCart = async (req, res) => {
    const { id } = req.user;
    try {
      const { games } = await this.service.getCart(id);
      const user = this.service.users.find((user) => user.id === id);
      res.json({
        games: games.map((game) => transformGame(game)),
        user: {
          id,
          name: user.name,
          image: user.image,
        },
      });
    } catch (error) {
      res.status(400).json({ error: "Error getting cart" });
    }
  };

  getUserById = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await this.service.getUser(userId);
      res.json(this.loggedUserTransform(user));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getFriendsOfUser = async (req, res) => {
    const { userId } = req.params;
    try {
      const users = await this.service.users;
      const user = users.find((user) => user.id === userId);
      const friends = user.friends.map(userFriend => this.loggedUserTransform(userFriend));

      res.json(friends);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  addOrRemoveUserFriend = async (req, res) => {
    const { id } = req.user;
    const loggedUserId = id;
    const { userId } = req.params;

    try {
      const newUser = await this.service.addOrRemoveFriend(
        loggedUserId,
        userId
      );

      const { id, email, name, image, friends } = newUser;
      const formattedFriends = friends.map(({ id, name, email, image }) => ({
        id,
        name,
        email,
        image,
      }));
      res.json({
        user: { id, email, name, image },
        friends: formattedFriends,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}

export default UserController;
