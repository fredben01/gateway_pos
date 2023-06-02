import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import json from 'koa-json';
import Router from 'koa-router';
// import ExampleRouter from './modules/example/interfaces/example.route';
import TokenRouter from './modules/token/presenters/router';
import HandlerErrors from './helpers/errors';

const router = new Router();

class App {
  readonly koaApp: koa;

  constructor() {
    this.koaApp = new koa();
    this.mountRoutes();
    this.mountMiddlewares();
    this.mountErrors();
  }

  mountMiddlewares() {
    this.koaApp.use(bodyparser());
    this.koaApp.use(json());
    this.koaApp.use(router.routes()).use(router.allowedMethods);
  }



  mountRoutes():void {
    // router.get('/example', (ctx, next) => {
    //   ctx.body = "Hola mundo";
    // })
    // const post = new Router();

    // post.get('/1', ctx => ctx.body = "Hola Mundo");
    // router.use('/example', post.routes());
    // router.use('/example', ExampleRouter);
    router.use('/tokens', TokenRouter);
  }

//   var forums = new Router();
// var posts = new Router();

// posts.get('/', (ctx, next) => {...});
// posts.get('/:pid', (ctx, next) => {...});
// forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());

// // responds to "/forums/123/posts" and "/forums/123/posts/123"
// app.use(forums.routes());

  mountErrors(): void {
    // this.koaApp.use(async (ctx, next) => {
    //   try {
    //     await Promise.reject('error');
    //   } catch (err) {
    //     ctx.status = 500;
    //     ctx.body = "err.message";
    //     ctx.app.emit('error', err, ctx);
    //   }

    //   this.koaApp.on('error', (err, ctx) => {
    //     console.log(err);
    //   });
    // });
    this.koaApp.use(HandlerErrors.notFound);
    // router.use('**',HandleErrors.notFound);
  }

}

export default new App().koaApp;