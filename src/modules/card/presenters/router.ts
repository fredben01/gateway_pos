import Router from "koa-router";
import Controller from "./controller";
import { MiddlewareInsert } from "./middleware/card.middleware";
import { CardRepository } from "../domain/card.repository";
import CardInfrastructure from "../infrastructure/card.infrastructure";
import CardApplication from "../application/card.application";


const infrastructure: CardRepository = new CardInfrastructure();
const application = new CardApplication(infrastructure);
const controller = new Controller(application);

class TokenRouter {
  readonly koaRouter;

  constructor() {
    this.koaRouter = new Router();
    this.mountRoutes();
  }

  mountRoutes() {
    // this.koaRouter.post('/tokenization', ...MiddlewareInsert, controller.tokenization);
    // this.koaRouter.get('/token', controller.token);
    this.koaRouter.post('/tokenization', ...MiddlewareInsert, controller.insert);
  }
}

export default new TokenRouter().koaRouter.routes();