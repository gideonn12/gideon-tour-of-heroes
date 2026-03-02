import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TeamState } from './reducer';

export const selectTeamState = createFeatureSelector<TeamState>('teams');

export const selectAllTeams = createSelector(selectTeamState, (state: TeamState) => state.teams);
