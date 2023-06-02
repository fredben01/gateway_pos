import jwt from 'jsonwebtoken';
import yenv from 'yenv';

const env = yenv();
export class CardService {
  constructor() {}

  static signin(pk:string) {
    const token = jwt.sign({
                    pk
                  }, env.TOKEN_SECRET);

    return token;
  }

  static verify(token:string){}
}