import yenv from 'yenv';

const env = yenv();

export class AppService {
  static get PORT():number {
    return +env.PORT || 4000;
  }
}