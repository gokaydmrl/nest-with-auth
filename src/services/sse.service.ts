import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SseService {
  private emitter = new EventEmitter();

  get stream$(): Observable<MessageEvent> {
    return fromEvent(this.emitter, 'message').pipe(
      map((data) => ({ data })),
    ) as Observable<MessageEvent>;
  }

  send(data: any) {
    this.emitter.emit('message', data);
  }
}
