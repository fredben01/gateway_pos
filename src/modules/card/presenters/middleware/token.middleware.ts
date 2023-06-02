import { Context, Next } from "koa";
import { IError } from "../../../../helpers/ierror";

export class TokenMiddleware {
  static isValidToken(ctx: Context, next: Next) {
    
    const { authorization } = ctx.request.headers;
  
    if(!authorization) {
      const error: IError = new Error("Unauthorized");
      error.status = 401;
      ctx.body = error;
      return next();
    } 
    else {
      const [bearer, token] = authorization.split(" ");
      if(bearer.toLocaleLowerCase() !== "bearer" || !token) {
        const error: IError = new Error("Unauthorized");
        error.status = 401;
        ctx.body = error;
        return next();
      }

      ctx.token = token;
      return next();
    }
    
  }
}