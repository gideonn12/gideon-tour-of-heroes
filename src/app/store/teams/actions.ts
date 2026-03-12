import { createAction, props } from '@ngrx/store';
import { Team } from '../../features/models/team/team';

export const loadTeams = createAction('[Team] Load Teams');

export const addTeam = createAction('[Team] Add Team', props<{ team: Team }>());

export const deleteTeam = createAction('[id] Delete Team', props<{ id: number }>());

export const resetTeam = createAction('[id] Reset Team', props<{ id: number }>());

export const updateTeam = createAction('[Team] Update Team', props<{ team: Team }>());