export interface Game {
    _id?: string;
    name: string;
    price: number;
    category: string;
  }

export interface GameInput {
  name: string;
  price: number;
  category: string;
}