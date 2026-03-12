import { addTeam, deleteTeam, loadTeams, resetTeam, updateTeam } from './actions';
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

  on(addTeam, (state: TeamState, { team }: { team: Team}) => ({
    ...state,
    teams: [...state.teams, team],
  })),

  on(updateTeam, (state: TeamState, { team }: { team: Team }) => ({
    ...state,
    teams: state.teams.map((t: Team) => (t.id === team.id ? team : t)),
  })),

  on(deleteTeam, (state: TeamState, { id }: { id: number }) => ({
    ...state,
    teams: state.teams.filter((team: Team) => team.id !== id),
  })),

  on(resetTeam, (state: TeamState, { id }: { id: number }) => {
      const originalTeam: Team | undefined = initialTeamState.teams.find((t: Team) => t.id === id);
      if (!originalTeam) {
        return state;
      }
      return {
        ...state,
        teams: state.teams.map((team: Team) => (team.id === id ? originalTeam : team)),
      };
    }),
);
