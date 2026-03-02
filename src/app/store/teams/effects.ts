import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { loadTeams } from './actions';

export class TeamsEffects {
  private actions$ = inject(Actions);

  logLoadTeams$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadTeams),
        tap(() => console.log('Loading Teams ...')),
        tap(() => console.log('Teams loading completed')),
      ),
    { dispatch: false },
  );
}
