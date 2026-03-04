import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { loadHeroes } from './actions';

@Injectable()
export class HeroEffects {
  private actions$: Actions<any> = inject(Actions);

  logLoadHeroes$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadHeroes),
        tap(() => {
          console.log('Loading heroes ...');
          console.log('Heroes loading completed');
        }),
      ),
    { dispatch: false },
  );
}
