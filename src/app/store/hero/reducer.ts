import { ActionReducer, createReducer, on } from '@ngrx/store';
import { addHero, deleteHero, loadHeroes, resetHero, updateHero } from './actions';
import { Hero } from '../../features/models/hero/hero';
import { INITIAL_HEROES } from '../../features/mocks/mock-heroes';

export interface HeroState {
  heroes: Hero[];
}

export const initialHeroState: HeroState = {
  heroes: INITIAL_HEROES,
};
export const heroReducer: ActionReducer<HeroState> = createReducer(
  initialHeroState,

  on(loadHeroes, (state: HeroState): { heroes: Hero[] } => ({
    ...state,
    heroes: [...state.heroes],
  })),

  on(addHero, (state: HeroState, { hero }: { hero: Hero }) => ({
    ...state,
    heroes: [...state.heroes, hero],
  })),

  on(updateHero, (state: HeroState, { hero }: { hero: Hero }) => ({
    ...state,
    heroes: state.heroes.map((h: Hero) => (h.id === hero.id ? hero : h)),
  })),

  on(deleteHero, (state: HeroState, { id }: { id: number }) => ({
    ...state,
    heroes: state.heroes.filter((hero: Hero) => hero.id !== id),
  })),

  on(resetHero, (state: HeroState, { id }: { id: number }): HeroState => {
    const originalHero: Hero | undefined = initialHeroState.heroes.find((h: Hero) => h.id === id);
    return {
      ...state,
      heroes: state.heroes.map((hero: Hero) => (hero.id === id ? originalHero : hero)!),
    };
  }),
);
