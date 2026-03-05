import { Component, inject, OnInit, signal, WritableSignal, computed } from '@angular/core';
import { Team } from '../../models/team/team';
import { Hero } from '../../models/hero/hero';
import { loadTeams } from '../../../store/teams/actions';
import { loadHeroes } from '../../../store/hero/actions';
import { Store } from '@ngrx/store';
import { selectAllTeams } from '../../../store/teams/selector';
import { selectAllHeroes } from '../../../store/hero/selector';
import { UpperCasePipe } from '@angular/common';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-teams',
  imports: [UpperCasePipe],
  providers: [HeroService],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
})
export class TeamsComponent implements OnInit {
  teams = signal<Team[]>([]);
  heroes = signal<Hero[]>([]);
  private store: Store<any> = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(loadTeams());
    this.store.dispatch(loadHeroes());
    this.store.select(selectAllTeams).subscribe((teams: Team[]) => this.teams.set(teams));
    this.store.select(selectAllHeroes).subscribe((heroes: Hero[]) => this.heroes.set(heroes));
  }

  teamsWithHeroes = computed(() => {
    const allHeroes = this.heroes();
    return this.teams().map(team => ({
      ...team,
      teamHeroes: allHeroes.filter(hero => team.heroIds.includes(hero.id))
    }));
  });
}
