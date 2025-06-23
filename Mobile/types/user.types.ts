import { Game, Review } from "./games.types";

export interface UserTag {
  id: string;
  name: string;
  image: {
    src: string;
  };
}

export interface UserGamePrice {
  [key: string]: any;
}

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  games: Game[];
  tags: UserTag[];
  reviews: Review[];
}
