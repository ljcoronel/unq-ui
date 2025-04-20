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

  login = async (req, res) => {
    try{
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

      return res.status(200).header(HEADER, token).json(this.userTransform(user));
    }
    catch(error){
      if(error.name === 'ValidationError'){
        return res.status(400).json({ error: error.message });        
      } else {
        return res.status(500).json({ error: error.message });        
      }
    }
  };

  register = async (req, res) => {
    try {
      const newUser = await registerBodySchema.validate(req.body);

      const user = this.service.addNewUser(newUser);

      const token = this.tokenController.generateToken(user.id);

      return res.status(201).header(HEADER, token).json(this.userTransform(user));
    } catch (error) {
      if(error.name === 'ValidationError' || error.name === 'UserException'){
        return res.status(400).json({ error: error.message });        
      } else {
        return res.status(500).json({ error: error.message });        
      }
    }
  };

  getCurrentUser = async (req, res) => {
    const { id } = req.user;
    const user = this.service.users.find((user) => user.id === id);

    res.status(200).json(this.userTransform(user));
  };

  getCurrentCart = async (req, res) => {
    const { id } = req.user;
    const { games } = await this.service.getCart(id);
    const user = this.service.users.find((user) => user.id === id);
    res.status(200).json({
      games: games.map((game) => transformGame(game)),
      user: {
        id,
        name: user.name,
        image: user.image,
      },
    });
  };

  getUserById = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await this.service.getUser(userId);
      res.status(200).json(this.userTransform(user));
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  getFriendsOfUser = async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await this.service.getUser(userId);
      const friends = user.friends.map((userFriend) =>
        this.userTransform(userFriend)
      );

      res.status(200).json(friends);
    } catch (error) {
      res.status(404).json({ error: error.message });
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
      const simpleFriends = newUser.friends.map((user) => this.userTransform(user))

      res.status(200).json(simpleFriends);
    } catch (error) {
      if (error.message === "User not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  };
}

export default UserController;
