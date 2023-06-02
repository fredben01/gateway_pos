import Card from '../domain/card';
import { CardRepository } from '../domain/card.repository';
import RedisBootstrap from '../../../boostrap/redis.bootstrap';

export default class CardInfrastructure implements CardRepository {
  async insert(card: Card): Promise<Card> {
    RedisBootstrap.set(card.properties().token, JSON.stringify(card));
    return card;
  }
  listOne(token: string): Promise<Card> {
    throw new Error('Method not implemented.');
  }

}