import { createSelector, createFeatureSelector } from '@ngrx/store';
import { HeroState } from './reducer';

export const selectHeroState = createFeatureSelector<HeroState>('hero');

export const selectAllHeroes = createSelector(selectHeroState, (state: HeroState) => state.heroes);
