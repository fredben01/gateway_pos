import { CardRepository } from '../domain/card.repository';
import Card from '../domain/card';

export default class CardApplication {
  constructor(
    private readonly cardRepository: CardRepository
  ) {}

  insert(card: Card) {
    return this.cardRepository.insert(card);
  }

  listOne(token: string) {
    return this.cardRepository.listOne(token);
  }
}