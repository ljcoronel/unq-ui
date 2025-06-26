import { User } from "./user.types";

export interface GameTag {
  id: string;
  name: string;
  image: {
    src: string;
  };
}

export interface GamePrice {
  currency: string;
  amount: number;
}

export interface Game {
  id: string;
  name: string;
  mainImage: string;
  tags: GameTag[];
  price: GamePrice;
}

export interface FullGame extends Game {
  description: string;
  multimedia: { url: string }[];
  requirement: Requirement;
  relatedGames: Game[];
  developer: { name: string };
  releaseDate: string;
  reviews: Review[];
  website: string;
}

export interface Review {
  id: string;
  isRecommended: boolean;
  text: string;
  game: Pick<Game, "id" | "name" | "mainImage">;
  user: Pick<User, "id" | "image" | "name">;
}

export interface Requirement {
  os: string[];
  processor: string;
  memory: Number;
  graphics: string[];
}
