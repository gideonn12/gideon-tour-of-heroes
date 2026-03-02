import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class MessageService {
  messages: string[] = [];

  add(message: string): void {
    this.messages.push(message);
  }

  clear(): void {
    this.messages = [];
  }

  getMessages(): Observable<string[]> {
    return of(this.messages);
  }
}
