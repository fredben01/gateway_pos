import Application from 'koa';
import http from 'http';
import { Bootstrap } from './bootstrap';
import { AppService } from './app.service';

export default class extends Bootstrap {
  constructor(private readonly app:Application) {
    super();
  }

  initialize(): Promise<any> {
      return new Promise<any>((resolve, reject) => {
        const server = http.createServer(this.app.callback());

        server
          .listen(4000)
          .on("listening", () => {
            resolve("Promise resolve successfuly");
            console.log(`listening on port ${AppService.PORT}`);
          })
          .on("error", (error) => {
            reject(error);
            console.log(error);
          });

      });
  }

  close() {
    process.exit(0);
  }
}