import jwt from 'jsonwebtoken';
import yenv from 'yenv';
import { TokenError } from './enums/token-error.enum';

const env = yenv();

interface JwtPayload {
  pk?: string;
  iat?: number;
  exp?: number;
}
export class CardService {
  constructor() {}

  static signin(pk:string) {
    const token = jwt.sign({pk}, env.TOKEN_SECRET, {expiresIn: env.TOKEN_EXPIRATION});
    return token;
  }

  static verify(token:string){
    try {
      const decode = jwt.verify(token, env.TOKEN_SECRET) as JwtPayload;
      if(!decode.pk) return TokenError.NOT_EXIST;
      if(decode.pk !== env.PK) return TokenError.INVALID_PK;
      return decode;
    } catch (error) {
      return TokenError.EXPIRED_TOKEN;
    }
  }
}