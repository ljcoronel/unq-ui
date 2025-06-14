import { Review } from "./games.types";

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

export interface UserGame {
  id: string;
  mainImage: string;
  name: string;
  price: UserGamePrice;
  tags: UserTag[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  games: UserGame[];
  tags: UserTag[];
  reviews: Review[];
}
