import { CardRepository } from '../domain/card.repository';
import Card from '../domain/card';
import { CardService } from './card.service';

export default class CardApplication {
  constructor(
    private readonly cardRepository: CardRepository
  ) {}

  insert(card: Card) {
    const token = CardService.signin(card.properties().pk);
    card.setToken(token);
    return this.cardRepository.insert(card);
  }

  listOne(token: string) {
    return this.cardRepository.listOne(token);
  }
}