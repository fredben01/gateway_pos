import Router from "koa-router";
import Controller from "./controller";
import { MiddlewareInsert } from "./middleware/token.middleware";

const controller = new Controller();

class TokenRouter {
  readonly koaRouter;

  constructor() {
    this.koaRouter = new Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.koaRouter.post('/tokenization', ...MiddlewareInsert, controller.tokenization);
    this.koaRouter.get('/token', controller.token);
  }
}

export default new TokenRouter().koaRouter.routes();