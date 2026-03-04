import { Hero } from '../hero/hero';

export interface Team {
  id: number;
  name: string;
  color: string;
  heroes: Hero[];
}
