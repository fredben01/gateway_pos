import { Context, Next } from "koa";
import { IError } from "../../../../helpers/ierror";

export class TokenMiddleware {
  static isValidToken(ctx: Context, next: Next) {
    
    const { authorization } = ctx.request.headers;
  
    if(!authorization) {
      ctx.status = 401;
      ctx.body = {message: "Unauthorized"};
      return ctx;
    } 
    else {
      const [bearer, token] = authorization.split(" ");
      if(bearer.toLocaleLowerCase() !== "bearer" || !token) {
        ctx.status = 401;
        ctx.body = {message: "Unauthorized"};
        return ctx;
      }

      ctx.token = token;
      return next();
    }
    
  }
}