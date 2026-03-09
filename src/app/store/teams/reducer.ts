import { loadTeams } from './actions';
import { createReducer, on } from '@ngrx/store';
import { Team } from '../../features/models/team/team';
import { INITIAL_TEAMS } from '../../features/mocks/mock-teams';

export interface TeamState {
  teams: Team[];
}

export const initialTeamState: TeamState = {
  teams: INITIAL_TEAMS,
};

export const teamsReducer = createReducer(
  initialTeamState,
  on(loadTeams, (state) => ({
    ...state,
    teams: [...state.teams],
  })),
);
