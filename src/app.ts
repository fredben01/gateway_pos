import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import json from 'koa-json';

class App {
  readonly koaApp: koa;

  constructor() {
    this.koaApp = new koa();
    this.mountMiddlewares();
  }

  mountMiddlewares() {
    this.koaApp.use(bodyparser());
    this.koaApp.use(json());
  }

  // mountRoutes():void {
  // }

}

export default new App().koaApp;