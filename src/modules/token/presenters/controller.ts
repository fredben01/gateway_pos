import { Context, Next } from "koa";

export default class {
  constructor() {

  }

  tokenization(ctx: Context, next: Next) {
    console.log('controller')
    ctx.body = ctx.request.body
    next();
  }

  token(ctx: Context, next: Next) {
    ctx.body = "token";
    next();
  }
}