import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Team } from '../models/team/team';
import { selectAllTeams } from '../../store/teams/selector';
import { loadTeams } from "../../store/teams/actions";

@Injectable()
export class TeamsService {
  private store: Store<any> = inject(Store);

  getTeams(): Observable<Team[]> {
    this.store.dispatch(loadTeams());
    return this.store.select(selectAllTeams);
  }
}
