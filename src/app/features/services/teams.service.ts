import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Team } from '../models/team/team';
import { selectAllTeams } from '../../store/teams/selector';

@Injectable()
export class TeamsService {
  private store: Store<any> = inject(Store);

  getTeams(): Observable<Team[]> {
    return this.store.select(selectAllTeams);
  }
}
