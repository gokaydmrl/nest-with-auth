import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SseService {
  private emitter = new EventEmitter();

  stream$(username: string): Observable<MessageEvent> {
    return fromEvent(this.emitter, username).pipe(
      map((data) => ({ data })),
    ) as Observable<MessageEvent>;
  }

  send(data: any, username: string) {
    this.emitter.emit(username, data);
  }
}
