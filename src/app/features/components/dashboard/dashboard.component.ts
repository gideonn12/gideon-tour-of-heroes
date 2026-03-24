import {Component, computed, inject, OnInit, signal} from '@angular/core';
import { Hero } from '../../models/hero/hero';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { TeamsService } from '../../services/teams.service';
import { HeroService } from '../../services/hero.service';
import { Team } from '../../models/team/team';
import { appRoutes } from '../../../app/app.routes';
import {InputText} from "primeng/inputtext";

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, Button, Card, InputText],
  providers: [HeroService, TeamsService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  heroes = signal<Hero[]>([]);
  teams = signal<Team[]>([]);
  searchQuery = signal<String>("");

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

  filteredTeams = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) {
      return this.teams();
    }

    return this.teams().filter(team => team.name.toLowerCase().includes(query));
  });

  filteredHeroes = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) {
      return this.heroes();
    }

    return this.heroes().filter(hero => hero.name.toLowerCase().includes(query));
  })
}