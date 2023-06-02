import { Context, Next } from "koa";
import CardApplication from "../application/card.application";
import { IError } from "../../../helpers/ierror";
import Card from '../domain/card';

export default class {
  constructor(private application: CardApplication) {
    this.insert = this.insert.bind(this);
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

  async getToken() {}

  private createCard(data: any) {
    return {
      card_number: data.card_number,
      cvv: data.cvv,
      expiration_month: data.expiration_month,
      expiration_year: data.expiration_year,
      email: data.email,
      token: ''
    }
  }
}