import Card from './card';

export interface CardRepository {
  insert(card: Card): Promise<Card>;
  listOne(token: string): Promise<Card>;
}