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

export interface Review {
  id: string;
  isRecommended: boolean;
  text: string;
  game: Pick<Game, "id" | "name" | "mainImage">;
}
