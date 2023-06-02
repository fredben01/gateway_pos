import { Context, Next } from "koa";
import { IError } from "../../../../helpers/ierror";
import yenv from 'yenv';

const env = yenv();

export class PkMiddleware {
  static isValidPk(ctx: Context, next: Next) {
    
    const { authorization } = ctx.request.headers;
  
    if(!authorization) {
      ctx.status = 401;
      ctx.body = {
        message: "Unauthorized"
      };
      return ctx;
    } 
    else {
      const [bearer, pk] = authorization.split(" ");
      if(bearer.toLocaleLowerCase() !== "bearer" || !pk) {
        ctx.status = 401;
        ctx.body = {
          message: "Unauthorized"
        };
        return ctx;
      }

      if (pk !== env.PK) {
        ctx.status = 401;
        ctx.body = {
          message: "Invalid PK"
        };
        return ctx;
      }

      ctx.pk = pk;
      return next();
    }
    
  }
}