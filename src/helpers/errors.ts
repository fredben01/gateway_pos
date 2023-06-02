import { Context, Next } from "koa";

export default class {
  static notFound(ctx: Context, next: Next):void {
    // console.log('error')
    ctx.status = 404;
    ctx.body = "gg nomas";
    next();
  }
}