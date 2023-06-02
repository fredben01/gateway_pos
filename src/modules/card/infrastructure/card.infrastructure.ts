import Card from '../domain/card';
import { CardRepository } from '../domain/card.repository';

export default class CardInfrastructure implements CardRepository {
  insert(card: Card): Promise<Card> {
    throw new Error('Method not implemented.');
  }
  listOne(token: string): Promise<Card> {
    throw new Error('Method not implemented.');
  }

}