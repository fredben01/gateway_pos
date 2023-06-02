import { Context, Next } from "koa";
import CardApplication from "../application/card.application";
import Card from '../domain/card';
import { TokenError } from "../application/enums/token-error.enum";

export default class {
  constructor(private application: CardApplication) {
    this.insert = this.insert.bind(this);
    this.listOne = this.listOne.bind(this);
  }

  async insert(ctx: Context, next: Next) {

    // console.log(ctx.pk);
    const createCard = this.createCard(ctx.request.body);
    const pk = ctx.pk;

    const card = new Card({...createCard, pk });
    const data = await this.application.insert(card);

    const {
      card_number,
      expiration_month,
      expiration_year,
      email,
      token,
    } = data.properties();

    ctx.body = { card_number, expiration_month, expiration_year, email, token }
  
    return next();
  }

  async listOne(ctx: Context, next: Next) {
    const headerToken = ctx.token;
    const data = await this.application.listOne(headerToken);

    if (data === TokenError.EXPIRED_TOKEN) {
      ctx.status = 401;
      ctx.body = {message: "Expire Token"}
      return next();
    }

    if(data === TokenError.NOT_EXIST) {
      ctx.status = 401;
      ctx.body = {message: "Not Exist"}
      return next();
    }

    if(data === TokenError.INVALID_PK) {
      ctx.status = 401;
      ctx.body = {message: "Invalid PK"}
      return next();
    }

    const newData = this.createCard(data)
    
    const {
      card_number,
      expiration_month,
      expiration_year,
      email,
      token
    } = newData;

    ctx.status = 200;
    ctx.body = {card_number, expiration_month, expiration_year, email, token}
    return next();

  }

  private createCard(data: any) {
    return {
      card_number: data.card_number,
      cvv: data.cvv,
      expiration_month: data.expiration_month,
      expiration_year: data.expiration_year,
      email: data.email,
      token: data.token === undefined ? '' : data.token
    }
  }

}