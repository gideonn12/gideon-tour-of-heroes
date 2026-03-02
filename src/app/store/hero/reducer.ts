import { ActionReducer, createReducer, on } from '@ngrx/store';
import { addHero, deleteHero, loadHeroes, resetHero, updateHero } from './actions';
import { Hero } from '../../features/models/hero/hero';
import { HEROES } from '../../features/mocks/mock-heroes';

export interface HeroState {
  heroes: Hero[];
}

export const initialHeroState: HeroState = {
  heroes: [
    { id: 12, name: 'Dr. Nice' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr. IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' },
    { id: 1, name: 'Gabriel is the best' },
  ],
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
    const originalHero: Hero | undefined = HEROES.find((h: Hero) => h.id === id);

    if (!originalHero) {
      return state;
    }

    return {
      ...state,
      heroes: state.heroes.map((hero: Hero) => (hero.id === id ? originalHero : hero)),
    };
  }),
);
