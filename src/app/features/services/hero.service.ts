import { inject, Injectable } from '@angular/core';
import { Hero } from '../models/hero/hero';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { MessageService } from './message.service';
import { Store } from '@ngrx/store';
import { selectAllHeroes } from '../../store/hero/selector';
import { deleteHero, loadHeroes, resetHero, updateHero, addHero, } from "../../store/hero/actions";

@Injectable()
export class HeroService {
  private messageService: MessageService = inject(MessageService);
  private store: Store<any> = inject(Store);

  getHeroes(): Observable<Hero[]> {
    this.sendMessage();
    this.store.dispatch(loadHeroes());
    return this.store.select(selectAllHeroes);
  }

  sendMessage(): void {
    this.messageService.add('HeroService: fetched heroes');
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return this.store.select(selectAllHeroes).pipe(map((heroes: Hero[]) => heroes.find((hero: Hero) => hero.id === id)!));
  }

  updateHero(hero: Hero): void {
    this.store.dispatch(updateHero({ hero }));
  }

  deleteHero(id: number): void {
    this.store.dispatch(deleteHero({ id }));
  }

  resetHero(id: number): void {
    this.store.dispatch(resetHero({ id }));
  }

  addHero(hero: Hero): void {
    this.store.dispatch(addHero({ hero }));
  }
}
