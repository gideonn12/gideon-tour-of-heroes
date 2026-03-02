import { Component, inject, OnInit, signal } from '@angular/core';
import { Hero } from '../../models/hero/hero';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { TeamsService } from '../../services/teams.service';
import { HeroService } from '../../services/hero.service';
import { Team } from '../../models/team/team';
import { appRoutes } from '../../../app/app.routes';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, Button, Card],
  providers: [HeroService, TeamsService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  heroes = signal<Hero[]>([]);
  teams = signal<Team[]>([]);

  readonly appRoutes = appRoutes;
  private readonly START_INDEX = 0;
  private readonly END_INDEX = 5;

  private readonly heroService = inject(HeroService);
  private readonly teamsService = inject(TeamsService);

  ngOnInit(): void {
    this.getHeroes();
    this.getTeams();
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe((heroes) => this.heroes.set(heroes.slice(this.START_INDEX, this.END_INDEX)));
  }

  getTeams(): void {
    this.teamsService
      .getTeams()
      .subscribe((teams) => this.teams.set(teams.slice(this.START_INDEX, this.END_INDEX)));
  }
}
