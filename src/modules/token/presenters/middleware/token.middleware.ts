import { Context, Next } from "koa";
import { TokenInsertValidator } from "../validators/token-insert.validator";
import { validate } from "class-validator";
import { IError } from "../../../../helpers/ierror";

interface Token {
  card_number?: number; 
  cvv?: number;
  expiration_month?: string;
  expiration_year?: string;
  email?: string;
}

export class TokenMiddleware {
  static async ValidateToken(ctx: Context, next: Next) {
    // if ( !ctx.request.body ) return next();

    const {
      card_number,
      cvv,
      expiration_month,
      expiration_year,
      email
    }:Token = ctx.request.body!;

    const tokenInsertValidator = new TokenInsertValidator();
    Object.assign(tokenInsertValidator, {
      card_number,
      cvv,
      expiration_month,
      expiration_year,
      email
    })

    const errors = await validate(tokenInsertValidator);
    if(errors.length > 0) {
      const listErrors = errors
                          .map((err: any) => err.constraints)
                          .map((err: any) => {
                            let messages = "";
                            Object.keys(err).forEach((prop: string) => {
                              messages += `${err[prop]}\n`;
                            });
                            return messages;
                          });

      const error: IError = new Error("Invalid parameters");
      error.status = 422;
      error.stackTrace = JSON.stringify(listErrors);

      // console.log({error})
      
      ctx.body = error;
      return ctx.body;
    }

    next();
  }
}

export const MiddlewareInsert: ((
  ctx: Context,
  next: Next
) => Promise<any>)[] = [TokenMiddleware.ValidateToken]