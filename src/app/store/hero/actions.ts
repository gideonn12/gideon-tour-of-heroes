import { createAction, props } from '@ngrx/store';
import { Hero } from '../../features/models/hero/hero';

export const loadHeroes = createAction('[Hero] Load Heroes');

export const addHero = createAction('[Hero] Add Hero', props<{ hero: Hero }>());

export const updateHero = createAction('[Hero] Update Hero', props<{ hero: Hero }>());

export const deleteHero = createAction('[id] Delete Hero', props<{ id: number }>());

export const resetHero = createAction('[id] Reset Hero', props<{ id: number }>());
