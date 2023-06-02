import { Context, Next } from "koa";
import CardApplication from "../application/card.application";

export default class {
  constructor(private application: CardApplication) {
    this.insert = this.insert.bind(this);
  }

  // tokenization(ctx: Context, next: Next): void {
  //   console.log('controller')
  //   ctx.body = ctx.request.body
  //   next();
  // }

  // token(ctx: Context, next: Next) {
  //   ctx.body = "token";
  //   next();
  // }

  async insert({request: req, response: res}: Context, next: Next) {
    console.log(req.body);
    console.log(req.headers);
  } 


}