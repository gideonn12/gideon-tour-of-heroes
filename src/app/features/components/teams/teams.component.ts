import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { Team } from '../../models/team/team';
import { Hero } from '../../models/hero/hero';
import { UpperCasePipe } from '@angular/common';
import { HeroService } from '../../services/hero.service';
import { TeamsService } from "../../services/teams.service";
import { appRoutes } from '../../../app/app.routes';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import {InputText} from "primeng/inputtext";

@Component({
  selector: 'app-teams',
  imports: [UpperCasePipe, Button, InputText],
  providers: [HeroService, TeamsService],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
})
export class TeamsComponent implements OnInit {
  teams = signal<Team[]>([]);
  heroes = signal<Hero[]>([]);
  searchQuery = signal<string>('');
  private router: Router = inject(Router);
  private heroService: HeroService = inject(HeroService);
  private teamsService: TeamsService = inject(TeamsService);

  ngOnInit(): void {
    this.teamsService.getTeams().subscribe((teams: Team[]) => this.teams.set(teams));
    this.heroService.getHeroes().subscribe((heroes: Hero[]) => this.heroes.set(heroes));
  }

  teamsWithHeroes = computed(() => {
    return this.teams().map(team => ({
      ...team,
      heroes: this.heroes().filter(hero => team.heroIds.includes(hero.id))
    }));
  });

  filteredTeams = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.teamsWithHeroes();

    return this.teamsWithHeroes().filter(team =>
        team.name.toLowerCase().includes(query) ||
        team.heroes.some(hero => hero.name.toLowerCase().includes(query))
    );
  });

  onTeamClick(id: number): void {
    this.router.navigate(["/", appRoutes.TEAM_DIALOG, id]);
  }

  addNewTeam(): void {
    this.router.navigate(["/", appRoutes.TEAM_DIALOG]);
  }
}
