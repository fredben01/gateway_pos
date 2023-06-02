import { Context, Next } from "koa";

export default class {
  constructor() {
  }

  async example(ctx: Context,next: Next) {
    // console.log('11111');
    ctx.body = "Hola mundo";
    next();
  }

  async example2(ctx: Context, next: Next) {
    ctx.body = "otro ejemplo";
    next();
  }
}