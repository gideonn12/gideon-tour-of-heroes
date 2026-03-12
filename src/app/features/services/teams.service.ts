import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Team } from '../models/team/team';
import { selectAllTeams } from '../../store/teams/selector';
import { loadTeams, updateTeam, deleteTeam, resetTeam, addTeam } from '../../store/teams/actions';

@Injectable()
export class TeamsService {
  private store: Store<any> = inject(Store);
  private teamsLength: number = 0;

  getTeams(): Observable<Team[]> {
    this.store.dispatch(loadTeams());
    return this.store.select(selectAllTeams);
  }

  getTeam(id: number): Observable<Team> {
    return this.store.select(selectAllTeams).pipe(map((teams: Team[]) => teams.find((team: Team) => team.id === id)!));
  }

  updateTeam(team: Team): void {
    this.store.dispatch(updateTeam({ team }));
  }

  deleteTeam(id: number): void {
    this.store.dispatch(deleteTeam({ id }));
  }

  resetTeam(id: number): void {
    this.store.dispatch(resetTeam({ id }));
  }

  addTeam(team: Team): void {
    this.store.dispatch(addTeam({ team }));
  }

  getTeamsLength(): number {
    this.store.select(selectAllTeams).subscribe((teams: Team[]) => this.teamsLength = teams.length);
    return this.teamsLength;
  }
}
