import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { Team } from '../../models/team/team';
import { Hero } from '../../models/hero/hero';
import { UpperCasePipe } from '@angular/common';
import { HeroService } from '../../services/hero.service';
import { TeamsService } from "../../services/teams.service";
import { appRoutes } from '../../../app/app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  imports: [UpperCasePipe],
  providers: [HeroService, TeamsService],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
})
export class TeamsComponent implements OnInit {
  teams = signal<Team[]>([]);
  heroes = signal<Hero[]>([]);
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

  onTeamClick(id: number) {
    this.router.navigate(["/", appRoutes.TEAM_DIALOG, id]);
  }
}
