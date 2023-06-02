import { Context, Next } from 'koa';
import Router from 'koa-router';
// import { ExampleController } from './example.controller';
import Controller from './example.controller';


// const controller = new ExampleController();
const controller = new Controller();

class ExampleRouter {
  readonly post
  constructor() {
    this.post = new Router();
    this.mountRoutes();
  }
  
  mountRoutes() {
    // this.post.get('/1', (ctx:Context,next:Next) => ctx.body = "Hola Mundo");
    this.post.get('/1', controller.example);
    this.post.get('/2', controller.example2);
  }
}

export default new ExampleRouter().post.routes();