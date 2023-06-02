import { CardRepository } from '../domain/card.repository';
import Card from '../domain/card';
import { CardService } from './card.service';
import { TokenError } from './enums/token-error.enum';
import { isObject } from 'class-validator';

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

    const valid = CardService.verify(token);

    if (!isObject(valid)) return valid;

    return this.cardRepository.listOne(token);
  }
}