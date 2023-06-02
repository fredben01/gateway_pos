import { Context, Next } from "koa";
import { IError } from "../../../../helpers/ierror";
import yenv from 'yenv';

const env = yenv();

export class PkMiddleware {
  static isValidPk(ctx: Context, next: Next) {
    
    const { authorization } = ctx.request.headers;
  
    if(!authorization) {
      const error: IError = new Error("Unauthorized");
      error.status = 401;
      ctx.body = error;
      return next();
    } 
    else {
      const [bearer, pk] = authorization.split(" ");
      if(bearer.toLocaleLowerCase() !== "bearer" || !pk) {
        const error: IError = new Error("Unauthorized");
        error.status = 401;
        ctx.body = error;
        return next();
      }

      if (pk !== env.PK) {
        const error: IError = new Error("Invalid PK");
        ctx.body = error;
        return next();
      }

      ctx.pk = pk;
      return next();
    }
    
  }
}