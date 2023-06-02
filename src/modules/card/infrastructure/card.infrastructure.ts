import Card from '../domain/card';
import { CardRepository } from '../domain/card.repository';
import RedisBootstrap from '../../../boostrap/redis.bootstrap';
import { CardService } from '../application/card.service';

export default class CardInfrastructure implements CardRepository {
  async insert(card: Card): Promise<Card> {
    return new Promise<Card>((resolve, reject) => {
      RedisBootstrap.set(card.properties().token, JSON.stringify(card));
      resolve(card);
    })
  }
  async listOne(token: string): Promise<Card | null>  {
    return await new Promise<Card | null>(async (resolve, reject) => {
      const card = await RedisBootstrap.get(token);

      if(!card) reject(null);
      else { 
        const newCard = JSON.parse(card);
        resolve(newCard);
      }
    })
  }

}