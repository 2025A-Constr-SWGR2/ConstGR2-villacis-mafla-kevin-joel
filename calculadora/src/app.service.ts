import { Injectable } from '@nestjs/common';
import { Console } from 'console';
import { get } from 'http';

@Injectable()
export class AppService {
  getHello(): string {
    //console.log('log!');
    //console.debug('debug!');
    //console.info('info!');
    console.warn('warn!');
    console.error('error!');
    return 'Hello World!';
  }
}

